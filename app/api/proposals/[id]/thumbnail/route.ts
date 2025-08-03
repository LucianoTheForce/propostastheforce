import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { redisProposalOps } from '@/lib/redis';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let browser;
  
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

    // Get the base URL from the request
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const previewUrl = `${baseUrl}/preview/${clientSlug}/${projectSlug}`;

    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set viewport for consistent screenshots
    await page.setViewport({
      width: 1280,
      height: 720,
      deviceScaleFactor: 2
    });

    // Navigate to the preview page
    await page.goto(previewUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for the hero section to render
    await page.waitForSelector('.hero-section', {
      timeout: 10000
    });

    // Take screenshot of just the hero section
    const heroElement = await page.$('.hero-section');
    if (!heroElement) {
      throw new Error('Hero section not found');
    }

    const screenshot = await heroElement.screenshot({
      encoding: 'base64',
      type: 'png'
    });

    // Store the thumbnail as a data URL
    const thumbnailDataUrl = `data:image/png;base64,${screenshot}`;
    
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
  } finally {
    if (browser) {
      await browser.close();
    }
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