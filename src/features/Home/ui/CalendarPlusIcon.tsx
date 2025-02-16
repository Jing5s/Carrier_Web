import { SVGProps } from 'react';

const CalendarPlus = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="26"
      height="27"
      viewBox="0 0 26 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      cursor="pointer"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 4.5625C13.4487 4.5625 13.8125 4.92627 13.8125 5.375V12.6875H21.125C21.5737 12.6875 21.9375 13.0513 21.9375 13.5C21.9375 13.9487 21.5737 14.3125 21.125 14.3125H13.8125V21.625C13.8125 22.0737 13.4487 22.4375 13 22.4375C12.5513 22.4375 12.1875 22.0737 12.1875 21.625V14.3125H4.875C4.42627 14.3125 4.0625 13.9487 4.0625 13.5C4.0625 13.0513 4.42627 12.6875 4.875 12.6875H12.1875V5.375C12.1875 4.92627 12.5513 4.5625 13 4.5625Z"
        fill="#1E1E20"
      />
    </svg>
  );
};

export default CalendarPlus;
