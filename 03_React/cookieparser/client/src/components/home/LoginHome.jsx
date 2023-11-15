import React from 'react';
import { Button } from 'react-bootstrap';

const LoginHome = () => {
  return (
    <div className='center'>
      <Button href="/login" variant='outline-warning'>로그아웃</Button>
    </div>
  )
}

export default LoginHome