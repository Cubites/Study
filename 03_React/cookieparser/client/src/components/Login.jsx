import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
  return (
    <Container className='mt-5' style={{'maxWidth': '600px'}}>
      <h2>로그인</h2>
      <Form action="/" method="post">
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' name='email' placeholder='Email' />
        </Form.Group>
          
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' placeholder='Password' />
        </Form.Group>

        <Form.Group className='mt-5 mx-auto'>
          <Button variant="primary" type="submit">로그인</Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default Login