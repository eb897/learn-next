import { createOpenAI } from "@ai-sdk/openai";
import { experimental_generateImage, Message, streamText, tool } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.BASE_URL,
  })

  const { messages } : { messages: Message[] } = await req.json();
  
  const formattedMessages = messages.map(message => {
    if (message.role === 'assistant' && message.toolInvocations) {
      message.toolInvocations.forEach(toolInvocation => {
        if (toolInvocation.toolName === 'generateImage' && toolInvocation.state === 'result') {
          toolInvocation.result.image = 'redacted-for-length'
        }
      })
    }

    return message;
    
  })


  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: formattedMessages,
    tools: {
      generateImage: tool({
        description: 'Generate an image',
        parameters: z.object({
          prompt: z.string().describe('The prompt to generate an image from'),
        }),
        execute: async ({ prompt }) => {
          const { image } = await experimental_generateImage({
            model: openai.image('dall-e-3'),
            prompt
          });

          return {
            image: image.base64,
            prompt
          }
        }
      })
    }
  })
  return result.toDataStreamResponse();
}