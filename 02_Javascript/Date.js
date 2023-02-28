// 현재 시간
let nowDate = new Date(); // UTC 기준 시간이 출력됨
console.log('현재 시간: ', nowDate); // 출력: 2023-02-27T04:35:35.658Z

// 타임 스탬프(timestamp)
// : "1970년 1월 1일"을 0으로 잡고 그 이후로 지난 시간을 나타낸 값(단위: ms)
console.log(Date.now()); // 출력 예: 1677472933485

// 시간 일부 추출 - new Date()로 생성한 시간은 UTC 기준이지만 아래 함수 출력은 서버시간 기준으로 출력됨
console.log('년: ', nowDate.getFullYear()); // 연도
console.log('월: ', nowDate.getMonth()); // 월(0 ~ 11; 실제 월은 출력값에 +1)
console.log('일: ', nowDate.getDate()); // 일
console.log('요일: ', nowDate.getDay()); // 요일(0 ~ 6; 일요일 ~ 토요일)
console.log('시: ', nowDate.getHours()); // 시간(24시 표기)
console.log('분: ', nowDate.getMinutes()); // 분

// 날짜 값 수정
console.log('수정 전: ', nowDate);
let passYear = nowDate.setFullYear(nowDate.getFullYear() - 1);
console.log(passYear); // set- 으로 날짜 수정 시, 결과 값이 timestamp로 나옴. 날짜 형태로 보고싶다면 변환 필요
//// 변환 방법 1
let temptime = new Date(passYear);
console.log('변환 방법 1: ', temptime.toISOString()); // new Date() 출력 결과와 같은 형태
//// 변환 방법 2
console.log('변환 방법 2: ', Date(passYear)); // String 출력(예: Mon Feb 27 2023 13:49:35 GMT+0900 (대한민국 표준시))
console.log('변환 방법 2: ', `${nowDate}`); // 템플릿 리터럴(Template literal)을 사용하면 Date()와 같은 형태의 String으로 출력됨