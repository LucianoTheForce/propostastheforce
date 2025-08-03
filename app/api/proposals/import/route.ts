import { NextRequest, NextResponse } from 'next/server';
import { redisProposalOps } from '@/lib/redis';
import { Proposal } from '@/lib/proposal-types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate import data structure
    if (!data.version || !data.proposals || !Array.isArray(data.proposals)) {
      return NextResponse.json(
        { success: false, error: 'Invalid import file format' },
        { status: 400 }
      );
    }
    
    let successCount = 0;
    let failedCount = 0;
    const errors: string[] = [];
    
    // Import each proposal
    for (const proposalData of data.proposals) {
      try {
        // Extract full proposal data (not just metadata)
        let proposal: Proposal;
        
        // Check if this is a full proposal or just metadata
        if (proposalData.content) {
          // Full proposal object
          proposal = proposalData as Proposal;
        } else {
          // Need to fetch the full proposal
          const [clientSlug, projectSlug] = proposalData.id.split(':');
          const existingProposal = await redisProposalOps.getProposal(clientSlug, projectSlug);
          
          if (existingProposal) {
            proposal = existingProposal;
          } else {
            throw new Error(`Proposal ${proposalData.id} not found`);
          }
        }
        
        // Save the proposal
        const saved = await redisProposalOps.saveProposal(proposal);
        if (saved) {
          successCount++;
        } else {
          failedCount++;
          errors.push(`Failed to save proposal: ${proposal.metadata.id}`);
        }
      } catch (error) {
        failedCount++;
        errors.push(`Error importing proposal: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    
    return NextResponse.json({
      success: true,
      imported: successCount,
      failed: failedCount,
      totalProposals: data.proposals.length,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to import proposals' },
      { status: 500 }
    );
  }
}