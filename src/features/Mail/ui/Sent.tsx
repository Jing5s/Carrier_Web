interface SentProps {
  fill: string;
}

const Sent = ({ fill }: SentProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame">
        <path
          id="Vector"
          d="M6.00004 12L3.26904 3.125C9.80191 5.025 15.9624 8.02646 21.485 12C15.9627 15.9735 9.80257 18.9749 3.27004 20.875L6.00004 12ZM6.00004 12H13.5"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Sent;
