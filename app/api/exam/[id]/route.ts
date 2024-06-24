import axiosInstance from '@/app/services/axios-instance';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {

    console.log("HERE");
    
  const { data } = await axiosInstance.get(`Exam/${params.id}`);

  return Response.json(data);
}
