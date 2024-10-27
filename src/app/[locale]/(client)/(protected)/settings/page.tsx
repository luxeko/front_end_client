import React from 'react';

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
  return <div>Setting</div>;
};

export default SettingPage;
