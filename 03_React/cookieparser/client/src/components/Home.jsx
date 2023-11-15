import React, { useState } from 'react';
import LoginHome from './home/LoginHome';
import LogoutHome from './home/LogoutHome';

const Home = () => {
  const [Loginout, setLoginout] = useState(false);
  return (
    <div className='center'>
      <h2>메인 페이지</h2>
      { Loginout ? <LoginHome/> : <LogoutHome/>}
    </div>
  )
}

export default Home