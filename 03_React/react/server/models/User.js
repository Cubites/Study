const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt의 자릿수 지정
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 문자열에서 space를 없애줌
        unique: 1
    },
    password: {
        type: String,
        // maxlength: 50
    },
    lactname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { // 토큰 사용기한
        type: Number
    }
});

userSchema.pre('save', function(next){ // .pre('save') : 'save' 하기 전에 할 직업 지정
    let user = this;

    if(user.isModified('password')){ // 'password'가 수정될 때만 실행
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash){ // hash : 암호화된 비밀번호
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
});

// comparePassword 라는 이름의 method 생성 > 비밀번호 확인
userSchema.methods.comparePassword = function(plainPassword, callback){
    // plainPassword == 암호화된 비밀번호 인지 확인 필요
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    });
};

userSchema.methods.generateToken = function(callback){
    let user = this;
    /*
        - jsonwebtoken을 이용해서 token을 생성
        - user._id + 'secretToken' => 토큰 생성
        => 'secretToken'을 넣으면 user._id 값이 나오게 됨
    */
    let token = jwt.sign(user._id.toHexString(), 'secretToken'); 

    user.token = token;
    user.save(function(err, user){
        if(err) return callback(err);
        callback(null, user);
    });
};

// .findByToken() : 토큰 값으로 유저 정보를 찾는 method
userSchema.statics.findByToken = function(token, callback){
    let user = this;

    // 토큰을 decode 함
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음, 클라이언트에서 가져온 token과 DB에 보관된 토큰 비교
        user.findOne({ "_id": decoded, "token": token }, function(err, user){
            if(err) return callback(err);
            callback(null, user);
        });
    });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };