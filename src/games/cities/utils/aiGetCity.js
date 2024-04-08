const aiGetCity = (state) => {
  const { cities, uniqCities, lastCity } = state;
  const startCharCity = lastCity[lastCity.length - 1].toUpperCase();
  const resultCity = cities.find(
    (city) => city.startsWith(startCharCity) && !uniqCities.includes(city)
  );
  return resultCity;
};
export default aiGetCity;
