import { Message } from 'openai/resources/beta/threads/messages.mjs';
import { Dispatch, SetStateAction } from 'react';
import { Message as MessageType } from '../types/message';

const handleMessageDone = (
  message: Message,
  setMessage: Dispatch<SetStateAction<MessageType | undefined>>
) => {
  // @ts-ignore
  const parsedMessage = JSON.parse(message.content[0].text.value);
  console.log('Utils: message completed', parsedMessage);

  if (parsedMessage.response_type === 'question') {
    setMessage({ type: 'question', data: parsedMessage });
  } else {
    setMessage({ type: 'feedback', data: parsedMessage });
  }
};

export default handleMessageDone;
