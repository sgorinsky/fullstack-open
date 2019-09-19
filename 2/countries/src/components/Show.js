import React, {useState} from 'react';
import Button from './Button';
import Weather from './Weather';

const ShowAll = ({ country }) => {
    
    return (
        <>
            <h1> {country.name} </h1>
            <li> capital {country.capital} </li>
            <li> population {country.population} </li>
            <h3> Languages </h3>
            { country.languages.map((language) => <li> {language.name} </li>) }
            <img src={country.flag}></img>
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
            <ShowAll key={countries[0].id} country={countries[0]} />
        )
    } else if (!Array.isArray(countries)) {
        console.log(countries);
        return (
            <ShowAll key={countries.id} country={countries} />
        )
    }


    return (
        <>  
            { countries.map((country, index) => 
                <>
                    <li>
                        {country.name}
                        <button key='button' onClick={() => {
                            buttons[index] = true;
                            return setButtonState([...buttons]);
                        }}>
                            {buttonStates[index] ? 
                                <ShowAll country={countries[index]} /> 
                                :'show'}
                        </button>
                    </li> 
                </>
                
            )}
        </>
    )
}

export default Show