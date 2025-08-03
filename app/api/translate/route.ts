import { NextRequest, NextResponse } from 'next/server';
import { translateText } from '@/lib/openai';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, sourceLang, targetLang, context } = body;

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: text, sourceLang, targetLang' 
        },
        { status: 400 }
      );
    }

    const translation = await translateText({
      text,
      sourceLang,
      targetLang,
      context
    });

    return NextResponse.json({
      success: true,
      translation,
      sourceLang,
      targetLang
    });

  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Translation failed' 
      },
      { status: 500 }
    );
  }
}