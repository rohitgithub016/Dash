const UserGroups = ({ color = "#0D1421" }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <circle
        cx="7.50002"
        cy="4.99935"
        r="3.33333"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M12.5 7.5C13.8807 7.5 15 6.38071 15 5C15 3.61929 13.8807 2.5 12.5 2.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse
        cx="7.50002"
        cy="14.1673"
        rx="5.83333"
        ry="3.33333"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M15 11.666C16.4619 11.9866 17.5 12.7985 17.5 13.7493C17.5 14.6071 16.6552 15.3518 15.4167 15.7247"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default UserGroups;
