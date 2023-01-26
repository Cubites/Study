const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.set('port', process.env.PORT || 4000);

const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser()); // cookie-parser setting

// mongoose (mongoDB 연결)
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/api/user/register', (req, res) => {
    // 회원 가입할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣음
    const user = new User(req.body);
    user.save((err, userInfo) => { // mongoDB 메소드, DB에 데이터를 저장
        if(err) return res.json({ success: false, err });
        return res.status(200).json({ success: true }); // .json() : 내용을 출력시킴
    });
});

app.post('api/user/login', (req, res) => {
    // 1. 요청받은 이메일을 데이터베이스에 있는지 확인
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "입력된 이메일에 해당하는 유저가 없습니다."
            });
        }

        // 2. 요청받은 이메일이 데이터 베이스에 있으면, 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => { // comparePassword : User.js에서 만든 method
            if(!isMatch){
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다."
                });
            }
            // 3. 비밀번호까지 맞으면, 토큰 생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                // token을 저장해야 함 >> 쿠키, 로컬스토리지
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id});
            });
        });
    });
});

app.get('/api/users/auth', auth, (req, res) => {
    // authentication이 True면 이곳이 실행됨
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, // 0이 아니면 관리자
        isAuth: true, 
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + ' port connected...');
});