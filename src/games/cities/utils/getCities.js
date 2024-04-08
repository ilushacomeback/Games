import axios from "axios";

const getCities = async () => {
  const url = "https://api.hh.ru/areas";
  const response = await axios.get(
    `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(
      url
    )}`
  );
  const data = response.data.contents;
  const jsonData = JSON.parse(data);
  const cities = jsonData[0].areas.flatMap(({ areas }) =>
    areas.map(({ name }) => name)
  );
  return cities;
};
export default getCities;
