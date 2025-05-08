'use client'

import { useState } from "react"

export default function Page() {

  const [ text, setText ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  async function handleGenerateText() {
    try {
      setIsLoading(true);
      const response = await fetch('/ai/01_generate-text/api', {
        method: 'POST',
        body: JSON.stringify({ prompt: '你好' }),
      });
      const data = await response.json();
      setText(data.text);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
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