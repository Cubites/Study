/*
    예전에는 crypto 로 암호화 >> 최근에는 bcrypt 사용
    key
    hash value
    hasing
    단방향 암호화
*/

// crypto를 사용한 암호화 함수
const crypto = require('crypto');

const createHashPassword = (password) => {
    return crypto.createHash("sha512").update(password).digest("base64");
};

let testPassword = "1234";
console.log(`${testPassword} => ${createHashPassword(testPassword)}`);