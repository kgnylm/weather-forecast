<template>
  <div id="app">
    <h1>Weather Forecast</h1>
    <div class="search-container">
      <input
        type="text"
        placeholder="City or District Name"
        v-model="searchedCity"
        @keyup.enter="getApi"
      />
      <button @click="getApi">Search</button>
    </div>

    <div v-if="response" class="weather-container">
      <div class="current-weather">
        <h2>Current Weather({{ nowTime() }})</h2>
        <div class="weather-info">
          <div class="info-item">
            <h3>City/District</h3>
            <p>{{ response.finaldata.cityname }}</p>
          </div>
          <div class="info-item">
            <h3>Country</h3>
            <p>{{ response.finaldata.country }}</p>
          </div>
          <div class="info-item">
            <h3>Current Temperature</h3>
            <p>{{ response.finaldata.nowTemp }} °C</p>
          </div>
          <div class="info-item">
            <h3>Status</h3>
            <p>{{ response.finaldata.nowStatus }}</p>
          </div>
          <div class="info-item">
            <h3>Wind</h3>
            <p>{{ response.finaldata.nowWind }} km/h</p>
          </div>
          <div class="info-item">
            <h3>Feels Like Temperature</h3>
            <p>{{ response.finaldata.nowFeelsLikeC }} °C</p>
          </div>
          <div class="info-item">
            <img :src="icons.nowicon" alt="nowicon" />
          </div>
        </div>
      </div>

      <div class="forecast">
        <div class="forecast-item">
          <h2>Today</h2>
          <div class="weather-info">
            <div class="info-item">
              <h3>Max Temperature</h3>
              <p>{{ response.finaldata.today.todaysWeatherMax }} °C</p>
            </div>
            <div class="info-item">
              <h3>Min Temperature</h3>
              <p>{{ response.finaldata.today.todaysWeatherMin }} °C</p>
            </div>
            <div class="info-item">
              <img :src="icons.todayicon" alt="todayicon" />
            </div>
          </div>
        </div>
        <div class="forecast-item">
          <h2>{{ tomorrowdate() }}</h2>
          <div class="weather-info">
            <div class="info-item">
              <h3>Max Temperature</h3>
              <p>{{ response.finaldata.tomorrow.tomorrowWeatherMax }} °C</p>
            </div>
            <div class="info-item">
              <h3>Min Temperature</h3>
              <p>{{ response.finaldata.tomorrow.tomorrowWeatherMin }} °C</p>
            </div>
            <div class="info-item">
              <img :src="icons.tomorrowicon" alt="tomorrowicon" />
            </div>
          </div>
        </div>
        <div class="forecast-item">
          <h2>{{ aftertomorrowdate() }}</h2>
          <div class="weather-info">
            <div class="info-item">
              <h3>Max Temperature</h3>
              <p>
                {{ response.finaldata.afterTomorrow.afterTomorrowWeatherMax }}
                °C
              </p>
            </div>
            <div class="info-item">
              <h3>Min Temperature</h3>
              <p>
                {{ response.finaldata.afterTomorrow.afterTomorrowWeatherMin }}
                °C
              </p>
            </div>
            <div class="info-item">
              <img :src="icons.aftertomorrowicon" alt="aftertomorrowicon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="footer">
    <p>
      <a href="https://github.com/kgnylm" target="_blank">GitHub</a> |
      <a href="https://x.com/kgnylm" target="_blank">Twitter</a> |
      <a href="https://instagram.com/kgn.ylm" target="_blank">Instagram</a> |
      <a href="https://www.linkedin.com/in/mustafakaganyalim/" target="_blank"
        >LinkedIn</a
      >
    </p>
  </footer>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      searchedCity: "",
      response: null,
      error: null,
      icons: {
        nowicon: "",
        todayicon: "",
        tomorrowicon: "",
        aftertomorrowicon: "",
      },
    };
  },
  methods: {
    async getApi() {
      await axios
        .get(
          `https://weather-server-api.onrender.com/weather/${this.searchedCity}`
        )
        .then((response) => {
          this.response = response.data;
          this.icons.nowicon = "https://" + this.response.finaldata.nowIcon;
          this.icons.todayicon =
            "https://" + this.response.finaldata.today.todaysIcon;
          this.icons.tomorrowicon =
            "https://" + this.response.finaldata.tomorrow.tomorrowIcon;
          this.icons.aftertomorrowicon =
            "https://" +
            this.response.finaldata.afterTomorrow.afterTomorrowIcon;
        })
        .catch((error) => {
          this.error = error;
        });
    },
    nowTime() {
      const today = this.response.finaldata.localtime;
      const date = new Date(today);
      const hour = date.getHours();
      const minute = date.getMinutes();
      const formattedMinute = minute < 10 ? "0" + minute : minute;
      const nowTime = hour + ":" + formattedMinute;
      return nowTime;
    },
    tomorrowdate() {
      const today = this.response.finaldata.localtime;
      const date = new Date(today);
      const day = date.getDate() + 1;
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const tomorrowdate = day + "/" + month + "/" + year;
      return tomorrowdate;
    },
    aftertomorrowdate() {
      const today = this.response.finaldata.localtime;
      const date = new Date(today);
      const day = date.getDate() + 2;
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const aftertomorrowdate = day + "/" + month + "/" + year;
      return aftertomorrowdate;
    },
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #333;
  margin-top: 20px;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #fef9f7;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.search-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

input[type="text"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 5px;
  flex: 1;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #5f7ff5;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
}

.weather-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.current-weather {
  background-color: #edcdc2;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.weather-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.info-item {
  text-align: center;
  flex: 1;
  padding: 10px;
}

.forecast {
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-between;
}

.forecast-item {
  flex: 1;
  padding: 20px;
  background-color: #edcdc2;
  border-radius: 4px;
  text-align: center;
  margin-right: 10px;
  margin-bottom: 10px; 
}

.forecast-item:last-child {
  margin-right: 0;
}

.forecast-item h2 {
  font-size: 20px;
}
.footer {
  background-color: #5f7ff5;
  color: white;
  padding: 10px 0;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  transition: height 0.3s; 
}

@media screen and (max-width: 768px) {
  .footer {
    height: 40px; 
    padding: 5px 0; 
  }
}

@media screen and (min-width: 768px) {
  .footer {
    height: 60px; 
  }
}

.footer a {
  color: white;
  text-decoration: none;
}
.footer p {
  font-family: Arial, sans-serif;
}

@media screen and (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }

  input[type="text"] {
    margin-right: 0;
    margin-bottom: 5px;
  }

  .weather-info .info-item {
    flex-basis: 50%;
  }

  .forecast {
    flex-direction: column;
  }

  .forecast-item {
    margin-right: 0;
  }
}
@media screen and (min-width: 768px) {
  .search-container {
    flex-direction: row;
  }

  input[type="text"] {
    margin-right: 5px;
    margin-bottom: 0;
    flex: initial;
  }

  button {
    flex: initial; 
  }
}
</style>
