'use client'

import { CoreMessage } from "ai";
import { useState } from "react"

export default function Page() {

  const [ input, setInput ] = useState('');

  const [ messages, setMessages ] = useState<CoreMessage[]>([]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {

      setMessages(currentMessages => [
        ...currentMessages,
        {
          role: 'user',
          content: input,
        }
      ])

      const response = await fetch('/ai/02_generate_text_with_chat_prompt/api', {
        method: 'POST',
        body: JSON.stringify({
          messages: [
            ...messages,
            {
              role: 'user',
              content: input,
            }
          ]
        })
      });

      const { messages: newMessages } = await response.json();
      setMessages(currentMessages => [
        ...currentMessages,
        ...newMessages,
      ])
      
    }
  }

  return (
    <div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyDown={handleKeyDown}
      />
      {
        messages.map((message, index) => (
          <div key={`${message.role}-${index}`}>
          {
            typeof message.content === 'string'
            ? (message.content)
            : message.content
              .filter(part => part.type === 'text')
              .map((part, partIndex) => (
                <div key={partIndex}>
                  {part.text}
                </div>
              ))
          }
          </div>
        ))
      }
    </div>
  )
}