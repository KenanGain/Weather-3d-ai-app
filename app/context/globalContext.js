// "use Client";
// import axios from "axios";
// import React, { useContext, createContext, useState, useEffect } from "react";
// import defaultStates from "../utils/defaultStates";

// import { debounce } from "lodash";

// const GlobalContext = createContext();
// const GlobalContextUpdate = createContext();

// export const GlobalContextProvider = ({ children }) => {
//   const [forecast, setForecast] = useState({});
//   const [geoCodedList, setGeoCodedList] = useState(defaultStates);
//   const [inputValue, setInputValue] = useState("");

//   const [activeCityCoords, setActiveCityCoords] = useState([43.6426, -79.3871]);

//   const [airQuality, setAirQuality] = useState({});
//   const [fiveDayForecast, setFiveDayForecast] = useState({});
//   const [uvIndex, seUvIndex] = useState({});
//   const [news, setNews] = useState({});

//   const fetchForecast = async (lat, lon) => {
//     try {
//       const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);

//       setForecast(res.data);
//     } catch (error) {
//       console.log("Error fetching forecast data: ", error.message);
//     }
//   };

//   // Air Quality
//   const fetchAirQuality = async (lat, lon) => {
//     try {
//       const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
//       setAirQuality(res.data);
//     } catch (error) {
//       console.log("Error fetching air quality data: ", error.message);
//     }
//   };

//   // five day forecast
//   const fetchFiveDayForecast = async (lat, lon) => {
//     try {
//       const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);

//       setFiveDayForecast(res.data);
//     } catch (error) {
//       console.log("Error fetching five day forecast data: ", error.message);
//     }
//   };

//   //geocoded list
//   const fetchGeoCodedList = async (search) => {
//     try {
//       const res = await axios.get(`/api/geocoded?search=${search}`);

//       setGeoCodedList(res.data);
//     } catch (error) {
//       console.log("Error fetching geocoded list: ", error.message);
//     }
//   };

//   //fetch uv data
//   const fetchUvIndex = async (lat, lon) => {
//     try {
//       const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);

//       seUvIndex(res.data);
//     } catch (error) {
//       console.error("Error fetching the forecast:", error);
//     }
//   };

//   // local news 
//   const fetchNews = async (city) => {
//     try {
//       const res = await axios.get(`/api/news?city=${city}`);
//       setNews(res.data);
//     } catch (error) {
//       console.error("Error fetching news data:", error.message);
//     }
//   };

//   // handle input
//   const handleInput = (e) => {
//     setInputValue(e.target.value);

//     if (e.target.value === "") {
//       setGeoCodedList(defaultStates);
//     }
//   };

//   // debounce function
//   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
//   useEffect(() => {
//     const debouncedFetch = debounce((search) => {
//       fetchGeoCodedList(search);
//     }, 500);

//     if (inputValue) {
//       debouncedFetch(inputValue);
//     }

//     // cleanup
//     return () => debouncedFetch.cancel();
//   }, [inputValue]);

//   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
//   useEffect(() => {
//     const cityData = defaultStates.find(
//       (city) => city.lat === activeCityCoords[0] && city.lon === activeCityCoords[1]
//     );
//     const cityName = cityData?.name || '';
  
//     if (cityData) {
//       fetchForecast(cityData.lat, cityData.lon);
//       fetchAirQuality(cityData.lat, cityData.lon);
//       fetchFiveDayForecast(cityData.lat, cityData.lon);
//       fetchUvIndex(cityData.lat, cityData.lon);
//       if (cityName) {
//         fetchNews(cityName); // Fetch news based on the city name
//       }
//     }
//   }, [activeCityCoords]);

//   return (
//     <GlobalContext.Provider
//       value={{
//         forecast,
//         airQuality,
//         fiveDayForecast,
//         uvIndex,
//         news, // Provide news data
//         geoCodedList,
//         inputValue,
//         handleInput,
//         setActiveCityCoords,
//       }}
//     >
//       <GlobalContextUpdate.Provider
//         value={{
//           setActiveCityCoords,
//         }}
//       >
//         {children}
//       </GlobalContextUpdate.Provider>
//     </GlobalContext.Provider>
//   );
// };

