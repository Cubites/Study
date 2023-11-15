const fs = require('fs');

const str = 'fs.writeFile 테스트 문장입니다.'
// fs.writeFile(파일, 넣을 문장, 인코딩 형식, callback) - 비동기 실행
// 인코딩 default : utf8
fs.writeFile('./data/test2.txt', str, 'utf8', (err) => {
    console.log(err);
});