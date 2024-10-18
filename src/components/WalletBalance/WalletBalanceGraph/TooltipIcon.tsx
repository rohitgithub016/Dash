const TooltipIcon = ({ color }: { color: string }) => {
  return (
    <div
      className="tooltip"
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: color,
      }}
    ></div>
  );
};

export default TooltipIcon;
