import React, { useEffect, useState } from 'react';

const WeatherWidget = () => {
    const [latitude, setLatitude] = useState("1.360321");
    const [longitude, setLongitude] = useState("103.846733");

    useEffect(() => {
        loadSite();
    }, []);

    const loadSite = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                setLatitude(lat);
                setLongitude(lon);
            }, function (error) {
                console.error(error);
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        }
    };

    useEffect(() => {
        getWeather(latitude, longitude);
    }, [latitude, longitude]);

    const getWeather = () => {
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d4b99d25c0d1e0e80518b2abc9fdec9a`;
        console.log(url);
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                console.log(json);
                const temperatureElement = document.getElementById("temperature");
                if (temperatureElement) {
                    temperatureElement.innerText = Math.round((json.main.temp - 273.15) * 10) / 10 + "°C";
                }

                const locationElement = document.getElementById("location");
                if (locationElement) {
                    locationElement.innerText = json.name;
                }

                const descriptionElement = document.getElementById("description");
                if (descriptionElement) {
                    descriptionElement.innerText = json.weather[0].description;
                }

                const dataCityElement = document.getElementById("data_city");
                if (dataCityElement) {
                    dataCityElement.innerText = json.name;
                }

                const dataTemperatureElement = document.getElementById("data_temperature");
                if (dataTemperatureElement) {
                    dataTemperatureElement.innerText = Math.round((json.main.temp - 273.15) * 10) / 10 + "°C";
                }

                const dataHumidityElement = document.getElementById("data_humidity");
                if (dataHumidityElement) {
                    dataHumidityElement.innerText = json.main.humidity + "%";
                }

                const dataPressureElement = document.getElementById("data_pressure");
                if (dataPressureElement) {
                    dataPressureElement.innerText = json.main.pressure + "hPa";
                }

                const dataWindSpeedElement = document.getElementById("data_wind_speed");
                if (dataWindSpeedElement) {
                    dataWindSpeedElement.innerText = json.wind.speed + "m/s";
                }

                const dataWindDirectionElement = document.getElementById("data_wind_direction");
                if (dataWindDirectionElement) {
                    dataWindDirectionElement.innerText = json.wind.deg + "º";
                }

                const dataSunriseElement = document.getElementById("data_sunrise");
                if (dataSunriseElement) {
                    dataSunriseElement.innerText = new Date(json.sys.sunrise * 1000).toLocaleTimeString();
                }

                const dataSunsetElement = document.getElementById("data_sunset");
                if (dataSunsetElement) {
                    dataSunsetElement.innerText = new Date(json.sys.sunset * 1000).toLocaleTimeString();
                }
            });
    };

    return (
        <div style={{ minWidth: 300 }}>
            {/* tables */}
            <div className="table-container">
                <table className='custom-table'>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Temperature</th>
                            <th>Humidity</th>
                            <th>Pressure</th>
                            <th>Wind Speed</th>
                            <th>Wind Direction</th>
                            <th>Sunrise</th>
                            <th>Sunset</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        <tr>
                            <td id="data_city">London</td>
                            <td id="data_temperature">20</td>
                            <td id="data_humidity">20</td>
                            <td id="data_pressure">20</td>
                            <td id="data_wind_speed">20</td>
                            <td id="data_wind_direction">20</td>
                            <td id="data_sunrise">20</td>
                            <td id="data_sunset">20</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WeatherWidget;
