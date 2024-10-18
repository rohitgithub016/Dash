import getGroupFirstCharacter from "../../utils/getGroupFirstCharacter";

const GroupsLogo = ({
  index,
  text,
  groups,
}: {
  index: number;
  text: string;
  groups: any;
}) => {
  let groupName = text;
  if (groupName === "All Groups") {
    if (groups?.length >= 2) {
      groupName = groups[1]?.name;
    }
  }
  return (
    <div style={{ display: "inline-flex" }}>
      <span
        className="groups-logo"
        style={{
          zIndex: 1,
          background: "linear-gradient(180deg, #A0DE7E 0%, #54CB68 100%)",
        }}
      >
        {getGroupFirstCharacter(groupName)}
      </span>
      {!index && (
        <span
          className="groups-logo"
          style={{
            marginInlineStart: "-28px",
            background: "linear-gradient(180deg, #27B5FE 0%, #3B63F6 100%)",
          }}
        >
          {getGroupFirstCharacter(groupName)}
        </span>
      )}
    </div>
  );
};

export default GroupsLogo;
