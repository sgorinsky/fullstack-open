import React from 'react'
import { connect } from 'react-redux'

import { updateBlog } from '../reducers/blogs'
import { clearAllNotifications, setSuccessNotification, setErrorNotification } from '../reducers/notifications'

const Like = ({ 
    blog,
    user
}) => {
    const handleLikes = async () => {
        try {
            const currentUserLikes = user && user.hasOwnProperty('likedBlogs') ? user.likedBlogs : {};
            const currentBlogLikes = blog && blog.hasOwnProperty('usersLiked') ? blog.usersLiked : {};
            if (user && !currentUserLikes.hasOwnProperty(blog.id)) {
                currentBlogLikes[user.id] = true;
                updateBlog(blog.id, user.token, { likes: Object.keys(currentBlogLikes).length, usersLiked: currentBlogLikes })
                const currentUser = user
                currentUserLikes[blog.id] = true;
                currentUser.likedBlogs = currentUserLikes;
                // await userService.update(user.id, user.token, { likedBlogs: currentUserLikes })
            } else if (user) {
                delete currentBlogLikes[user.id]
                // setLikeButton(!likeButton)
                // setLikes(Object.keys(currentBlogLikes).length)
                // await blogService.update(blog.id, { likes: Object.keys(currentBlogLikes).length, usersLiked: currentBlogLikes })
                const currentUser = user
                delete currentUser.likedBlogs[blog.id];
                // await userService.update(user.id, { likedBlogs: currentUser.likedBlogs })
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
    clearAllNotifications,
    setSuccessNotification,
    setErrorNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(Like)