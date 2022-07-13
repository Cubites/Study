const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('port', process.env.PORT || 4000);

const config = require('./config/key');

const { User } = require('./models/User');

// content-Type : application/x-www-form-urlencoded 인 데이터를 읽어들임
app.use(bodyParser.urlencoded({extended: true}));

// content-Type : application/json 인 데이터를 읽어들임
app.use(bodyParser.json());

// mongoose (mongoDB 연결)
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/register', (req, res) => {
    // 회원 가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣음
    const user = new User(req.body);
    user.save((err, userInfo) => { // mongoDB 메소드, DB에 데이터를 저장
        console.log("userInfo : " + userInfo);
        if(err) return res.json({ success: false, err});
        return res.status(200).json({ success: true }); // .json() : 내용을 출력시킴
    });

})

app.listen(app.get('port'), () => {
    console.log(app.get('port') + ' port connected...');
});