import { API } from '@/constant/api';

interface IQuery {
  email_or_phone_number?: string | null;
}

const handleGetUser = async ({ email_or_phone_number }: IQuery) => {
  try {
    const res = await fetch(
      API.auth.getUserEmailAndPhoneNumber +
        `?email_or_phone_number=${email_or_phone_number}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
      },
    );
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default handleGetUser;
