import { NextRequest, NextResponse } from 'next/server';
import { redisProposalOps } from '@/lib/redis';
import { generateSlug, createProposalId } from '@/lib/proposal-types';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const originalId = params.id;
    
    // Fetch the original proposal
    const [clientSlug, projectSlug] = originalId.split(':');
    const original = await redisProposalOps.getProposal(clientSlug, projectSlug);
    
    if (!original) {
      return NextResponse.json({
        success: false,
        error: 'Original proposal not found'
      }, { status: 404 });
    }

    // Create new slugs with "copy" suffix
    const newProjectName = `${original.metadata.projectName} (Copy)`;
    const newProjectSlug = generateSlug(newProjectName);
    
    // Create a duplicate proposal with new ID
    const duplicatedProposal = {
      ...original,
      metadata: {
        ...original.metadata,
        projectName: newProjectName,
        projectSlug: newProjectSlug,
        status: 'draft' as const, // Reset status to draft
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    };

    // Save the duplicated proposal
    const success = await redisProposalOps.saveProposal(duplicatedProposal);

    if (success) {
      return NextResponse.json({
        success: true,
        id: createProposalId(clientSlug, newProjectSlug),
        clientSlug,
        projectSlug: newProjectSlug
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to create duplicate proposal'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error duplicating proposal:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to duplicate proposal'
    }, { status: 500 });
  }
}