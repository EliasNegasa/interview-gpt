import { openai } from '@/app/services/openai';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { thread_id } = body;

  const stream = openai.beta.threads.runs.stream(thread_id, {
    assistant_id: 'asst_dnZrM1ph17bnVIy9MQdlgmgJ',
  });

  return new Response(stream.toReadableStream());
}
