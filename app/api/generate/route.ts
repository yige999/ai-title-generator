import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { keyword } = await req.json();

  const prompt = `Generate 3 catchy, SEO-optimized YouTube video titles for: "${keyword}". 
  - Under 60 characters
  - Include numbers or power words
  - High click-through rate
  - 2025 algorithm friendly
  Return as JSON array: {"titles": ["Title 1", "Title 2", "Title 3"]}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const response = completion.choices[0].message.content;
    const data = JSON.parse(response || '{}');
    return Response.json({ titles: data.titles || [] });
  } catch (error) {
    return Response.json({ titles: ['Error: OpenAI API failed'] }, { status: 500 });
  }
}
