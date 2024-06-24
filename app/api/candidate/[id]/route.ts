import axiosInstance from '@/app/services/axios-instance';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { data } = await axiosInstance.get(`Contact/${params.id}`);

  return Response.json(data);
}
