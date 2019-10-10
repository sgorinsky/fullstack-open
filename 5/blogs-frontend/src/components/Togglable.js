import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import refService from '../services/refs'

const Togglable = React.forwardRef((props = { start: false }, ref = refService.blogUpdateRef) => {
    const [visible, setVisible] = useState(props.start)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    return (
        <div className='toggle'>
            <div style={hideWhenVisible} className='togglable1'>
                <button className='button1' onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className='toggleble2'>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable;