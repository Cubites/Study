const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', 4000);

// querystring 과 query-string의 차이
app.use(bodyParser.urlencoded({extended: false})); // req.query == { array: { first: 'apple', second: 'banana' } }
// app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.writeHead(200, {'content-type': 'text/html;charset=utf8'});
    res.write(`
        <a href="/sendData/?array[first]=apple&array[second]=banana">button 1</a>
    `);
    res.end();
});

app.use('/sendData', (req, res) => {
    console.dir(req.query);
    res.writeHead(200, {'content-type': 'text/html;charset=utf8'});
    res.write('<h1>데이터 전송 완료</h1>');
    res.end();
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 포트에서 실행 중...');
});