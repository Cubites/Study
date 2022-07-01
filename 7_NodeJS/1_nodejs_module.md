# 모듈 종류
## log 관련
* winston : nodejs에서 로그를 기록하기 위한 대표적인 라이브러리
* winston-daily-rotate-file : 로그를 일별 처리하기 위한 모듈
* moment : 시간 처리 모듈

## Express
* 익스프레스 app 객체의 주요 메소드와 속성
  | 메소드 이름 | 설명 |
  | --- | --- |
  | set(name, value) | 서버 설정을 위한 속성을 지정 <br>set()메소드로 지정한 속성은 get() 메소드로 꺼내 확인할 수 있음 |
  | get(name) | 서버 설정을 위해 지정한 속성을 꺼냄 |
  | use([path]function[, function...]) | 미들웨어 함수를 사용하도록 함 |
  | get([path, ]function) | 특정 path로 요청된 정보를 처리 |