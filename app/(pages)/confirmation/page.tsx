interface Props {
  searchParams: {
    eid: string;
  };
}

export default function Verification({ searchParams }: Props) {
  return (
    <div className="container mx-auto flex flex-col justify-center min-h-screen">
      <div className="text-center text-3xl font-thin mb-6">
        <h3>Confirmation</h3>
      </div>
    </div>
  );
}
