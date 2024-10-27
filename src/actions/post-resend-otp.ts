import { API } from '@/constant/api';

interface IQuery {
  email?: string | null;
  phone_number?: string | null;
}

const handlePostResendOTP = async ({ email, phone_number }: IQuery) => {
  try {
    const res = await fetch(API.auth.resendOtp, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phone_number }),
      cache: 'no-cache',
    });
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default handlePostResendOTP;
