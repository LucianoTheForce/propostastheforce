import { NextResponse } from 'next/server';
import { redisProposalOps } from '@/lib/redis';

export async function GET() {
  try {
    const proposals = await redisProposalOps.getProposalsList();
    
    return NextResponse.json({
      success: true,
      count: proposals.length,
      proposals
    });
  } catch (error) {
    console.error('Error fetching proposals list:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch proposals list',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}