import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  }
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }
  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value);
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비민번호 확인이 일치하지 않습니다.');
    }

    let body = {
      email: Email,
      password: Password
    };

    axios.post('/api/users/register', body)
      .then(response => {
        console.log('res print');
        console.log(response);
      })
      .catch(err => console.log(err));
  }
  return (
    <Container className='mt-5' style={{'maxWidth': '600px'}}>
      <h2>로그인</h2>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' name='Email' placeholder='Email' onChange={onEmailHandler} />
        </Form.Group>
          
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='Password' placeholder='Password' onChange={onPasswordHandler} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password Check</Form.Label>
          <Form.Control type='password' name='ConfirmPassword' placeholder='Confirm Password' onChange={onConfirmPasswordHandler}/>
        </Form.Group>
        <Form.Group className='mt-5 mx-auto'>
          <Button variant="primary" type="submit">Register</Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default Register