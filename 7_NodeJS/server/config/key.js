if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod'); // 배포 모드일 때
}else{
    module.exports = require('./dev'); // 개발 모드일 때
}