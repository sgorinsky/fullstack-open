import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

const Notification = ({ success, error }) => {
    const [className, setClassName] = useState(null)

    useEffect(() => {
        if (success) {
            setClassName('success')
        } else if (error) {
            setClassName('error')
        } else {
            setClassName(null)
        }
    }, [success, error])

    return (
        <div className={className}>
            {error || success}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        success: state.notifications.success,
        error: state.notifications.error
    }
}
export default connect(mapStateToProps)(Notification);