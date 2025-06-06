import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUser from '@store/user';

const IndexPage: React.FC = () => {
  const { token } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.replace('/transacciones');
    } else {
      router.replace('/home');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default IndexPage;