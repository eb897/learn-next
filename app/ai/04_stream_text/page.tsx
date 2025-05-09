'use client';
import { useCompletion } from '@ai-sdk/react';

export default function Page() {
  const { completion, complete } = useCompletion({
    api: '/ai/04_stream_text/api'
  })
  return (
    <div>
      <div
        onClick={async () => {
          await complete('Why is the sky blue?');
        }}
      >
        Generate
      </div>

      {completion}
    </div>
  );
}