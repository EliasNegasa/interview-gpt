import axiosInstance from '@/app/services/axios-instance';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const uniqueId = searchParams.get('uniqueId');

  const queryParams = {
    where: [
      {
        type: 'equals',
        attribute: 'uniqueIdentifier',
        value: uniqueId,
      },
    ],
  };

  const { data } = await axiosInstance.get('Enrollment', {
    params: queryParams,
  });

  return Response.json(data);
}
