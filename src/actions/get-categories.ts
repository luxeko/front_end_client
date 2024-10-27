import { API } from '@/constant/api';

export const handleFetchDataCategories = async () => {
  try {
    const res = await fetch(API.client.categories['list-category'], {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    });
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
