import { Suspense, useEffect } from 'react';
import * as s from './style.css';
import { useSearchParams } from 'react-router-dom';
import { useLoginMutation } from 'features/auth/services/auth.mutation';

/* eslint-disable no-console */

const OAuth = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code') || '';
  const { mutate } = useLoginMutation();

  useEffect(() => {
    console.log('OAuth component mounted');
    console.log('Code:', code);
    if (code) {
      console.log('Calling mutate with code');
      mutate(code);
    }
  }, [code, mutate]);

  return (
    <Suspense>
      <main className={s.container}>
        <p className={s.loginText}>로그인 중...</p>
      </main>
    </Suspense>
  );
};

export default OAuth;
