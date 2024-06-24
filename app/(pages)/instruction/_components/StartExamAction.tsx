'use client';

import useExam from '@/app/hooks/useExam';
import useExamStore from '@/app/stores/exam-store';
import { Exam } from '@/app/types/exam';
import { Thread } from '@/app/types/openai/thread';
import { Button, Spinner } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

interface Props {
  exam: Exam;
}

const StartExamAction = ({ exam }: Props) => {
  const [isLoading, setLoading] = useState(false);

  const { setExam } = useExamStore();
  const { prompt } = useExam(exam);

  const router = useRouter();

  const handleContinue = async () => {
    setExam(exam);

    try {
      setLoading(true);

      const { data: thread } = await axios.post<Thread>('/api/thread', {
        content: prompt,
      });

      if (!thread) {
        throw new Error('Unable to create the exam');
      }

      router.push(`/exam/${exam.id}?tid=${thread.id}`);
    } catch (err: any) {
      throw new Error(
        err.message || 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="solid"
      className="w-full mt-4"
      size="3"
      onClick={handleContinue}
      disabled={isLoading}
    >
      Continue
      <Spinner loading={isLoading}>
        <IoIosArrowForward />
      </Spinner>
    </Button>
  );
};

export default StartExamAction;
