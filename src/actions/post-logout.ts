import { API } from '@/constant/api';

const handlePostLogout = async () => {
  try {
    await fetch(API.auth.logout, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default handlePostLogout;
