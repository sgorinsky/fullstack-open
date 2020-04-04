import React from 'react';
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = ({ success, error }) => {
    if (success) {
        return (
            <Alert variant='success'> {success} </Alert>
        )
    }

    if (error) {
        return (
            <Alert variant='danger'> {error} </Alert>
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