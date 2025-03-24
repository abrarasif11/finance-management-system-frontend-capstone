import axios from "axios";

export const fetchData = async (URL) => {
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data.data;
};
