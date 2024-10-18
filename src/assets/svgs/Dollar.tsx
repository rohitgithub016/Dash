const Dollar = ({ color = "#0D1421" }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0_8588_8432)">
        <circle
          cx="10"
          cy="9.99935"
          r="8.33333"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M10 5V15"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12.5 7.91732C12.5 6.76672 11.3807 5.83398 10 5.83398C8.61929 5.83398 7.5 6.76672 7.5 7.91732C7.5 9.06791 8.61929 10.0007 10 10.0007C11.3807 10.0007 12.5 10.9334 12.5 12.084C12.5 13.2346 11.3807 14.1673 10 14.1673C8.61929 14.1673 7.5 13.2346 7.5 12.084"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_8588_8432">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Dollar;
