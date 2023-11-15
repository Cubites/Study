const fs = require('fs');

// fs.open - 비동기로 파일 open
const filename = 'test1.txt';
fs.open(`./data/${filename}`, 'r', (err, fd) => {
    if(err) throw err;
    let buf = new Buffer.allocUnsafe(50); // 한글은 글자당 2바이트이므로 2배 크기를 넣어야함
    fs.read(fd, buf, 0, buf.length, null, (err, bytesRead, buffer) => { // err, 데이터 길이, buffer 값
        if(err) throw err;
        let inStr = buffer.toString('utf8', 0, bytesRead); // 인코딩, 시작위치, 끝위치 => 버퍼 값을 utf8로 인코딩
        console.log('fs.read : ' + inStr);
        fs.close(fd, () => {
            console.log(`${filename} 파일의 데이터를 읽은 후 파일 닫음`);
        });
    })
})

