import { openai } from '@/app/services/openai';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { toolCallOutputs, runId, threadId } = await request.json();

  console.log('ACTION', runId, threadId, toolCallOutputs);

  const stream = openai.beta.threads.runs.submitToolOutputsStream(
    threadId,
    runId,
    { tool_outputs: toolCallOutputs }
  );

  return new Response(stream.toReadableStream());
}
