const express = require('express');
const app = express();

app.set('port', 4000);

const logger = require('./node6_winston');

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    logger.info("hello");
    logger.error(error.messsage);
    next();
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 포트에서 실행 중...');
});