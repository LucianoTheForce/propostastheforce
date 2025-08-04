import { NextRequest, NextResponse } from 'next/server';
import { redisProposalOps } from '@/lib/redis';
import { generateProposalThumbnail, generateScreenshotThumbnail } from '@/lib/generate-thumbnail';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;
    const [clientSlug, projectSlug] = proposalId.split(':');
    
    // Check if proposal exists
    const proposal = await redisProposalOps.getProposal(clientSlug, projectSlug);
    if (!proposal) {
      return NextResponse.json({
        success: false,
        error: 'Proposal not found'
      }, { status: 404 });
    }

    // For Betano proposal, use screenshot of the main Three.js page
    let thumbnailDataUrl: string;
    
    if (proposalId === 'betano:estacao-se') {
      // Generate screenshot thumbnail from the main landing page with Three.js
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';
      
      try {
        const screenshot = await generateScreenshotThumbnail(`${baseUrl}/`);
        if (screenshot) {
          thumbnailDataUrl = screenshot;
        } else {
          // Fallback to SVG if screenshot returned null
          thumbnailDataUrl = generateProposalThumbnail(
            proposal.metadata.clientName,
            proposal.metadata.projectName
          );
        }
      } catch (screenshotError) {
        console.error('Screenshot generation failed, falling back to SVG:', screenshotError);
        // Fallback to SVG thumbnail if screenshot fails
        thumbnailDataUrl = generateProposalThumbnail(
          proposal.metadata.clientName,
          proposal.metadata.projectName
        );
      }
    } else {
      // Generate SVG thumbnail for other proposals
      thumbnailDataUrl = generateProposalThumbnail(
        proposal.metadata.clientName,
        proposal.metadata.projectName
      );
    }
    
    // Save thumbnail to Redis
    const success = await redisProposalOps.saveProposalThumbnail(
      clientSlug,
      projectSlug,
      thumbnailDataUrl
    );

    if (success) {
      return NextResponse.json({
        success: true,
        thumbnail: thumbnailDataUrl
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to save thumbnail'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to generate thumbnail'
    }, { status: 500 });
  }
}

// GET endpoint to retrieve existing thumbnail
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;
    const [clientSlug, projectSlug] = proposalId.split(':');
    
    const thumbnail = await redisProposalOps.getProposalThumbnail(clientSlug, projectSlug);
    
    if (thumbnail) {
      return NextResponse.json({
        success: true,
        thumbnail
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Thumbnail not found'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Error retrieving thumbnail:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to retrieve thumbnail'
    }, { status: 500 });
  }
}