import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../_actions/action';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      password: Password
    };

    dispatch(loginUser(body))
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log('Login Error : ' + err));
  }
  return (
    <div>
      <form className='center' onSubmit={onSubmitHandler}>
        <h2 className='center'>로그인 페이지</h2>
        <p>
          <label>Email</label>
          <input 
            type='email'
            name='email' 
            placeholder='이메일'
            value={Email}
            onChange={onEmailHandler}
          />
        </p>
        <p>
          <label>Password</label>
          <input 
            type='password' 
            name='password' 
            placeholder='비밀번호'
            value={Password}
            onChange={onPasswordHandler}
          />
        </p>
        <p>
          <button className='center' type='submit'>Login</button>
        </p>
      </form>
    </div>
  )
}

export default LoginPage