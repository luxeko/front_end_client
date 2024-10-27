'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PATH } from '@/constant/path';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Countdown from 'react-countdown';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import handlePostVerifyOTP from '@/actions/post-verify-otp';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import handlePostResendOTP from '@/actions/post-resend-otp';
import handleGetUser from '@/actions/get-user';
import { phoneRegex } from '@/constant/regex';

const FormLoginSchema = z.object({
  email_or_phone_number: z
    .string({
      required_error: 'email_or_phone_number.require',
    })
    .trim()
    .min(1, { message: 'email_or_phone_number.require' }),
  password: z
    .string({
      required_error: 'password.require',
    })
    .min(6, {
      message: 'password.min|length: 6',
    }),
  otp: z
    .string({
      required_error: 'otp.require',
    })
    .min(6, 'otp.require')
    .max(6, 'otp.require')
    .optional(),
  email_phone_check: z
    .enum(['email', 'phone_number'], {
      required_error: 'You need to select a notification type.',
    })
    .optional(),
  email: z
    .string({
      required_error: 'email.require',
    })
    .email('email.invalid')
    .optional(),
  phone_number: z.string().regex(phoneRegex, 'phone_number.invalid').optional(),
});

const LoginForm = () => {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const translationsCommon = useTranslations('Common');
  const translationsLogin = useTranslations('Login');
  const translationsButton = useTranslations('Button');
  const translationsInput = useTranslations('Input');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [loginStep, setLoginStep] = useState<number>(1);
  const [dateNow, setDateNow] = useState<number>(Date.now());

  const formLogin = useForm<z.infer<typeof FormLoginSchema>>({
    resolver: zodResolver(FormLoginSchema),
    defaultValues: {
      email_or_phone_number: '',
      password: '',
      email_phone_check: 'email',
      otp: '',
      email: '',
      phone_number: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const Completion = () => (
    <div className={'mb-4 text-sm text-destructive'}>Mã OTP đã hết hạn</div>
  );
  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      return <Completion />;
    } else {
      return (
        <div className={'mb-4 text-sm'}>
          Mã sẽ hết hạn sau:{' '}
          <span className={'text-primary'}>
            <span className={'tabular-nums'}>
              {minutes}:{seconds}
            </span>{' '}
            giây
          </span>
        </div>
      );
    }
  };
  const handleLogin = async (data: z.infer<typeof FormLoginSchema>) => {
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email_or_phone_number: data.email_or_phone_number,
        password: data.password,
        role: 'client',
        redirect: false,
        callbackUrl: searchParams?.get('callbackUrl') || '/',
      });

      if (!result?.ok || result?.error) {
        setIsLoading(false);
        const user = await handleGetUser({
          email_or_phone_number: data.email_or_phone_number,
        });
        if (user && user.code === 200) {
          setIsLoading(false);
          formLogin.setValue('email', user.response.email);
          formLogin.setValue('phone_number', user.response.phone_number);
          setLoginStep(2);
        } else {
          setIsLoading(false);
          toast({
            title: 'Lỗi',
            description: user.message,
            variant: 'destructive',
            duration: 3000,
          });
        }
      }
      setIsLoading(false);
      toast({
        title: 'Thông báo',
        description: 'Đăng nhập thành công',
        duration: 3000,
      });
      if (result?.url) {
        router.push(result.url);
      }
    } catch (error: any) {
      toast({
        title: 'Something went wrong.',
        description: error.toString(),
        variant: 'destructive',
        duration: 3000,
      });
      console.log('Error:', error);
    }
  };

  const handleVerifyOTP = async (data: z.infer<typeof FormLoginSchema>) => {
    console.log(data);
    setIsLoading(true);
    const res = await handlePostVerifyOTP({
      email: data.email_phone_check === 'email' ? data.email : null,
      phone_number:
        data.email_phone_check === 'phone_number' ? data.phone_number : null,
      otp: data.otp ?? '',
    });
    console.log(res);
    if (res && res.code === 200) {
      setLoginStep(1);
      setIsLoading(false);
      await handleLogin(data);
    } else {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async (data: z.infer<typeof FormLoginSchema>) => {
    setIsLoading(true);
    console.log(data);
    const res = await handlePostResendOTP({
      email: data.email_phone_check === 'email' ? data.email : '',
      phone_number:
        data.email_phone_check === 'phone_number' ? data.phone_number : '',
    });
    console.log(res);
    if (res && res.code === 200) {
      setDateNow(Date.now());
      setIsLoading(false);
      setLoginStep(3);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className={'flex w-full flex-col'}>
      <div className={'mb-4 flex w-full flex-col'}>
        <h3 className={'mb-2 text-3xl font-semibold'}>
          {translationsLogin('title')}
        </h3>
        <p className={'mb-2 text-base'}>{translationsLogin('welcome_back')}</p>
      </div>
      <Form {...formLogin}>
        <form className={'relative'}>
          {isLoading && (
            <div
              className={
                'absolute left-1/2 top-1/2 z-[1] flex h-full w-[101%] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-primary-foreground/85'
              }>
              <LoadingSpinner className={'h-12 w-12 text-primary'} />
            </div>
          )}
          {loginStep === 1 && (
            <>
              <div className={'flex w-full flex-col'}>
                <FormField
                  name={'email_or_phone_number'}
                  control={formLogin.control}
                  render={({ field }) => (
                    <FormItem className={'mb-[1rem]'}>
                      <FormControl>
                        <Input
                          type='text'
                          disabled={isLoading}
                          className={
                            'bg-primary-foreground outline-none focus:outline-none'
                          }
                          {...field}
                          placeholder={translationsInput(
                            'email_or_phone_number',
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={'password'}
                  control={formLogin.control}
                  render={({ field }) => (
                    <FormItem className={'mb-[1rem]'}>
                      <FormControl>
                        <Input
                          type='password'
                          disabled={isLoading}
                          className={
                            'bg-primary-foreground outline-none focus:outline-none'
                          }
                          {...field}
                          placeholder={translationsInput('password')}
                          autoComplete='on'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={'mb-4 flex w-full items-center justify-between'}>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='terms' />
                  <label
                    htmlFor='terms'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    {translationsLogin('remember_me')}
                  </label>
                </div>
                <p
                  className={
                    'cursor-pointer whitespace-nowrap text-sm font-medium underline underline-offset-2'
                  }>
                  {translationsLogin('forgot_password')}
                </p>
              </div>
              <div className={'mb-4 flex w-full gap-2'}>
                <Button
                  type={'button'}
                  className={'w-full'}
                  disabled={isLoading}
                  onClick={async () => {
                    await handleLogin(formLogin.getValues());
                  }}>
                  {translationsLogin('title')}
                </Button>
                <Button
                  type={'button'}
                  className={'w-full'}
                  variant={'outline'}
                  onClick={() => {
                    router.push(
                      {
                        pathname: PATH.home,
                      },
                      {
                        locale: locale,
                      },
                    );
                  }}>
                  {translationsButton('back_to_home_page')}
                </Button>
              </div>
            </>
          )}
          {loginStep === 2 && (
            <>
              <div className={'flex w-full flex-col'}>
                <FormField
                  control={formLogin.control}
                  name='email_phone_check'
                  render={({ field }) => (
                    <FormItem className='mb-[1rem] space-y-3'>
                      <FormLabel>Chọn gửi mã OTP qua</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className='flex flex-col space-y-1'>
                          <FormItem className='flex w-full items-center space-x-3 space-y-0 rounded-lg bg-white p-4 shadow'>
                            <FormControl>
                              <RadioGroupItem value='email' />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              <div className={''}></div>
                              Email:{' '}
                              <span className={'font-medium'}>
                                {formLogin.getValues('email')}
                              </span>
                            </FormLabel>
                          </FormItem>
                          <FormItem className='flex w-full items-center space-x-3 space-y-0 rounded-lg bg-white p-4 shadow'>
                            <FormControl>
                              <RadioGroupItem value='phone_number' />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              Số điện thoại:{' '}
                              <span className={'font-medium'}>
                                {formLogin.getValues('phone_number')}
                              </span>
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={'mb-4 flex w-full gap-2'}>
                <Button
                  type={'button'}
                  className={'w-full'}
                  onClick={() => handleResendOTP(formLogin.getValues())}>
                  Tiếp tục
                </Button>
                <Button
                  type={'button'}
                  className={'w-full'}
                  variant={'destructive'}
                  onClick={() => setLoginStep(1)}>
                  Quay lại
                </Button>
                <Button
                  type={'button'}
                  className={'w-full'}
                  variant={'outline'}
                  onClick={() => {
                    router.push(
                      {
                        pathname: '/',
                      },
                      {
                        locale: locale,
                      },
                    );
                  }}>
                  {translationsButton('back_to_home_page')}
                </Button>
              </div>
            </>
          )}
          {loginStep === 3 && (
            <>
              <div className={'mb-10 flex w-full flex-col'}>
                <FormField
                  control={formLogin.control}
                  name={'otp'}
                  render={({ field }) => (
                    <FormItem>
                      <Countdown
                        date={dateNow + 120000}
                        intervalDelay={0}
                        zeroPadTime={2}
                        renderer={renderer}
                      />
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                      <div
                        className={'mb-4 cursor-pointer text-left text-sm'}
                        onClick={async () => {
                          await handleResendOTP(formLogin.getValues());
                        }}>
                        Bạn chưa nhận được mã?{' '}
                        <span className={'text-primary'}>Gửi lại</span>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className={'mb-4 flex w-full gap-2'}>
                <Button
                  type={'button'}
                  className={'w-full'}
                  onClick={async () => {
                    const isValid = await formLogin.trigger('otp');
                    if (isValid) {
                      await handleVerifyOTP(formLogin.getValues());
                    }
                  }}>
                  Xác nhận
                </Button>
                <Button
                  type={'button'}
                  className={'w-full'}
                  variant={'outline'}
                  onClick={() => {
                    router.push(
                      {
                        pathname: '/',
                      },
                      {
                        locale: locale,
                      },
                    );
                  }}>
                  {translationsButton('back_to_home_page')}
                </Button>
                <Button
                  type={'button'}
                  className={'w-full'}
                  variant={'secondary'}
                  onClick={() => setLoginStep(2)}>
                  Quay lại
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-primary-foreground px-2'>
            {translationsCommon('or')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
