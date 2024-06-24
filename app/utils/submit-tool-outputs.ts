import { AssistantStream } from 'openai/lib/AssistantStream.mjs';
import { Dispatch, SetStateAction } from 'react';
import { Message } from '../types/message';
import handleMessageDone from './handle-message-done';
import handleStreamEvent from './handle-stream-event';

const submitToolOutputs: any = async (
  toolOutputs: any,
  runId: string,
  threadId: string,
  setMessage: Dispatch<SetStateAction<Message | undefined>>
) => {
  try {
    console.log('UTILS: submitToolOutputs');

    const response = await fetch(`/api/actions`, {
      method: 'POST',
      body: JSON.stringify({
        threadId: threadId,
        runId: runId,
        toolCallOutputs: toolOutputs,
      }),
    });

    const stream = AssistantStream.fromReadableStream(response.body!);

    stream
      .on('event', (event) => handleStreamEvent(event, threadId, setMessage))
      .on('messageDone', (message) => handleMessageDone(message, setMessage));
  } catch (error) {
    console.error('Error submitting tool outputs:', error);
  }
};

export default submitToolOutputs;
