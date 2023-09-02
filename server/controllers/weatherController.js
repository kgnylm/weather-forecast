const axios = require("axios");
const dotenv = require("dotenv");

exports.getWeather = async (req, res) => {
  const city = req.params.city;

  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
    params: {
      q: `${city}`,
      days: "3",
    },
    headers: {
      "X-RapidAPI-Key": process.env.apikey,
      "X-RapidAPI-Host": process.env.host,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    if (response.status === 400) {
      res.status(400).json({ message: "Please enter a valid city name" });
    }
    // api data configuration
    const cityname = response.data.location.name;
    const country = response.data.location.country;
    const localtime = response.data.location.localtime;

    const nowTemp = response.data.current.temp_c;
    const nowFahrenheit = response.data.current.temp_f;
    const nowStatus = response.data.current.condition.text;
    const nowIcon = response.data.current.condition.icon.substring(2);
    const nowWind = response.data.current.wind_kph;
    const nowFeelsLikeC = response.data.current.feelslike_c;
    const nowFeelsLikeF = response.data.current.feelslike_f;

    const todaysWeatherMax =
      response.data.forecast.forecastday[0].day.maxtemp_c;
    const todaysWeatherMin =
      response.data.forecast.forecastday[0].day.mintemp_c;
    const todaysIcon =
      response.data.forecast.forecastday[0].day.condition.icon.substring(2);

    const tomorrowWeatherMax =
      response.data.forecast.forecastday[1].day.maxtemp_c;
    const tomorrowWeatherMin =
      response.data.forecast.forecastday[1].day.mintemp_c;
    const tomorrowIcon =
      response.data.forecast.forecastday[1].day.condition.icon.substring(2);

    const afterTomorrowWeatherMax =
      response.data.forecast.forecastday[2].day.maxtemp_c;
    const afterTomorrowWeatherMin =
      response.data.forecast.forecastday[2].day.mintemp_c;
    const afterTomorrowIcon =
      response.data.forecast.forecastday[2].day.condition.icon.substring(2);

    const finaldata = {
      cityname: cityname,
      country: country,
      localtime: localtime,
      nowTemp: nowTemp,
      nowFahrenheit: nowFahrenheit,
      nowStatus: nowStatus,
      nowIcon: nowIcon,
      nowWind: nowWind,
      nowFeelsLikeC: nowFeelsLikeC,
      nowFeelsLikeF: nowFeelsLikeF,
      today: {
        todaysWeatherMax: todaysWeatherMax,
        todaysWeatherMin: todaysWeatherMin,
        todaysIcon: todaysIcon,
      },
      tomorrow: {
        tomorrowWeatherMax: tomorrowWeatherMax,
        tomorrowWeatherMin: tomorrowWeatherMin,
        tomorrowIcon: tomorrowIcon,
      },
      afterTomorrow: {
        afterTomorrowWeatherMax: afterTomorrowWeatherMax,
        afterTomorrowWeatherMin: afterTomorrowWeatherMin,
        afterTomorrowIcon: afterTomorrowIcon,
      },
    };

    res.status(200).json({ finaldata });
  } catch (error) {
    console.error(error);
  }
};
