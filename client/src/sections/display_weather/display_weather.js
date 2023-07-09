// The Weather display component of the weather app
import React from "react";
import "./display_weather.css"

// Populating only the required weather info into the display box 
const DisplayWeather = ({ data }) => {
    return (
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">{data.city}</p>
                    <p className="description">{data.weather[0].description}</p>
                </div>
                <img
                    alt="weather"
                    className="weather-icon"
                    src={`weather_icons/${data.weather[0].icon}.png`}
                />
            </div>
            <div className="bottom">
                <p className="temperature">{Math.round(data.main.temp)}°C</p>
                <div className="details">
                    <div className="detail-row">
                        <span className="parameter-label">Real Feel</span>
                        <span className="parameter-value">
                            {Math.round(data.main.feels_like)}°C
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value">{data.wind.speed} m/s</span>
                    </div>
                    <div className="detail-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">{data.main.humidity}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DisplayWeather;