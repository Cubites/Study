let nowTime = Date.now();
let nowTime2 = new Date();
console.log(nowTime);
console.log(nowTime2);

nowTime2.setMinutes(nowTime2.getMinutes() + 1);
console.log(nowTime2);
nowTime2.setSeconds(nowTime2.getSeconds() + 10);
console.log(nowTime2);