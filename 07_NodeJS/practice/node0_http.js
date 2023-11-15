const http = require('http');

const server = http.createServer();
const port = 4000;

server.listen(port, () => {
    console.log(`${port}번 포트에서 서버 실행 중...`);
});
server.on('connection', () => {
    console.log(`클라이언트가 접속했습니다.`);
});