import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];
const points = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0);

const App = (props) => {
    
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    
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

