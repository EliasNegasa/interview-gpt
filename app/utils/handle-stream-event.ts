import { AssistantStreamEvent } from 'openai/resources/beta/assistants.mjs';
import { Dispatch, SetStateAction } from 'react';
import { Message } from '../types/message';
import handleRequiresAction from './handle-require-action';

const handleStreamEvent = (
  event: AssistantStreamEvent,
  threadId: string,
  setMessage: Dispatch<SetStateAction<Message | undefined>>
) => {
  switch (event.event) {
    case 'thread.run.requires_action':
      handleRequiresAction(event.data, threadId, setMessage);
      break;
    case 'thread.run.completed':
      console.log('completed');
      break;
    case 'thread.run.failed':
      console.log('failed');
      break;
  }
};

export default handleStreamEvent;
