import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from '../components/Togglable'
import Like from '../components/Like'

describe('<Blog />', () => {
    let component
    let like
    const start = () => {
        like = true
        const newBlog = {
            title: 'title',
            author: 'author',
            likes: 10
        }

        const likeButton = () => {
            var button = component.container.querySelector('.like')
            button.textContent = button.textContent === 'unlike' ? 'like' : 'unlike'
            like = button.textContent === 'unlike' ? true : false
        }

        component = render(
            <div className='blog'>
                <div>
                    <li className='title' > <h5>title</h5></li>
                    <div className='main'>
                        <li className='author'><h6>author </h6></li>
                        <li className='body'>body</li>
                    </div>
                    <Like handleLikes={likeButton} likeButton={like} />
                </div>
                <div>
                    <Togglable buttonLabel="edit?">
                        <div className='toggled-div'>Toggle this</div>
                    </Togglable>
                    <button onClick={(event) => { event.target.textContent = 'DELETE' }}>delete</button>
                </div>
            </div>

        )

    }
    
    beforeEach(start)

    test('renders blog', () => {
        const div = component.container.querySelector('.blog')
    })

    test('toggles on/off', () => {
        const button = component.getByText('edit?')
        fireEvent.click(button)
        const div = component.container.querySelector('.togglable1')
        expect(div).toHaveStyle('')
        fireEvent.click(button)
        expect(div).not.toHaveStyle('display: none')
    })

    test('like button', () => {
        var button = component.container.querySelector('.like')
        component.getByText('unlike')
        fireEvent.click(button)
        component.getByText('like')
        fireEvent.click(button)
        component.getByText('unlike')
    })
    
    test('main body', () => {
        var main = component.container.querySelector('.main')
        expect(main.textContent).toBe('author body')
    })
})