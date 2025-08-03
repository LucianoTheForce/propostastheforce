import { NextRequest, NextResponse } from 'next/server';
import { redisProposalOps } from '@/lib/redis';
import { Proposal } from '@/lib/proposal-types';

export const dynamic = 'force-dynamic';

// Helper function to parse proposal ID
function parseProposalId(id: string): { clientSlug: string; projectSlug: string } | null {
  const parts = id.split(':');
  if (parts.length !== 2) {
    return null;
  }
  return {
    clientSlug: parts[0],
    projectSlug: parts[1]
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;
    const parsed = parseProposalId(proposalId);
    
    if (!parsed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid proposal ID format. Expected format: clientSlug:projectSlug'
        },
        { status: 400 }
      );
    }
    
    const proposal = await redisProposalOps.getProposal(parsed.clientSlug, parsed.projectSlug);
    
    if (!proposal) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Proposal not found' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      proposal
    });
  } catch (error) {
    console.error('Error fetching proposal:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch proposal',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;
    const parsed = parseProposalId(proposalId);
    
    if (!parsed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid proposal ID format. Expected format: clientSlug:projectSlug'
        },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Validate that proposal exists
    const existingProposal = await redisProposalOps.getProposal(parsed.clientSlug, parsed.projectSlug);
    if (!existingProposal) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Proposal not found' 
        },
        { status: 404 }
      );
    }
    
    // Update the proposal
    const updatedProposal: Proposal = {
      ...existingProposal,
      ...body,
      metadata: {
        ...existingProposal.metadata,
        ...(body.metadata || {}),
        id: proposalId, // Ensure ID doesn't change
        updatedAt: new Date().toISOString()
      }
    };
    
    await redisProposalOps.saveProposal(updatedProposal);
    
    return NextResponse.json({
      success: true,
      proposal: updatedProposal
    });
  } catch (error) {
    console.error('Error updating proposal:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update proposal',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;
    const parsed = parseProposalId(proposalId);
    
    if (!parsed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid proposal ID format. Expected format: clientSlug:projectSlug'
        },
        { status: 400 }
      );
    }
    
    // Verify proposal exists
    const existingProposal = await redisProposalOps.getProposal(parsed.clientSlug, parsed.projectSlug);
    if (!existingProposal) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Proposal not found' 
        },
        { status: 404 }
      );
    }
    
    // Delete the proposal
    await redisProposalOps.deleteProposal(parsed.clientSlug, parsed.projectSlug);
    
    return NextResponse.json({
      success: true,
      message: 'Proposal deleted successfully',
      deletedId: proposalId
    });
  } catch (error) {
    console.error('Error deleting proposal:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete proposal',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}