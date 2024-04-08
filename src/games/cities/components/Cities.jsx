import getCities from "../utils/getCities";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import aiGetCity from "../utils/aiGetCity";

const Cities = ({ setNewGame }) => {
  const [state, setState] = useImmer({
    cities: ["Москва"],
    lastCity: "",
    uniqCities: [],
    error: null
  });

  const [value, setValue] = useState("");

  const getValue = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    getCities().then((data) => {
      console.log(data)
      setState((draft) => {
        draft.cities.push(...data);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isTrueCity = (e) => {
    e.preventDefault();
    const city = state.cities.find(
      (city) => city.trim().toLowerCase() === value.trim().toLowerCase()
    );

    const isStartTrue = state.lastCity
      ? state.lastCity[state.lastCity.length - 1].toUpperCase() ===
        value[0].toUpperCase()
      : true;

    if (city && !state.uniqCities.includes(city) && isStartTrue) {
      setState((draft) => {
        draft.error = null
        draft.lastCity = value;
        draft.uniqCities.push(city);
      });
      setTimeout(() => {
        setState((draft) => {
          const aiCity = aiGetCity(draft);
          draft.uniqCities.push(aiCity)
          draft.lastCity = aiCity;
        });
      }, 3000);
    } else {
      let curError;
      if (!city) {
        curError = 'Такого города не существует в России или я его не знаю :)'
      } else if (state.uniqCities.includes(city)) {
        curError = 'Такой город уже был'
      } else if (!isStartTrue) {
        const startChar = state.lastCity[state.lastCity.length - 1].toUpperCase()
        curError = `Город должен начинаться с буквы "${startChar}"`
      }
      setState(draft => {
        draft.error = curError
      })
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {state.lastCity ? <span>Последний город: {state.lastCity}</span> : null}
      <form onSubmit={isTrueCity}>
        <label htmlFor="city">Введите город</label>
        <input
          type="text"
          name="city"
          value={value}
          onChange={getValue}
          required=""
        />
        <input type="submit" value="отправить" />
      </form>
      {state.error ? <div>{state.error}</div> : null}
      <button onClick={setNewGame} style={{ marginTop: "10px" }}>
        Back
      </button>
    </div>
  );
};
export default Cities;
