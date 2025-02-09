import type { SVGProps } from 'react';

const Arrow = ({
  direction = 'left',
  size = 24,
  ...props
}: {
  direction?: 'left' | 'right';
  size?: number;
} & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{
        transform: direction === 'right' ? 'rotate(180deg)' : 'none',
        transformOrigin: 'center',
        cursor: 'pointer',
      }}
    >
      <path
        d="M15.75 20L8.25 12.5L15.75 5"
        stroke="#121213"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Arrow;
