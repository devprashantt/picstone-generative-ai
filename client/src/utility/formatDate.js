function formatDate(date) {
  // Sat, 09 Dec 2023 13:59:10 GMT
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export default formatDate;
