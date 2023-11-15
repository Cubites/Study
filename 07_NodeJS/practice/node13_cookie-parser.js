const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.set('port', 4000);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieParser());
app.get('/', (req, res) => {
    console.log('Cookies data-type: ' + typeof(req.cookies));
    console.dir(req.cookies);
    res.send(req.cookies);
});

app.post('/api/users/register', (req, res) => {
    res.send(req.body);
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 실행 중...`);
});