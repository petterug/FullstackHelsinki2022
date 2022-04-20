import axios from 'axios'
import {useEffect, useState} from 'react'

const Country = ({ country }) => {

    const [weather, setWeather] = useState([]) 
    const apiKey = process.env.REACT_APP_OPEN_WEATHER
    const lat = country.latlng[0]
    const lon = country.latlng[1]
    
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => {
            setWeather(response.data)
            console.log("I fire once?");
            })
            .catch(err => console.log(err))
        }, [])
    
    const langs = Object.values(country.languages)


    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>
                <p>Capital: {country.capital[0]}</p>
                <p>Area: {country.area}</p>
            </div>
            <div>
                <ul>
                    {langs.map(lang => <li key={lang} >{lang}</li>)}
                </ul>
            </div>
            <div>
                <img src={country.flags.png} alt={country.name.common} />
            </div>
            <div>
            {Object.keys(weather).length > 0 &&
                <div>
                    <h1>Weather in {country.capital[0]}</h1>
                    <p>temperature {weather.main.temp} Celsius</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                    <p>wind {weather.wind.speed} m/s</p>
                </div>
                }
            </div>
        </div>
    )
}


export default Country
/*
        {Object.keys(weather).length > 0 &&
        <div>
            <h1>Weather in {country.name.common}</h1>
            <p>temperature {console.log(weather)} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <p>wind {weather.wind} m/s</p>
        </div>
        }
*/

