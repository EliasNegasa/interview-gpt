import { openai } from '@/app/services/openai';

export async function POST(request: Request) {
  const body = await request.json();
  const { content } = body;

  console.log("API THREAD");
  

  const thread = await openai.beta.threads.create({
    messages: [
      {
        role: 'user',
        content,
        // content: content + ', json_format' + questionFormat(),
      },
    ],
  });

  return Response.json(thread);
}
