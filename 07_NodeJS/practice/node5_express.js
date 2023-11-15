const express = require('express');

const app = express();

app.set('port', process.env.PORT || 4000);

// use(경로, (rreq, res, next) => {}) : "경로"에 오는 모든 요청에 응답을 보냄
// get(경로, (rreq, res, next) => {}) : "경로"에 오는 get 요청에 응답을 보냄
// 그외 post 등 http 요청 메서드들이 있음
app.get('/', (req, res, next) => {
    console.log('<첫 번째 미들웨어 호출>');
    res.writeHead(200, {'content-type': 'text/html;charset=utf8'}); // http 메세지 헤더 작성
    res.write('<h1>서버에서 응답<h1>'); // http 메세지 body 작성
    res.end(); // http 메세지 작성 종료
    next();
});

app.get('/', (req, res, next) => {
    console.log('<두 번째 미들웨어 호출>');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 포트에서 실행 중...');
});