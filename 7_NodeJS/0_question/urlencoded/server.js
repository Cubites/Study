const express = require('express');
const app = express();

app.set('port', 4000);

// content-type이 x-www-form-urlencoded일 때만 extended true, false가 동작함
app.use(express.urlencoded({extended: true}));
// app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/data', (req, res) => {
    console.log(req.query);
    res.send('전송완료');
});

app.post('/data', (req, res) => {
    console.log(req.body);
    res.send('전송완료');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + "번 포트에서 실행중...");
});