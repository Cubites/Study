const express = require('express'); // express 모듈 호출
const app = express(); // express로 app 생성
const port = 4000; // port 번호 지정

// root directory로 요청이 오면 'Hello World'라는 텍스트를 응답으로 보냄
app.get('/', (req, res) => res.send('Hello World'));

// 'port'에서 app을 실행
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})