import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ start = false, buttonLabel, ...props }) => {
    const [visible, setVisible] = useState(start)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const toggleVisibility = () => {
        setVisible(!visible)
    }
    return (
        <div className='toggle'>
            <div style={hideWhenVisible} className='togglable1'>
                <button className='btn btn-info my-1' onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className='toggleble2'>
                {props.children}
                <button className='btn btn-danger my-1' onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable;