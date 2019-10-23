import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
jest.mock('../services/blogs')
import App from '../App'

// all the blogs for my app are rendered, users just can't interact with their own unless they're logged in
// therefore, for these tests, i'm just checking the login and logout forms
describe('<App />', () => {
    test('if no user logged, login form rendered', async () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)

        console.log(component.container.textContent)
        await waitForElement(() => component.getByText('login'))
        
        console.log(component.container.textContent)
        console.log(component.container)
        const login = component.container.querySelectorAll('.login')
        expect(login.length).toBe(1)
        console.log('LOGIN')
        expect(login[0]).toHaveTextContent(/.*login.*/)
        expect(login[0]).not.toHaveTextContent(/.*logout.*/)

    })

    test('if user is logged in, logout button is rendered', async () => {
        const user = {
            username: 'root',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVkOTc4MjhmNzM5ZmUxYWNjYzJmYTllOCIsImlhdCI6MTU3MDY1OTA1NH0.Ny2ERa7QynodETAf0a_kdvT0AYReICr8FgNwKd3COKQ',
            name: 'root'
        }

        localStorage.setItem('loggedInBlogsUser', JSON.stringify(user))

        const component = render(
            <App />
        )
        component.rerender(<App />)

        const logout = component.container.querySelectorAll('.logout')
        expect(logout.length).toBe(1)
        console.log(logout.length)
        console.log('LOGOUT')
        console.log(logout[0].textContent)
        expect(logout[0]).not.toHaveTextContent(/.*login.*/)
        expect(logout[0]).toHaveTextContent(/.*logout.*/)

    })
})