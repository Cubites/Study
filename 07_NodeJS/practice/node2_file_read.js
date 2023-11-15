const fs = require('fs');

/* readFileSync, readFile */
// 인코딩 위치에 아무값도 넣지 않으면 default 인 바이너리 데이터를 반환함

/* flag
  'r' - 읽기로 열기. 파일이 존재하지 않으면 에러발생.
  'r+' - 읽기/쓰기로 열기. 파일이 존재하지 않으면 에러발생.
  'w' - 쓰기로 열기. 파일이 존재하지 않으면 만들어지고, 파일이 존재하면 지우고 처음부터 씀.
  'w+' - 읽기/쓰기로 열기. 파일이 존재하지 않으면 만들어지고, 파일이 존재하면 처음부터 씀.
  'a' - 추가 쓰기로 열기. 파일이 존재하지 않으면 만들어짐.
  'a+' - 파일을 읽고/추가쓰기모드로 열기. 파일이 존재하지 않으면 만들어짐.
*/
// fs.readFile(파일 상대경로, 인코딩) - 비동기 처리
fs.readFile('./package.json', 'utf8', (err, data) => {
    console.log('<readFile>');
    if(err){
        console.log(err);
        return;
    }
    console.log(data);
});

// fs.readFileSync(파일 상대경로, 인코딩) - 동기 처리
const data = fs.readFileSync('./package.json', 'utf8');
console.log('<readFileSync>');
console.log(data);
