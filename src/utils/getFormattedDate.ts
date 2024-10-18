const getFormattedDate = (dateString: string) => {
  let date = new Date(dateString);

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = date.getDate();
  let month = months[date.getMonth()];

  let formattedDate = `${day} ${month}`;

  return formattedDate;
};

export default getFormattedDate;
