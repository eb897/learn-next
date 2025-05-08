import { createOpenAI } from '@ai-sdk/openai'
import { CoreMessage, generateText } from 'ai'

export async function POST(req: Request) {

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.BASE_URL,
  })

  const { messages } : { messages: CoreMessage[] } = await req.json();

  const { text } = await generateText({
    model: openai('gpt-3.5-turbo'),
    system: '你是一个小助手.',
    messages,
  })

  return Response.json({ text })
  
}