'use client';

import useExamStore from '@/app/stores/exam-store';
import { Message } from '@/app/types/message';
import handleMessageDone from '@/app/utils/handle-message-done';
import handleStreamEvent from '@/app/utils/handle-stream-event';
import { Button, Flex, Spinner } from '@radix-ui/themes';
import axios from 'axios';
import { AssistantStream } from 'openai/lib/AssistantStream.mjs';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import FeedbackCard from './FeedbackCard';
import QuestionItem from './Question';

interface Props {
  threadId: string;
}

const QuestionContainer = ({ threadId }: Props) => {
  const [isLoading, setLoading] = useState(false);

  const [message, setMessage] = useState<Message>();

  const [selectedOption, setSelectedOption] = useState('');

  const { exam } = useExamStore();

  const handleStart = async () => {
    setLoading(true);
    console.log('START STREAMING');

    try {
      const response = await fetch(`/api/stream`, {
        method: 'POST',
        body: JSON.stringify({
          thread_id: threadId,
        }),
      });

      const stream = AssistantStream.fromReadableStream(response.body!);

      stream
        .on('event', (event) => handleStreamEvent(event, threadId, setMessage))
        .on('messageDone', (message) => handleMessageDone(message, setMessage));
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = async () => {
    try {
      await axios.post(`/api/messages`, {
        threadId,
        content: selectedOption,
      });

      console.log('ADDING USER ANSWER TO THREAD');

      // setLoading(true);
      const response = await fetch(`/api/stream`, {
        method: 'POST',
        body: JSON.stringify({
          thread_id: threadId,
        }),
      });

      const stream = AssistantStream.fromReadableStream(response.body!);

      stream
        .on('event', (event) => handleStreamEvent(event, threadId, setMessage))
        .on('messageDone', (message) => handleMessageDone(message, setMessage));
    } catch (error) {
      throw new Error('Unable to load a question');
    } finally {
      setSelectedOption('');
    }
  };

  return (
    <Flex className="flex flex-col">
      <div className="flex justify-center mt-2">
        {!message && (
          <Button onClick={handleStart} size="3">
            Start Exam
            <Spinner loading={isLoading}>
              <IoIosArrowForward />
            </Spinner>
          </Button>
        )}
      </div>
      <div className="my-4">
        {message &&
          (message.type === 'question' ? (
            <QuestionItem
              question={message.data}
              language={exam?.topic!}
              onOptionSelect={handleOptionSelect}
            />
          ) : (
            <FeedbackCard feedback={message.data} />
          ))}
      </div>
      <div className="flex justify-end mt-2">
        {message?.type === 'question' && (
          <Button
            onClick={handleNext}
            disabled={selectedOption ? false : true}
            size="3"
          >
            Next
            <Spinner loading={isLoading}>
              <IoIosArrowForward />
            </Spinner>
          </Button>
        )}
      </div>
    </Flex>
  );
};

export default QuestionContainer;
