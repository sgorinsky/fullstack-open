import React from 'react'
import Statistic from './Statistic'

const Feedback = ({ good, neutral, bad }) => {
    const total = good + bad + neutral;
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
            <br></br>
            <Statistic text='all' counter={total} />
            <Statistic text='average' counter={(good - bad) / total} />
            <Statistic text='positive' counter={Math.round(1000 * (good / (good + bad + neutral))) / 10 + '%'} />
        </>
    )
}

export default Feedback