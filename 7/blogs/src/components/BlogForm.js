import React, { useState } from 'react'
import { connect } from 'react-redux'

import useField from '../hooks/useField'
import { getBlogs, createBlog } from '../reducers/blogs'

import blogService from '../services/blogs'
import refService from '../services/refs'

const BlogForm = ({ user, setBlogs, setNotification, setError, createBlog, blog='', PostNotPut=true }) => {
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
            
            const response = createBlog(newBlog, user.token)
            setNotification(`${titleField.input.value} created by ${ user.username}!`)
            titleField.reset()
            bodyField.reset()
            setTimeout(() => {
                setNotification(null)
            }, 1500)

        } catch {
            setError(true)
            setNotification(`error posting ${titleField.input.value}`)

            setTimeout(() => {
                setError(false)
                setNotification(null)
            }, 2500)
        }
    }

    const updateBlog = async (event) => {
        event.preventDefault()
        try {
            await blogService.update(blog.id, { title: titleField.input.value, body: bodyField.input.value })
            const temps = await blogService.getAll()
            setBlogs(temps)
            setNotification(`${titleField.input.value} updated!`)
            titleField.reset()
            bodyField.reset()
            refService.blogUpdateRef.current.toggleVisibility()
            setTimeout(() => {
                setNotification(null)
            }, 2500)
        } catch {
            setError(true)
            setNotification(`error updating ${titleField.input.value}`)

            setTimeout(() => {
                setError(false)
                setNotification(null)
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

const mapDispatchToProps = {
    getBlogs,
    createBlog,
}

export default connect(null, mapDispatchToProps)(BlogForm)