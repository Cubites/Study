import React from 'react'

const RegisterPage = () => {
  return (
    <div>
      <form className='center'>
        <h2 className='center'>회원가입 페이지</h2>
        <p><label>Email</label><input type='email' name='email' placeholder='이메일'/></p>
        <p><label>Password</label><input type='password' name='password' placeholder='비밀번호'/></p>
        <p><label>Confirm Password</label><input type='password' name='passwordConfirm' placeholder='비밀번호'/></p>
        <p><button className='center' type='submit'>Register</button></p>
      </form>
    </div>
  )
}

export default RegisterPage