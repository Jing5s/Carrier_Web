import { DotLoader } from 'react-spinners';
import * as s from '../style.css';
import theme from 'shared/styles/theme.css';
import { MailModalProps } from 'entities/mail/types/MailModalProps';
import { useEffect, useState } from 'react';

const loadingTextList = [
  'AI가 열심히 생성 중이에요...',
  '조금만 더 기다려 주세요!',
  '곧 결과를 보여드릴게요!',
  '잠시만 기다려 주세요!',
];

const LoadingStatus = ({ toggleModalClose }: MailModalProps) => {
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const displayText = loadingTextList[loadingTextIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass(s.fadeOut);

      setTimeout(() => {
        setLoadingTextIndex((prev) => (prev + 1) % loadingTextList.length);
        setAnimationClass(s.fadeIn);
      }, 500);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={s.container({ type: 'loading' })}>
      <DotLoader
        color={theme.blue[500]}
        size={36}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className={`${s.loadingText} ${animationClass}`}>{displayText}</p>
      <button
        className={s.button({ type: 'cancel' })}
        onClick={() => toggleModalClose?.('createSchedule')}
      >
        취소
      </button>
    </div>
  );
};

export default LoadingStatus;
