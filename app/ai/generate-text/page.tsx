'use client'

import { useState } from "react"

export default function Page() {

  const [ text, setText ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  async function handleGenerateText() {
    setIsLoading(true);

    await fetch('/api/completion/generate-text', {
      method: 'POST',
      body: JSON.stringify({ prompt: '你好' }),
    }).then(response => {
      response.json().then(data => {
        setText(data.text);
        setIsLoading(false);
      })
    })
  }

  return (
    <div onClick={handleGenerateText}>
      <div>
        Generate Text
      </div>

      { isLoading ? 'Loading...' : text }
    </div>
  )
}