'use client';

import { Candidate } from '@/app/types/candidate';
import { EnrollmentResponse } from '@/app/types/enrollment';
import { verificationSchema } from '@/app/validation/validation-schema';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { RiErrorWarningLine } from 'react-icons/ri';

interface Props {
  uniqueId: string;
}

const VerificationForm = ({ uniqueId }: Props) => {
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const handleGetStarted = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const validation = verificationSchema.safeParse({ email: emailInput });

      if (!validation.success) {
        throw new Error(validation.error.issues[0].message);
      }

      setLoading(true);
      const { data: enrollment } = await axios.get<EnrollmentResponse>(
        '/api/verify',
        {
          params: {
            uniqueId,
          },
        }
      );

      if (enrollment.total === 0) {
        throw new Error('The provided URL is invalid.');
      }

      const { data: candidate } = await axios.get<Candidate>(
        `/api/candidate/${enrollment.list[0].contactId}`
      );

      if (candidate.emailAddress !== emailInput) {
        throw new Error(
          'The email provided does not match the enrollment records.'
        );
      }

      router.push(`/instruction?eid=${enrollment.list[0].examId}`);
    } catch (err: any) {
      setError(
        err.message || 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center mx-auto space-y-4 max-w-2xl w-96">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <RiErrorWarningLine />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleGetStarted} className="w-full block">
        <div className="flex flex-col justify-center space-y-6">
          <TextField.Root
            placeholder="Email Address"
            size="3"
            value={emailInput}
            onChange={(e) => setEmailInput(e.currentTarget.value)}
            className="min-w-72"
          >
            <TextField.Slot>
              <AiOutlineMail />
            </TextField.Slot>
          </TextField.Root>
          <Button
            variant="solid"
            className="w-full"
            size="3"
            type="submit"
            disabled={isLoading}
          >
            Get Started
            <Spinner loading={isLoading}>
              <IoIosArrowForward />
            </Spinner>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;
