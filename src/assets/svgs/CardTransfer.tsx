const CardTransfer = ({ color = "#0D1421" }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M18.3326 9.16732C18.325 6.57206 18.243 5.19621 17.357 4.3103C16.3807 3.33398 14.8094 3.33398 11.6667 3.33398H8.33335C5.19066 3.33398 3.61931 3.33398 2.643 4.3103C1.66669 5.28661 1.66669 6.85795 1.66669 10.0007C1.66669 13.1433 1.66669 14.7147 2.643 15.691C3.61931 16.6673 5.19066 16.6673 8.33335 16.6673H9.58335"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12.9167 11.666V16.666M12.9167 16.666L14.5833 14.9993M12.9167 16.666L11.25 14.9993M16.6667 16.666V11.666M16.6667 11.666L18.3333 13.3327M16.6667 11.666L15 13.3327"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33333 13.334H5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1.66669 8.33398L18.3334 8.33398"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CardTransfer;
