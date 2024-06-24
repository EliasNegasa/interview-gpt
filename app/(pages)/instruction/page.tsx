import axiosInstance from '@/app/services/axios-instance';
import { Exam } from '@/app/types/exam';
import StartExamAction from './_components/StartExamAction';

interface Props {
  searchParams: {
    eid: string;
  };
}

async function getExam(examId: string) {
  try {
    const { data } = await axiosInstance.get<Exam>(`exam/${examId}`);

    return data;
  } catch (err: any) {
    throw new Error(
      err.message || 'An unexpected error occurred. Please try again.'
    );
  }
}

export default async function InstructionPage({ searchParams }: Props) {
  const exam = await getExam(searchParams.eid);

  return (
    <div className="container mx-auto flex flex-col justify-center min-h-screen">
      <div className="text-center text-3xl font-thin mb-6">
        <h3>Instructions Page</h3>
      </div>

      <div className="flex flex-col justify-center mx-auto space-y-4 max-w-2xl w-96">
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          dolorem, repudiandae harum
        </p>
        <div className="mx-auto">
          <StartExamAction exam={exam} />
        </div>
      </div>
    </div>
  );
}
