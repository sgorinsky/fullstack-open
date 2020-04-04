import React from 'react'
import { connect } from 'react-redux'

import { get } from 'lodash'

import { updateBlog } from '../reducers/blogs'
import { likeBlog, unlikeBlog } from '../reducers/users'
import { clearAllNotifications, setErrorNotification } from '../reducers/notifications'

const Like = ({ 
    blog,
    user,
    updateBlog,
    likeBlog,
    unlikeBlog,
    clearAllNotifications,
    setErrorNotification,
}) => {
    const handleLikes = async () => {
        try {
            if (user) {
                let likes = blog.likes
                if (get(user, ['likedBlogs', blog.id], null)) {
                    unlikeBlog(user, blog)
                    --likes
                } else {
                    likeBlog(user, blog)
                    ++likes
                }
                updateBlog(blog.id, user.token, { likes })
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
        <button className='btn btn-secondary m-1' onClick={handleLikes}>
            {get(user, ['likedBlogs', blog.id], null) ? 'unlike' : 'like'}
        </button>   
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user
    }
}

const mapDispatchToProps = {
    updateBlog,
    likeBlog,
    unlikeBlog,
    clearAllNotifications,
    setErrorNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(Like)