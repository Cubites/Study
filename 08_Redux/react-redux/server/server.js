const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const setCookie = require('set-cookie-parser');

const config = require('./config/key');
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');
const app = express();

app.set('port', 4000);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
dotenv.config();

mongoose.connect(process.env.MONGO_URI_DEVELOPMENT)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connecting error : ' + err));

app.post('/api/users/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "존재하지 않는 계정입니다."
            });
        }else{
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch){
                    return res.json({
                        loginSuccess: false,
                        message: "아이디 혹은 비밀번호가 맞지 않습니다."
                    });
                }
            });
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                let nowDate = new Date();
                // let loginCookie = setCookie({
                //     name: 'x_auth',
                //     value: user.token,
                //     expires: nowDate.setSeconds(nowDate.getSeconds() + 10)
                // });
                // res.cookies = loginCookie;
                // console.log(res);
                res.cookie("x_auth", user.token, {expire: nowDate.setSeconds(nowDate.getSeconds() + 10)})
                    .status(200)
                    .json({loginSuccess: true, userId: user._id});
                console.log(res);
            });
        }
    });
});

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200, json({
        _id: req.user._id
    }));
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 실행 중...`);
});