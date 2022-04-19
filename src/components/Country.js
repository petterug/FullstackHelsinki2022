const Country = ({ country }) => {

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
        </div>
    )
}

export default Country