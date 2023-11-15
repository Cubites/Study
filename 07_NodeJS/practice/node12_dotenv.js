const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.set('port', process.env.PORT || 5000); // env에 있는 PORT 값을 가져옴

app.get('/', (req, res) => {
    res.writeHead(200, {'content-type': 'text/html;charset=utf8'});
    res.write(`
        <h1>포트 번호 : ${app.get('port')}<h1>
    `);
    res.end();
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 실행 중...`);
});

