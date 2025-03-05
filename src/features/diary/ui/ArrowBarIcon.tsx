import { SVGProps } from 'react';

type ArrowBarIconProps = {
  direction?: 'left' | 'right';
} & SVGProps<SVGSVGElement>;

const ArrowBarIcon = ({ direction = 'left', ...props }: ArrowBarIconProps) => {
  const rotation = direction === 'right' ? 'rotate(180 14 14.5)' : '';

  return (
    <svg
      width="28"
      height="29"
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform={rotation}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.49372 19.4937C8.15201 19.8354 7.59799 19.8354 7.25628 19.4937L2.88128 15.1187C2.53957 14.777 2.53957 14.223 2.88128 13.8813L7.25628 9.50628C7.59799 9.16457 8.15201 9.16457 8.49372 9.50628C8.83543 9.84799 8.83543 10.402 8.49372 10.7437L5.61244 13.625H24.5C24.9832 13.625 25.375 14.0168 25.375 14.5C25.375 14.9832 24.9832 15.375 24.5 15.375H5.61244L8.49372 18.2563C8.83543 18.598 8.83543 19.152 8.49372 19.4937Z"
          fill="#121213"
        />
      </g>
    </svg>
  );
};

export default ArrowBarIcon;
