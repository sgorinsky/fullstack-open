import React, { useState } from 'react'
import ReactDOM from 'react-dom'
/*
const Hello = (props) => {  
    return (    
    <div>      
        <p>Hello {props.name}, you are {props.age} years old!</p>   
    </div>  
    )
}

const Footer = () => {
    return [
        <div>
            greeting app created by   
            <a href="https://github.com/sgorinsky"> sgorinsky</a>
        </div>
    ]
}

const App = () => {
    const name = 'Daisy'
    const age = 27
    // can declare "fragments" for DOM tree using more concise syntax <>
    // in this case, App is the root
    return (
        <> 
            <h1> Greetings </h1>
            <Hello name="Sam" age={50/2+1}/>
            <Hello name={name} age={age}/>
            <Hello name="Peach" age={29} />

            <Footer />
        </>
    )
}


// destructured assignment of name, age instead of props.name and props.age
const Hello = ({name, age}) => {
    const bornYear = () => new Date().getFullYear() - age;

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}


const App = () => {
    const name = 'Peter'
    const age = 10

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Maya" age={26 + 10} />
            <Hello name={name} age={age} />
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = (props) => {
    const [counter, setCounter] = useState(0);

    //const increaseByOne = () => setCounter(counter + 1);
    //const setToZero = () => setCounter(0);

    // event handlers in react expect a reference to a function, not a function call
    const setToValue = (value) => { 
        // if we didn't include this pointer to a function, we would see the error 'too many renders'
        // that is b/c we would call a function which calls itself and points to itself infinitely
        // react event handlers expect pointers to functions to be evaluated
        return () => { 
            setCounter(value);
        }
    }

    return (
        <div>
            <Display counter={counter} />
            <Button 
                onClick={setToValue(counter + 1)}
                text='plus' 
            />        
            <Button
                onClick={setToValue(counter - 1)}
                text='minus'
            />  
            <Button
                onClick={setToValue(0)}
                text='zero'
            />  
        </div>
    )
}
*/

const Statistic = ({ counter, text }) => {
    return (
        <div>{text} {counter} </div>
    )
}

const Display = ({text}) => (
    <div>
        {text}
    </div>
)

const Votes = ({n}) => (
    <div>
        has {n} votes
    </div>
)

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Feedback = ({good, neutral, bad}) => {
    const total = good+bad+neutral;
    if (0 === total) {
        return (
            <div> No feedback given </div>
        )
    } 
    return (
        <>
            <Statistic text='good' counter={good} />
            <Statistic text='neutral' counter={neutral} />
            <Statistic text='bad' counter={bad} />
            <Statistic text='all' counter={total} />
            <Statistic text='average' counter={(good - bad) / total} />
            <Statistic text='positive' counter={Math.round(1000 * (good / (good + bad + neutral))) / 10 + '%'} />
        </>
    )
}

const points = [0, 0, 0, 0, 0, 0]; 

const App = (props) => {
    
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ];

    const [selected, setSelected] = useState(0);
    const [max, setMax] = useState(0);
    
    const updateMax = (current) => {
        return () => {
            ++points[current];
            setMax(Math.max(points));
        }
    }

    console.log(points);
    console.log(selected);
    return (
        <div>
            <h1> Give feedback </h1>
            <Button
                onClick={() => setGood(good + 1)}
                text='good'
            />
            <Button
                onClick={() => setNeutral(neutral + 1) }
                text='neutral'
            />
            <Button
                onClick={() => setBad(bad + 1)}
                text='bad'
            />
            <h1> Statistics </h1>
            <Feedback good={good} neutral={neutral} bad={bad} />

            <h1> Anecdote of the day </h1>
            <Display text={anecdotes[selected]} />
            <Votes n={points[selected]} />
            <Button
                onClick={updateMax(selected)}
                text='vote'
            />
            <Button 
                onClick={ () => setSelected(Math.round(Math.random() * (anecdotes.length - 1))) }
                text='next anecdote'
            />            
            
            <h1>Anecdote with most votes </h1>
            <Display text={anecdotes[points.indexOf(Math.max(...points))]} />
            <Votes n={Math.max(...points)}/>

        </div>
    )
    
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

