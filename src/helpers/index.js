const timestampFormatter = (dateString) => {
  console.log(dateString);
  const split1 = dateString.split(".")[0];
  const split2 = split1.split("T");
  let date = split2[0];
  const time = split2[1];
  date = date.replace(/-/g, "/");
  return `${date} ${time}`;
};

export { timestampFormatter };
