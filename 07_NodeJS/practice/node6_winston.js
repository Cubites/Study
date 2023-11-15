const winston = require('winston'); // logging 을 위한 모듈
const winstonDaily = require('winston-daily-rotate-file'); // 로그를 파일로 저장해주는 모듈
const moment = require('moment');
const { format } = require('path');

console.log(moment()); // 현재시간 표시 (default = local)
const timestrampFormat = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
}

// const logger = winston.createLogger({
//     transports: [
//         new winstonDaily({
//             filename: "./log/server",
//             dataPattern: "_yyyy-MM-dd.log",
//             colorize: true,
//             level: "debug",
//             maxsize: 1000000,
//             maxFiles: 10000,
//             showLevel: true,
//             json: false,
//             timestamp: timestrampFormat
//         }),
//         new winston.transports.Console({
//             name: 'debug-console',
//             colorize: true,
//             level: 'debug',
//             showLevel: true,
//             json: false,
//             timestamp: timestrampFormat
//         })
//     ]
// });

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: './log/combined.log'}),
        new winston.transports.File({ filename: './log/error.log', level: 'error'})
    ]
});


module.exports = logger;