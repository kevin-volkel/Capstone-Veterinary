export const convertDate = (date) => {
  const dateObj = new Date(date)
  return `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`
}

export const sortDates = (a, b) => {
  const aSec = new Date(a.date).getTime();
  const bSec = new Date(b.date).getTime();
  return aSec - bSec;
}