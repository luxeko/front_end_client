'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from '@/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneRegex } from '@/constant/regex';
import { Register } from '@/types/auth';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import Countdown from 'react-countdown';
import handlePostVerifyOTP from '@/actions/post-verify-otp';
import { CircleCheckBig } from 'lucide-react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import handlePostResendOTP from '@/actions/post-resend-otp';
import { useToast } from '@/components/ui/use-toast';

const FormRegisterSchema = z
  .object({
    email: z
      .string({
        required_error: 'email.require',
      })
      .email('email.invalid'),
    phone_number: z.string().regex(phoneRegex, 'phone_number.invalid'),
    password: z
      .string({
        required_error: 'password.require',
      })
      .min(6, {
        message: 'password.min|length: 6',
      }),
    password_confirmation: z.string(),
    email_phone_check: z.enum(['email', 'phone_number'], {
      required_error: 'You need to select a notification type.',
    }),
    otp: z
      .string({
        required_error: 'otp.require',
      })
      .nonempty({
        message: 'otp.require',
      })
      .min(6, 'otp.require')
      .max(6, 'otp.require'),
  })
  .refine(data => data.password === data.password_confirmation, {
    message: 'password.password_confirmation',
    path: ['password_confirmation'],
  });

const RegisterForm = ({ handleRegisterUser }: { handleRegisterUser: any }) => {
  const router = useRouter();
  const locale = useLocale();
  const translationsCommon = useTranslations('Common');
  const translationsRegister = useTranslations('Register');
  const translationsButton = useTranslations('Button');
  const translationsInput = useTranslations('Input');
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [registerStep, setRegisterStep] = useState<number>(1);
  const [dateNow, setDateNow] = useState<number>(Date.now());

  const formRegister = useForm<z.infer<typeof FormRegisterSchema>>({
    resolver: zodResolver(FormRegisterSchema),
    defaultValues: {
      email: '',
      phone_number: '',
      password: '',
      password_confirmation: '',
      email_phone_check: 'email',
      otp: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleGetDataRegister = async (
    data: z.infer<typeof FormRegisterSchema>,
  ) => {
    setLoading(true);
    const res = await handleRegisterUser(data);
    if (res && res.code === 200) {
      setDateNow(Date.now());
      setRegisterStep(3);
      setLoading(false);
    } else {
      setLoading(false);
      toast({
        title: 'Lỗi',
        description: res.message,
        duration: 3000,
        variant: 'destructive',
      });
    }
  };

  const handleResendOTP = async (data: z.infer<typeof FormRegisterSchema>) => {
    setLoading(true);
    const res = await handlePostResendOTP({
      email: data.email_phone_check === 'email' ? data.email : null,
      phone_number:
        data.email_phone_check === 'phone_number' ? data.phone_number : null,
    });
    if (res && res.code === 200) {
      setDateNow(Date.now());
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (data: z.infer<typeof FormRegisterSchema>) => {
    setLoading(true);
    const res = await handlePostVerifyOTP({
      email: data.email_phone_check === 'email' ? data.email : null,
      phone_number:
        data.email_phone_check === 'phone_number' ? data.phone_number : null,
      otp: data.otp,
    });
    if (res && res.code === 200) {
      setRegisterStep(4);
      setLoading(false);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else {
      setLoading(false);
    }
  };

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

  return (
    <div className={'flex w-full flex-col'}>
      {registerStep !== 4 && (
        <div className={'mb-4 flex w-full flex-col'}>
          <h3 className={'mb-2 text-3xl font-semibold'}>
            {translationsRegister('title')}
          </h3>
          <p className={'mb-2 text-base'}>
            {translationsRegister('welcome_to')}
          </p>
        </div>
      )}
      <Form {...formRegister}>
        <form className={'relative'}>
          {loading && (
            <div
              className={
                'absolute left-1/2 top-1/2 z-[1] flex h-full w-[101%] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-primary-foreground/85'
              }>
              <LoadingSpinner className={'h-12 w-12 text-primary'} />
            </div>
          )}
          {registerStep === 1 && (
            <>
              <div className={'flex w-full flex-col'}>
                <FormField
                  name={'email'}
                  control={formRegister.control}
                  render={({ field }) => (
                    <FormItem className={'mb-[1rem]'}>
                      <FormControl>
                        <Input
                          type='email'
                          className={
                            'bg-primary-foreground outline-none focus:outline-none'
                          }
                          {...field}
                          placeholder={translationsInput('email')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={'phone_number'}
                  control={formRegister.control}
                  render={({ field }) => (
                    <FormItem className={'mb-[1rem]'}>
                      <FormControl>
                        <Input
                          type='tel'
                          className={
                            'bg-primary-foreground outline-none focus:outline-none'
                          }
                          {...field}
                          placeholder={translationsInput('phone_number')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={'password'}
                  control={formRegister.control}
                  render={({ field }) => (
                    <FormItem className={'mb-[1rem]'}>
                      <FormControl>
                        <Input
                          type='password'
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
                <FormField
                  name={'password_confirmation'}
                  control={formRegister.control}
                  render={({ field }) => (
                    <FormItem className={'mb-[1rem]'}>
                      <FormControl>
                        <Input
                          type='password'
                          className={
                            'bg-primary-foreground outline-none focus:outline-none'
                          }
                          {...field}
                          placeholder={translationsInput(
                            'password_confirmation',
                          )}
                          autoComplete='on'
                        />
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
                  onClick={async () => {
                    const isValid = await formRegister.trigger([
                      'email',
                      'password',
                      'password_confirmation',
                      'phone_number',
                    ]);
                    if (isValid) {
                      setRegisterStep(2);
                    }
                  }}>
                  {translationsRegister('title')}
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
          {registerStep === 2 && (
            <>
              <div className={'flex w-full flex-col'}>
                <FormField
                  control={formRegister.control}
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
                                {formRegister.getValues('email')}
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
                                {formRegister.getValues('phone_number')}
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
                  onClick={() =>
                    handleGetDataRegister(formRegister.getValues())
                  }>
                  Tiếp tục
                </Button>
                <Button
                  type={'button'}
                  className={'w-full'}
                  variant={'destructive'}
                  onClick={() => setRegisterStep(1)}>
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
          {registerStep === 3 && (
            <>
              <div className={'mb-10 flex w-full flex-col'}>
                <FormField
                  control={formRegister.control}
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
                          await handleResendOTP(formRegister.getValues());
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
                    const isValid = await formRegister.trigger('otp');
                    if (isValid) {
                      await handleVerifyOTP(formRegister.getValues());
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
                  onClick={() => setRegisterStep(2)}>
                  Quay lại
                </Button>
              </div>
            </>
          )}
          {registerStep === 4 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 100, // Controls the stiffness of the spring
                damping: 10, // Controls the bounciness/resistance of the spring
              }}
              className={
                'flex flex-col items-center justify-center gap-4 text-2xl font-medium'
              }>
              <CircleCheckBig className={'text-primary'} size={68} />
              Đăng ký thành công
            </motion.div>
          )}
        </form>
      </Form>
      {registerStep === 1 && (
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
      )}
    </div>
  );
};

export default RegisterForm;
