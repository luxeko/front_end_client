import React from 'react';
import Layout from '@/components/client/layout';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import RegisterForm from '@/app/[locale]/(auth)/register/components/register-form';
import { API } from '@/constant/api';
import { Register } from '@/types/auth';

const RegisterPage = () => {
  const locale = useLocale();
  const translationsRegister = useTranslations('Register');

  const handleRegisterUser = async (data: Register) => {
    'use server';
    const res = await fetch(API.auth.register, {
      method: 'POST',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        phone_number: data.phone_number,
        password: data.password,
        password_confirmation: data.password_confirmation,
        role: 'client',
        status: false,
        emailPhoneCheck: data.email_phone_check,
      }),
    });
    return res.json();
  };

  return (
    <Layout
      className={
        'absolute left-1/2 top-1/2 flex h-5/6 -translate-x-1/2 -translate-y-1/2 items-center justify-center'
      }>
      <div
        className={
          'grid h-full w-full grid-cols-7 rounded-lg bg-primary-foreground shadow-md'
        }>
        <div className={'relative col-span-3'}>
          <div
            className={
              'absolute left-0 top-0 h-full w-full rounded-bl-lg rounded-tl-lg bg-black/30'
            }></div>
          <div className={'absolute left-[10%] top-[20%] my-4 flex flex-col'}>
            <h1 className={'mb-2 text-4xl font-bold text-primary-foreground'}>
              Turn Your Ideas into Reality
            </h1>
            <p className={'text-xl font-medium text-primary-foreground'}>
              Start for free and attractive offers from the community
            </p>
          </div>
          <Image
            src={'/images/banners/banner_login_2.png'}
            width={1280}
            height={843}
            alt='Register'
            quality={100}
            priority={true}
            className='block h-full w-full rounded-bl-lg rounded-tl-lg object-cover'
          />
        </div>
        <div
          className={
            'col-span-4 mx-auto flex h-full w-3/4 flex-col justify-between bg-primary-foreground p-20'
          }>
          <h1 className={'text-xl font-semibold text-emerald-600'}>
            EcoGarden.
          </h1>
          <RegisterForm handleRegisterUser={handleRegisterUser} />
          <div className={'flex w-full items-center justify-center'}>
            <Link
              href={'/login'}
              locale={locale}
              className={'text-sm font-normal text-emerald-600'}>
              {translationsRegister('already_have_account')}{' '}
              <span
                className={
                  'cursor-pointer font-semibold underline underline-offset-2'
                }>
                {translationsRegister('login_now')}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
