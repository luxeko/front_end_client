import { API } from '@/constant/api';

interface IQuery {
  product_id: string[];
  payment_method?: string;
  status?: string;
  note?: string;
  quantity: number[];
  estimated_delivery: any;
}

export const handlePostCreateOrder = async (
  accessToken: string,
  {
    product_id,
    payment_method,
    status,
    note,
    quantity,
    estimated_delivery,
  }: IQuery,
) => {
  try {
    const res = await fetch(API.client.orders.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-cache',
      body: JSON.stringify({
        product_id,
        payment_method,
        status,
        note,
        quantity,
        estimated_delivery,
      }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
