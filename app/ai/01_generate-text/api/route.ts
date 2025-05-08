import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'

export async function POST(req: Request) {
  const { prompt } : { prompt: string } = await req.json();

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.BASE_URL,
  })

  const { text } = await generateText({
    model: openai('gpt-3.5-turbo'),
    system: '你是一个小助手.',
    prompt,
  });

  return Response.json({ text })

}