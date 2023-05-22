// Options for making date and time in required format
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

// Format Date and Time
export const formatDateAndTime = (dateStr) => {
  const date = new Date(dateStr);
  return Intl.DateTimeFormat("en-US", options).format(date);
};
