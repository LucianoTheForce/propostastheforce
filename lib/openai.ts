import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface TranslationRequest {
  text: string;
  sourceLang: 'pt' | 'en';
  targetLang: 'pt' | 'en';
  context?: string;
}

export async function translateText({
  text,
  sourceLang,
  targetLang,
  context = 'business proposal'
}: TranslationRequest): Promise<string> {
  if (sourceLang === targetLang) {
    return text;
  }

  try {
    const sourceLanguage = sourceLang === 'pt' ? 'Portuguese' : 'English';
    const targetLanguage = targetLang === 'pt' ? 'Portuguese' : 'English';

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator specializing in business communications. Translate the following text from ${sourceLanguage} to ${targetLanguage}. Maintain the professional tone and business context. Only respond with the translation, no explanations or additional text.`
        },
        {
          role: 'user',
          content: `Context: ${context}\n\nText to translate: ${text}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const translation = response.choices[0]?.message?.content?.trim();
    
    if (!translation) {
      throw new Error('No translation received from OpenAI');
    }

    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}