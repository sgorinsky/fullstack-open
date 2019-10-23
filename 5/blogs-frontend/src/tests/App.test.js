import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
jest.mock('../services/blogs')
import App from '../App'

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

    })
})