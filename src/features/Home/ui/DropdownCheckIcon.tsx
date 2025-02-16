import { SVGProps } from 'react';

const DropdownCheck = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.64837 0.626041C10.0111 0.855803 10.1092 1.32145 9.86733 1.66609L4.60421 9.16602C4.47301 9.35298 4.2605 9.4742 4.02513 9.49635C3.78976 9.51849 3.55634 9.43921 3.3891 9.28033L0.23123 6.28036C-0.0770765 5.98746 -0.0770765 5.5126 0.23123 5.21971C0.539536 4.92681 1.0394 4.92681 1.3477 5.21971L3.82463 7.57278L8.55357 0.834051C8.79543 0.489408 9.28558 0.396279 9.64837 0.626041Z"
        fill="#323131"
      />
    </svg>
  );
};

export default DropdownCheck;
