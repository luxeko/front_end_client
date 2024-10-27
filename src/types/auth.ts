export type Register = {
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
  email_phone_check: string;
};

export type Login = {
  email_or_phone_number: string;
  password: string;
  role: string;
};
