import React from 'react';
import Button from './Button';

const ShowAll = ({ country }) => {
    console.log(country);
    return (
        <>
            <h1> {country.name} </h1>
            <li> capital {country.capital} </li>
            <li> population {country.population} </li>
            <h3> Languages </h3>
            { country.languages.map((language) => <li> {language.name} </li>) }
            <img src={country.flag}></img>
        </>
    )
}

const Show = ({ countries }) => {
    if (countries.length == 1) {
        return (
            <ShowAll country={countries[0]} />
        )
    } else if (!Array.isArray(countries)) {
        console.log(countries);
        return (
            <ShowAll country={countries} />
        )
    }

    const showAllButton = (country) => {
        console.log(country)
        return () => <li>Check</li>
    }
    return (
        <>
            { countries.map(country => 
                <>
                    <li>
                        {country.name}
                    </li> 
                </>
                
            )}
        </>
    )
}

export default Show