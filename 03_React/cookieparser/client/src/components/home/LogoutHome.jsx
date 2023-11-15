import React from 'react';
import { Button } from 'react-bootstrap';

const LogoutHome = () => {
  return (
    <div className='center'>
      <h3 className='m-5'>로그인 혹은 회원가입 페이지입니다.</h3>
      <Button href="/login" variant='outline-info' className='m-1'>로그인</Button>
      <Button href="/register" variant='outline-success' className='m-1'>회원가입</Button>
    </div>
  )
}

export default LogoutHome