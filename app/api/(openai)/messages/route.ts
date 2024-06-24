import { openai } from '@/app/services/openai';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  console.log("API GET MESSAGES");


  const threadMessages = await openai.beta.threads.messages.list(
    searchParams.get('thread_id')!
  );

  return Response.json(threadMessages.data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { threadId, content } = body;

  console.log("API POST MESSAGES");
  

  const message = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content,
  });

  return Response.json(message);
}
