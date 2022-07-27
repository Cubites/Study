import React from 'react';

const App = () => {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

  const IdHandler = (e) => {
    e.preventDefault();
    setId(e.currentTarget.value);
  }
  const PasswordHandler = (e) => {
    e.preventDefault();
    setPassword(e.currentTarget.value);
  }
  const SubmitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={SubmitHandler}>
        <p>
          <label>아이디 : </label>
          <input type="text" value={Id} onChange={IdHandler} placeholder="아이디를 입력하세요"/>
        </p>
        <p>
          <label>비밀번호 : </label>
          <input type="password" value={Password} onChange={PasswordHandler} placeholder="비밀번호를 입력하세요"/>
        </p>
        <p><button type="submit">로그인</button></p>
      </form>
      <button>회원가입</button>
    </div>
  )
}

export default App