const getFormattedTime = (dateString: string) => {
  const date = new Date(dateString);

  function formatDateTimeWithoutAt(date: Date) {
    const month = date?.toLocaleString("en-US", { month: "long" });

    const day = date?.getUTCDate();

    let hours = date?.getUTCHours();
    let period = "AM";

    if (hours >= 12) {
      period = "PM";
      if (hours > 12) {
        hours -= 12;
      }
    }

    if (hours === 0) {
      hours = 12;
    }

    const minutes = date?.getUTCMinutes()?.toString()?.padStart(2, "0");

    const formattedDateTime = `${month} ${day} ${hours}:${minutes} ${period}`;

    return formattedDateTime;
  }

  const formattedDateTime = formatDateTimeWithoutAt(date);

  return formattedDateTime;
};

export default getFormattedTime;
