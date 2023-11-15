const express = require('express');
const router = express.Router();

router.post('/users/loginok', (req, res) => {
    console.log('로그인 시도');
    console.dir(req.body);
    res.writeHead(200, {'content-type': 'text/html;charset=utf8'});
    res.write(`
        <h1>로그인 완료</h1>
        <div>아이디 : ${req.body.userid}, 비밀번호 : ${req.body.userpass}</div>
    `);
    res.end();
    console.log('로그인 완료');
})

module.exports = router;