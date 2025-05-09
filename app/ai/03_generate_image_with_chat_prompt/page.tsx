'use client'

import { useChat } from 'ai/react';
import Image from 'next/image';
export default function Chat() {

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/ai/03_generate_image_with_chat_prompt/api'
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div key={m.id}>
              <div className='font-bold'>{m.role}</div>
              {m.toolInvocations ? (
                m.toolInvocations.map(ti => (
                  ti.toolName === 'generateImage' ? (
                    ti.state === 'result' ? (
                      <Image
                        key={ti.toolCallId}
                        src={`data:image/png;base64,${ti.result.image}`}
                        alt='ti.result.prompt'
                        width={400}
                        height={400}
                      />
                    ) : (
                      <div key={ti.toolCallId} className="animate-pulse">Generating...</div>
                    )
                  ) : null
                ))
              ) : (
                <p>{m.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          type="text"
          value={input}
          placeholder='Say something'
          onChange={handleInputChange} />
      </form>
    </div>
  )
}