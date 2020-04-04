import React from 'react'
import { connect } from 'react-redux'

import useField from '../hooks/useField'

import { createBlog, updateBlog } from '../reducers/blogs'
import { clearAllNotifications, setSuccessNotification, setErrorNotification } from '../reducers/notifications'

const BlogForm = ({ 
    user, 
    createBlog,
    updateBlog,
    clearAllNotifications, 
    setSuccessNotification, 
    setErrorNotification, 
    blog, 
    PostNotPut=true 
}) => {
    const titleField = useField('text', 'title')
    const bodyField = useField('text', 'body')

    const handleBlog = async (event) => {
        event.preventDefault()
        try {
            const newBlog = {
                title: titleField.input.value,
                body: bodyField.input.value,
                author:  user.username,
                likes: 0,
                user:  user.id
            }
            
            const response = await createBlog(newBlog, user.token)
            if (response.user) {
                setSuccessNotification(`${titleField.input.value} created by ${user.username}!`)
            } else {
                setErrorNotification(`error posting ${titleField.input.value}`)
            }
            titleField.reset()
            bodyField.reset()
            
            setTimeout(() => {
                clearAllNotifications()
            }, 1500)

        } catch {
            setErrorNotification(`error posting ${titleField.input.value}`)

            setTimeout(() => {
                clearAllNotifications()
            }, 2500)
        }
    }

    const changeBlog = async (event) => {
        event.preventDefault()
        try {
            const tempTitle = blog.title
            const updated = await updateBlog(blog.id, user.token, { title: titleField.input.value, body: bodyField.input.value })

            if (updated.id) {
                setSuccessNotification(`"${tempTitle}" updated to "${titleField.input.value}"!`)
                titleField.reset()
                bodyField.reset()
            } else {
                setErrorNotification('Error updating blog')
            }
            setTimeout(() => {
                clearAllNotifications()
            }, 2500)

        } catch (error) {
            console.log(error)
            setErrorNotification(`Error updating ${titleField.input.value}`)
            setTimeout(() => {
                clearAllNotifications()
            }, 2500)
        }
    }

    return (
        <form onSubmit={PostNotPut ? handleBlog : changeBlog}>
            <div>
                title
                <input {...titleField.input} />
            </div>

            <div>
                content
                <input {...bodyField.input} />
            </div>
            <button type='submit'>submit</button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
    }
}

const mapDispatchToProps = {
    createBlog,
    updateBlog,
    clearAllNotifications,
    setSuccessNotification,
    setErrorNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)