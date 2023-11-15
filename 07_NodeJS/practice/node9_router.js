const express = require('express');
const bodyParser = require('body-parser'); // http message body를 받을 수 있게 해줌
const router = require('./modules/router');
const app = express();

app.set('port', process.env.PORT || 4000);

app.use(bodyParser.urlencoded({extended: false})); // http message body를 받음, 중첩 객체를 허용하지 않음
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.writeHead(200, {'content-type': 'text/html;charset=utf8'});
    res.write(`
        <h1>로그인 페이지</h1>
        <form name="form" action="/users/loginok" method="post">
            <div><label>아이디</label><input type="text" name="userid" placeholder="아이디"></div>
            <div><label>비밀번호</label><input type="password" name="userpass" placeholder="비밀번호"></div>
            <button type="submit">로그인</button>
        </form>
    `);
    res.end();
});

app.post('/users/loginok', router);

app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 포트에서 실행 중...');
})