import { useState } from 'react';
import theme from 'shared/styles/theme.css';

interface BtnCategoryItemProps {
  initialBgColor?: string;
}

const BtnCategoryItem = ({
  initialBgColor = '#587EFD',
}: BtnCategoryItemProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <rect
        x="0.5"
        y="1"
        width="23"
        height="23"
        rx="3.5"
        fill={isClicked ? theme.gray[50] : initialBgColor}
      />
      <rect
        x="0.5"
        y="1"
        width="23"
        height="23"
        rx="3.5"
        stroke={theme.gray[50]}
      />
      {!isClicked && (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.6484 7.62604C17.0111 7.8558 17.1092 8.32145 16.8673 8.66609L11.6042 16.166C11.473 16.353 11.2605 16.4742 11.0251 16.4963C10.7898 16.5185 10.5563 16.4392 10.3891 16.2803L7.23123 13.2804C6.92292 12.9875 6.92292 12.5126 7.23123 12.2197C7.53954 11.9268 8.0394 11.9268 8.3477 12.2197L10.8246 14.5728L15.5536 7.83405C15.7954 7.48941 16.2856 7.39628 16.6484 7.62604Z"
          fill="white"
        />
      )}
    </svg>
  );
};

export default BtnCategoryItem;
