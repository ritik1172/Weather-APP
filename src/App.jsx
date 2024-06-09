// App.js
import "./App.css";
import { FaReact } from "react-icons/fa";
import TopButton from "./components/TopButton";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [query, setQuery] = useState({ q: "chandigarh" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`);

    try {
      const data = await getFormattedWeatherData({ ...query, units });
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data);
      console.log(data);
    } catch (error) {
      toast.error("City not found. Please enter a valid city name.");
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = 40;
    if (weather.temp > threshold) return "from-yellow-600 to-orange-700";
    if (weather.temp >= 30 && weather.temp <= 40 ) return "from-purple-600 to-red-700";
    return "from-cyan-600 to-blue-700";
  };

  return (
    <>
      <div className={`container mx-auto mt-4 py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-br shadow-xl shadow-gray-400 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl ${formatBackground()}`}>
        <TopButton setQuery={setQuery} />
        <Inputs setQuery={setQuery} setUnits={setUnits} />

        {weather && (
          <>
            <TimeAndLocation weather={weather} />
            <TempAndDetails weather={weather} />
            <Forecast title="3 hour Step forecast" data={weather.hourly} />
            <Forecast title="daily forecast" data={weather.daily} />
          </>
        )}

        <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
      </div>
    </>
  );
};

export default App;
