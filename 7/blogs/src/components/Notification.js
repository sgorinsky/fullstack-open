import React from 'react';
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = ({ success, error }) => {
    if (success) {
        return (
            <div className='container my-2'>
                <Alert variant='success'> {success} </Alert>
            </div>
        )
    }

    if (error) {
        return (
            <div className='container my-2'>
                <Alert variant='warning'> {error} </Alert>
            </div>
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