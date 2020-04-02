import React from 'react'
import { connect } from 'react-redux'

import { updateBlog } from '../reducers/blogs'
import { likeBlog, unlikeBlog } from '../reducers/user'
import { clearAllNotifications, setSuccessNotification, setErrorNotification } from '../reducers/notifications'

const Like = ({ 
    blog,
    user,
    updateBlog,
    likeBlog,
    unlikeBlog,
    clearAllNotifications,
    setSuccessNotification,
    setErrorNotification,
}) => {
    const handleLikes = async () => {
        try {
            if (user) {
                
            } else {
                setErrorNotification('Login to like a post');
                setTimeout(() => {
                    clearAllNotifications(null);
                }, 1200)
            }
        } catch {
            setErrorNotification('Error');
            setTimeout(() => {
                clearAllNotifications()
            }, 1200)
        }
    }
    return (
        <button className='like' onClick={handleLikes}>
            {true ? 'like' : 'unlike'}
        </button>   
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    updateBlog,
    likeBlog,
    unlikeBlog,
    clearAllNotifications,
    setSuccessNotification,
    setErrorNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(Like)