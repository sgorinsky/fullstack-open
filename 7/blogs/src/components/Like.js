import React from 'react'
import { connect } from 'react-redux'

import { updateBlog } from '../reducers/blogs'

const Like = ({ blogId, likeButton }) => {
    const handleLikes = async () => {
        try {
            const currentUserLikes = user && user.hasOwnProperty('likedBlogs') ? user.likedBlogs : {};
            const currentBlogLikes = blog && blog.hasOwnProperty('usersLiked') ? blog.usersLiked : {};
            if (user && !currentUserLikes.hasOwnProperty(blogId)) {
                currentBlogLikes[user.id] = true;
                updateBlog(blogId, user.token, { likes: Object.keys(currentBlogLikes).length, usersLiked: currentBlogLikes })
                const currentUser = user
                currentUserLikes[blogId] = true;
                currentUser.likedBlogs = currentUserLikes;
                await userService.update(user.id, user.token, { likedBlogs: currentUserLikes })
            } else if (user) {
                delete currentBlogLikes[user.id]
                setLikeButton(!likeButton)
                setLikes(Object.keys(currentBlogLikes).length)
                await blogService.update(blogId, { likes: Object.keys(currentBlogLikes).length, usersLiked: currentBlogLikes })
                const currentUser = user
                delete currentUser.likedBlogs[blogId];
                await userService.update(user.id, { likedBlogs: currentUser.likedBlogs })
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
            {likeButton ? 'unlike' : 'like'}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Like)