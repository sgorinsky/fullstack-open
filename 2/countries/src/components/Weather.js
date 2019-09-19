import React from 'react'

const Weather = ({country, api}) => {
    
    
    if (api.toLowerCase() === 'weatherbit') {
        var url = 'https://api.weatherbit.io/v2.0/current?key=0af2af5ad1f447d894126bd2200167f1&city=' + country.capital
        var weather = '';
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                weather = response.data[0];
            })
        const icon = 'https://www.weatherbit.io/static/img/icons/' + weather.weather.icon + '.png';

        return (
            <>
                <h3> Weather in {country.capital} </h3>
                <li><strong>temp in C:</strong> {weather.temp} </li>
                <li><strong>AQI:</strong>{weather.aqi}</li>
                <img src={icon}></img>
            </>

        )

    } else if (api.toLowerCase() === 'weatherstack') {
        var weather = '';
        var url = 'http://api.weatherstack.com/current?access_key=b893d61857c61c720dcf7881ac0622b7&query=' + country.capital

        fetch(url)
            .then(response => response.json())
            .then(response => {
                weather = response;
            })
        const icon = weather['weather_icons'][0];

        return (
            <>
                <h3> Weather in {country.capital} </h3>
                <li><strong>localtime: </strong> {weather['location']['localtime']}</li>
                <li><strong>temp in C:</strong> {weather['current'].temp} </li>
                <img src={icon}></img>
            </>

        )


    }

    return (
        <>
        </>
    )
}

export default Weather;