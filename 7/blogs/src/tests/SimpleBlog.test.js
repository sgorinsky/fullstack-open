import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    let component

    beforeEach(() => {
        const newBlog = {
            title:'title',
            author:'author',
            likes:10
        }
        component = render(
            <SimpleBlog blog={newBlog} onClick={() => console.log('click')}/>
        )
    })

    test('renders its children', () => {
        component.container.querySelector('.body')
    })
})