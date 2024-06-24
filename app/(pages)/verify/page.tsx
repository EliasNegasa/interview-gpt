import VerificationForm from './_components/VerificationForm';

interface Props {
  searchParams: {
    uid: string;
  };
}
export default function Verification({ searchParams }: Props) {
  return (
    <div className="container mx-auto flex flex-col justify-center min-h-screen">
      <div className="text-center text-3xl font-thin mb-6">
        <h3>Verify your email to continue</h3>
      </div>

      <VerificationForm uniqueId={searchParams.uid} />
    </div>
  );
}
