import { API } from '@/constant/api';

interface IQuery {
  order_id: string;
  note?: string;
}

export const handlePostCreatePayment = async (
  accessToken: string,
  { order_id, note }: IQuery,
) => {
  try {
    return await fetch(API.client.payments.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-cache',
      body: JSON.stringify({
        order_id,
        note,
      }),
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
