import { NextResponse } from 'next/server';
import { redisProposalOps } from '@/lib/redis';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get all proposals
    const proposals = await redisProposalOps.getProposalsList();
    
    // Create export data with metadata
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      proposalCount: proposals.length,
      proposals: proposals
    };
    
    // Return as JSON download
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="proposals-backup-${new Date().toISOString().split('T')[0]}.json"`
      }
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to export proposals' },
      { status: 500 }
    );
  }
}