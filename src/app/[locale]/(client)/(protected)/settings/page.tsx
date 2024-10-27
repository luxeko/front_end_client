import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: {
    locale: string;
  };
  searchParams: any;
};

const SettingPage = async ({
  params: { locale },
  searchParams,
}: Readonly<Props>) => {
  unstable_setRequestLocale(locale);
  return <div>Setting</div>;
};

export default SettingPage;