// export const useGlobalContext = () => useContext(GlobalContext);
// export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);

// "use client";
// import axios from "axios";
// import React, { useContext, createContext, useState, useEffect } from "react";
// import defaultStates from "../utils/defaultStates";
// import { debounce } from "lodash";

// const GlobalContext = createContext();
// const GlobalContextUpdate = createContext();

// export const GlobalContextProvider = ({ children }) => {
//   const [forecast, setForecast] = useState({});
//   const [geoCodedList, setGeoCodedList] = useState(defaultStates);
//   const [inputValue, setInputValue] = useState("");
//   const [activeCityCoords, setActiveCityCoords] = useState([43.6426, -79.3871]);
//   const [airQuality, setAirQuality] = useState({});
//   const [fiveDayForecast, setFiveDayForecast] = useState({});
//   const [uvIndex, setUvIndex] = useState({});
//   const [news, setNews] = useState({});

//   const defaultCity = {
//     name: "Toronto",
//     lat: 43.65107,
//     lon: -79.347015
//   };

//   const fetchForecast = async (lat, lon) => {
//     try {
//       const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
//       setForecast(res.data);
//     } catch (error) {
//       console.log("Error fetching forecast data: ", error.message);
//     }
//   };

//   const fetchAirQuality = async (lat, lon) => {
//     try {
//       const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
//       setAirQuality(res.data);
//     } catch (error) {
//       console.log("Error fetching air quality data: ", error.message);
//     }
//   };

//   const fetchFiveDayForecast = async (lat, lon) => {
//     try {
//       const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
//       setFiveDayForecast(res.data);
//     } catch (error) {
//       console.log("Error fetching five day forecast data: ", error.message);
//     }
//   };

//   const fetchGeoCodedList = async (search) => {
//     try {
//       const res = await axios.get(`/api/geocoded?search=${search}`);
//       setGeoCodedList(res.data);
//     } catch (error) {
//       console.log("Error fetching geocoded list: ", error.message);
//     }
//   };

//   const fetchUvIndex = async (lat, lon) => {
//     try {
//       const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
//       setUvIndex(res.data);
//     } catch (error) {
//       console.error("Error fetching UV index data:", error);
//     }
//   };

//   const fetchNews = async (city) => {
//     try {
//       const res = await axios.get(`/api/news?city=${city}`);
//       setNews(res.data);
//     } catch (error) {
//       console.error("Error fetching news data:", error.message);
//     }
//   };

//   const handleInput = (e) => {
//     setInputValue(e.target.value);
//     if (e.target.value === "") {
//       setGeoCodedList(defaultStates);
//     }
//   };

//   useEffect(() => {
//     const debouncedFetch = debounce((search) => {
//       fetchGeoCodedList(search);
//     }, 500);

//     if (inputValue) {
//       debouncedFetch(inputValue);
//     }

//     return () => debouncedFetch.cancel();
//   }, [inputValue]);

//   useEffect(() => {
//     const [lat, lon] = activeCityCoords;
//     let cityData = defaultStates.find(
//       (city) => city.lat === lat && city.lon === lon
//     );

//     if (!cityData) {
//       cityData = defaultCity; // Fallback to default city if no match is found
//     }

//     const cityName = cityData.name;

//     console.log("City data:", cityData);
//     console.log("City name:", cityName);
//     console.log("Active coordinates:", activeCityCoords);

//     fetchForecast(cityData.lat, cityData.lon);
//     fetchAirQuality(cityData.lat, cityData.lon);
//     fetchFiveDayForecast(cityData.lat, cityData.lon);
//     fetchUvIndex(cityData.lat, cityData.lon);
//     if (cityName) {
//       fetchNews(cityName);
//     }
//   }, [activeCityCoords]);

//   return (
//     <GlobalContext.Provider
//       value={{
//         forecast,
//         airQuality,
//         fiveDayForecast,
//         uvIndex,
//         news,
//         geoCodedList,
//         inputValue,
//         handleInput,
//         setActiveCityCoords,
//       }}
//     >
//       <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
//         {children}
//       </GlobalContextUpdate.Provider>
//     </GlobalContext.Provider>
//   );
// };

