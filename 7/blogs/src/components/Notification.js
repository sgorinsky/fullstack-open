import React from 'react';
import { connect } from 'react-redux'

const Notification = ({ success, error }) => {
    if (success) {
        return (
            <div className='success'> {success} </div>
        )
    }

    if (error) {
        return (
            <div className='error'> {error} </div>
        )
    }

    return null
}

const mapStateToProps = (state) => {
    return {
        success: state.notifications.success,
        error: state.notifications.error
    }
}
export default connect(mapStateToProps)(Notification);