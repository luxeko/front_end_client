import React from 'react';

type Props = {
  params: {
    locale: string;
  };
  searchParams: any;
};

const ProfilePage = async ({
  params: { locale },
  searchParams,
}: Readonly<Props>) => {
  return <div></div>;
};

export default ProfilePage;
