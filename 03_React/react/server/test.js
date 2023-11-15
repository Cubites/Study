const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    console.log(req);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 포트에서 서버 실행 중...');
})