// export const useGlobalContext = () => useContext(GlobalContext);
// export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);


//////////////////////////////
"use client";
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import { debounce } from "lodash";
import defaultStates from "../utils/defaultStates";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");
  const [activeCityCoords, setActiveCityCoords] = useState([43.6426, -79.3871]);
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});
  const [news, setNews] = useState({});
  const [wiki, setWiki] = useState([]);
  const [aiWeatherData, setAiWeatherData] = useState(null);

  const defaultCity = {
    name: "Toronto",
    lat: 43.65107,
    lon: -79.347015,
  };

  const fetchForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
      setForecast(res.data);
    } catch (error) {
      console.error("Error fetching forecast data:", error.message);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/pollution?lat=${lat}&lon=${lon}`);
      setAirQuality(res.data);
    } catch (error) {
      console.error("Error fetching air quality data:", error.message);
    }
  };

  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/fiveday?lat=${lat}&lon=${lon}`);
      setFiveDayForecast(res.data);
    } catch (error) {
      console.error("Error fetching five day forecast data:", error.message);
    }
  };

  const fetchGeoCodedList = async (search) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);
      setGeoCodedList(res.data);
    } catch (error) {
      console.error("Error fetching geocoded list:", error.message);
    }
  };

  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
      setUvIndex(res.data);
    } catch (error) {
      console.error("Error fetching UV index data:", error);
    }
  };

  const fetchNews = async (city) => {
    try {
      const res = await axios.get(`/api/news?city=${city}`);
      setNews(res.data);
    } catch (error) {
      console.error("Error fetching news data:", error.message);
    }
  };

  const fetchWiki = async (query) => {
    try {
      const res = await axios.get(`/api/wiki?query=${query}`);
      console.log("Wiki API response:", res.data); // Debug log
      setWiki(res.data);
    } catch (error) {
      console.error("Error fetching Wikipedia data:", error.message);
      setWiki([]);
    }
  };

  const fetchAiResponse = async (city, weather, temperature, wind, humidity, uv, pressure) => {
    try {
      const res = await axios.post('/api/ai', {
        city,
        weather,
        temperature,
        wind,
        humidity,
        uv,
        pressure,
      });
      console.log('AI Response:', res.data);
    setAiWeatherData(res.data);
    } catch (error) {
      console.error('Error fetching AI response:', error.message);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    const [lat, lon] = activeCityCoords;
    let cityData = defaultStates.find(
      (city) => city.lat === lat && city.lon === lon
    );
  
    if (!cityData) {
      cityData = defaultCity; // Fallback to default city if no match is found
    }
  
    const cityName = cityData.name;
  
    const fetchAllData = async () => {
      const [lat, lon] = activeCityCoords;
      let cityData = defaultStates.find(
        (city) => city.lat === lat && city.lon === lon
      ) || defaultCity;
    
      const cityName = cityData.name;
    
      console.log("Fetching data for city:", cityName);
    
      await fetchForecast(cityData.lat, cityData.lon);
      await fetchAirQuality(cityData.lat, cityData.lon);
      await fetchFiveDayForecast(cityData.lat, cityData.lon);
      await fetchUvIndex(cityData.lat, cityData.lon);
      await fetchNews(cityName);
      await fetchWiki(cityName);
    
      // Using state values directly
      const weather = forecast.weather ? forecast.weather[0].description : 'N/A';
      const temperature = forecast.main ? `${forecast.main.temp}°C` : 'N/A';
      const wind = forecast.wind ? `${forecast.wind.speed} m/s` : 'N/A';
      const humidity = forecast.main ? `${forecast.main.humidity}%` : 'N/A';
      const uv = uvIndex.value || 'N/A';
      const pressure = forecast.main ? `${forecast.main.pressure} hPa` : 'N/A';
    
      await fetchAiResponse(cityName, weather, temperature, wind, humidity, uv, pressure);
    };
  
    fetchAllData();
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        news,
        wiki,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
        aiWeatherData,
      }}
    >
      <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
