// server/index.js

import dotenv from 'dotenv'
import express from 'express'
import fetch from "node-fetch"
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const PORT = process.env.PORT || 3001;
const app = express();

// authenticating with rapid api
const geoDBOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

// Rapid api url to fetch city information
const GEODB_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// using Open weather map url to fetch weather data 
const OPEN_WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;


// External  call to Open Weather API to fetch the weather information for a particular lat and lon
app.get('/current-weather', (req, res) => {

  let urlToCall = `${OPEN_WEATHER_API_URL}/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;

  fetch(urlToCall)
    .then((response) => {
      response.json().then((res1) => {
        res.send(res1);
      })
    })
    .catch(err => console.error(err));
});

// External call to Rapid API's GeoDb to fetch the cities.
app.get('/cities', (req, res) => {

  let citiesUrlToCall = `${GEODB_API_URL}/cities?minPopulation=100000&namePrefix=${req.query.PreFix}`;

  fetch(citiesUrlToCall, geoDBOptions)
    .then((response) => response.json().then((response) => {
      res.send({
        options: response.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      });
    }))
})

// used to build the react app for heroku
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// node server listening on port 3001
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

