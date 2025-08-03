import { NextRequest, NextResponse } from 'next/server';
import { redisProposalOps } from '@/lib/redis';
import { Proposal, createProposalId, generateSlug } from '@/lib/proposal-types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.metadata?.clientName || !body.metadata?.projectName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: clientName and projectName are required in metadata'
        },
        { status: 400 }
      );
    }
    
    // Generate slugs if not provided
    const clientSlug = body.metadata.clientSlug || generateSlug(body.metadata.clientName);
    const projectSlug = body.metadata.projectSlug || generateSlug(body.metadata.projectName);
    const proposalId = createProposalId(clientSlug, projectSlug);
    
    // Check if proposal already exists
    const existingProposal = await redisProposalOps.getProposal(clientSlug, projectSlug);
    if (existingProposal) {
      return NextResponse.json(
        {
          success: false,
          error: 'Proposal already exists with this client and project combination'
        },
        { status: 409 }
      );
    }
    
    // Create new proposal with generated metadata
    const now = new Date().toISOString();
    const newProposal: Proposal = {
      metadata: {
        id: proposalId,
        clientName: body.metadata.clientName,
        clientSlug,
        projectName: body.metadata.projectName,
        projectSlug,
        createdAt: now,
        updatedAt: now,
        status: body.metadata.status || 'draft',
        thumbnail: body.metadata.thumbnail || null
      },
      content: body.content || {
        hero: {
          title: { en: '', pt: '' },
          subtitle: { en: '', pt: '' },
          description: { en: '', pt: '' },
          backgroundImage: null,
          ctaText: { en: 'Get Started', pt: 'Começar' },
          ctaLink: '#contact'
        },
        sections: []
      }
    };
    
    // Save to Redis
    await redisProposalOps.saveProposal(newProposal);
    
    return NextResponse.json({
      success: true,
      proposal: newProposal
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating proposal:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create proposal',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}