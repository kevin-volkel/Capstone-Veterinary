export const convertDate = (date) => {
  const dateObj = new Date(date);
  return `${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()+1}/${dateObj.getFullYear()}`;
};

export const getLogDate = (date) => {
  const dateObj = new Date(date);
  let month = dateObj.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  let day = dateObj.getDate();
  if (day < 10) day = `0${day}`;
  return `${month}/${day}/${dateObj.getFullYear()}`;
};

export const sortDates = (a, b) => {
  const aSec = new Date(a.date).getTime();
  const bSec = new Date(b.date).getTime();
  return aSec - bSec;
};

export const extractTime = (d) => {
  const date = new Date(d);
  let hrs = date.getHours();
  let mins = date.getMinutes();
  if (hrs <= 9) hrs = '0' + hrs;
  if (mins < 10) mins = '0' + mins;
  const time = `${hrs}:${mins}`;
  return time;
};
