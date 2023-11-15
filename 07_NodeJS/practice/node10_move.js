const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('port', 4000);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// app.use('/', express.static(path.join(__dirname, 'pages'))); // public 폴더 지정

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/home.html')); // __dirname : 현재 경로
});

app.get('/pages/page1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/page1.html'));
});

app.get('/pages/page2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/page2.html'));
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 포트에서 실행 중...');
});