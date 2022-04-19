import axios from 'axios'
import {useEffect, useState} from 'react'

const Country = ({ country }) => {

    const [weather, setWeather] = useState([]) 
    const apiKey = process.env.REACT_APP_OPEN_WEATHER
    const lat = country.latlng[0]
    const lon = country.latlng[1]
    let temp = -999
    let wind = -999
    let icon = '10n'
    

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => {
            setWeather(response.data)
            console.log('fires once');
            })
            .catch(err => console.log(err))
    
        }, [])
    
    const langs = Object.values(country.languages)

    if(weather !== undefined) {
        temp = weather.main.temp
        wind = weather.wind
        icon = weather.weather.icon 
    }

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
                <h1>Weather in {country.name.common}</h1>
                <p>temperature {temp} Celsius</p>
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                <p>wind {wind} m/s</p>
            </div>
        </div>
    )
}

export default Country