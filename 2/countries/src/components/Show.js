import React, {useState} from 'react';
import Button from './Button';
import Weather from './Weather';

const ShowAll = ({ country }) => {
    
    return (
        <>
            <h1> {country.name} </h1>
            <ul>
                <li> capital: {country.capital} </li>
                <li> population: {country.population} </li>
            </ul>
            
            <h3> Languages </h3>
            <ul>
                {country.languages.map((language) => <li key={language.name}> {language.name} </li>)}
            </ul>
            
            <img src={country.flag} width="500" height="300"></img>
            <Weather country={country} api='false' />
        </>
    )
}

const Show = ({ countries }) => {
    //initializing array of 'off' button states that correspond to each country in countries array
    const [buttonStates, setButtonState] = useState(Array.apply(null, Array(countries.length)).map(entry => false));
    var buttons = [...buttonStates];

    if (countries.length == 1) {
        return (
            <ShowAll country={countries[0]} />
        )
    } else if (!Array.isArray(countries)) {
        return (
            <ShowAll country={countries} />
        )
    }
    return (
        <>  
            { countries.map((country, index) => 
                <li key={country.numericCode}>
                    {country.name}
                    <button onClick={() => { // onClick toggles ShowAll button corresponding to country view
                        buttons[index] = !buttons[index]; 
                        return setButtonState([...buttons]);
                    }}>
                        {buttonStates[index] ? 
                            <ShowAll country={countries[index]} /> 
                            :'show'}
                    </button>
                </li> 
                
                
            )}
        </>
    )
}

export default Show