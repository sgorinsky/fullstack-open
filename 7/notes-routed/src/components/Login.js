import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

const Login = (props) => {
  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('samg')
    props.history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default withRouter(Login)