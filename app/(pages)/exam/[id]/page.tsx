import QuestionContainer from '../_components/QuestionContainer';

interface Props {
  params: { id: string };
  searchParams: {
    tid: string;
  };
}

export default async function ExamPage({ params, searchParams }: Props) {
  return (
    <div className="container mx-auto flex flex-col mt-20 min-h-screen">
      <div className="flex flex-col justify-center mx-auto space-y-4 w-full">
        {/* <div className="text-center text-3xl font-thin mb-6">
          <h3>Exam: {params.id}</h3>
        </div> */}
        <QuestionContainer threadId={searchParams.tid} />
      </div>
    </div>
  );
}
