const ArrowAction = ({ color = "#0D1421" }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0_8588_8426)">
        <path
          d="M9.16681 1.66602C5.78759 1.6721 4.01806 1.75506 2.8872 2.88592C1.66681 4.10631 1.66681 6.0705 1.66681 9.99887C1.66681 13.9272 1.66681 15.8914 2.8872 17.1118C4.10759 18.3322 6.07177 18.3322 10.0001 18.3322C13.9285 18.3322 15.8927 18.3322 17.1131 17.1118C18.2439 15.981 18.3269 14.2114 18.333 10.8322"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10.8333 9.16602L18.3333 1.66602M18.3333 1.66602H13.8802M18.3333 1.66602V6.11914M17.5 2.49935L10 9.99935M10 9.99935H13.3333M10 9.99935V6.66602"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_8588_8426">
          <rect width="20" height="20" rx="5" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowAction;
