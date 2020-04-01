import React from 'react'
import { connect } from 'react-redux'

import useField from '../hooks/useField'

import { getBlogs, createBlog } from '../reducers/blogs'
import { clearAllNotifications, setSuccessNotification, setErrorNotification } from '../reducers/notifications'

import blogService from '../services/blogs'

const BlogForm = ({ user, getBlogs, createBlog, clearAllNotifications, setSuccessNotification, setErrorNotification, blog, PostNotPut=true }) => {
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
            
            createBlog(newBlog, user.token)
            setSuccessNotification(`${titleField.input.value} created by ${ user.username}!`)
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

    const updateBlog = async (event) => {
        event.preventDefault()
        try {
            await blogService.update(blog.id, { title: titleField.input.value, body: bodyField.input.value })
            getBlogs()
            setSuccessNotification(`${titleField.input.value} updated!`)
            titleField.reset()
            bodyField.reset()
            setTimeout(() => {
                clearAllNotifications()
            }, 2500)
        } catch {
            setErrorNotification(`error updating ${titleField.input.value}`)

            setTimeout(() => {
                clearAllNotifications()
            }, 2500)
        }

    }

    return (
        <form onSubmit={PostNotPut ? handleBlog : updateBlog}>
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
        user: state.user
    }
}

const mapDispatchToProps = {
    getBlogs,
    createBlog,
    clearAllNotifications,
    setSuccessNotification,
    setErrorNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)