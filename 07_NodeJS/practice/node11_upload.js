const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();

app.set('port', 4000);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// uploads 를 읽고, 있으면 끝, 없으면 uploads 폴더 생성
try{
    fs.readdirSync('public/uploads');
}catch(err){
    console.log('uploads 폴더가 없어 uploads 폴더 생성');
    fs.mkdirSync('public/uploads');
};

// 업로드할 형태를 multer 로 생성
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){ // 업로드 파일 저장 위치
            done(null, 'public/uploads/');
        },
        filename(req, file, done){ // 파일 이름
            const ext = path.extname(file.originalname); // 업로드할 파일 확장자 저장
            done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 파일이름 + 날짜 + 확장자로 파일이름 지정
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024}, // 업로드 파일 크기 제한 (5 * 1024 * 1024 => 5MB)
});

// 첫 페이지로 upload.html 출력
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/upload.html'))
});

app.post('/upload', upload.single('image'), (req, res) => {
    console.log('image 업로드 요청 받음');
    console.dir(req);
    res.sendFile(path.join(__dirname, 'public/pages/upload_fin.html'));
    // res.send('ok');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 포트에서 실행 중...');
});