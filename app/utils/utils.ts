export const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  return `${year}-${month < 10 ? `0${month}` : month}`;
};
