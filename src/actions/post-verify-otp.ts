import { API } from '@/constant/api';

interface IQuery {
  otp: string;
  email?: string | null;
  phone_number?: string | null;
}

const handlePostVerifyOTP = async ({ otp, email, phone_number }: IQuery) => {
  try {
    const res = await fetch(API.auth.verifyOTP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp, email, phone_number }),
      cache: 'no-cache',
    });
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default handlePostVerifyOTP;
