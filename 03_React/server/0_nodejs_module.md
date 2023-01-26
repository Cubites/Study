# 모듈 종류
## log 관련
* winston : nodejs에서 로그를 기록하기 위한 대표적인 라이브러리
* winston-daily-rotate-file : 로그를 일별 처리하기 위한 모듈
* moment : 시간 처리 모듈

## Concurrently
* 한 터미널에서 여러 명령어를 동시에 실행할 수 있게 해주는 모듈
  > 예 : 한 터미널에서 명령어 하나로 node 서버와 react 를 동시에 실행가능
* <code>--kill-others-on-fail</code> : 같이 실행하는 명령어 중 하나라도 에러가 발생하면 전부 실행을 중지함
* 사용 방법
  * package.json 에 아래의 코드 입력
    > <pre>
    > "script": {
    >   // 상위 폴더로 이동 > client 폴더로 이동 > react 실행
    >   "client": "cd .. && cd client && yarn start"
    >   // 현재 위치의 server(.js) 파일 실행
    >   "server": "node server"
    >   // 앞에 정의한 "server" 명령어와 "client" 명령어 실행
    >   "div": "concurrently --kill-others-on-fail \"yarn server\" \"yarn client\""
    > }
    > </pre>
  * 터미널 창에 <code>yarn dev</code> 입력 시, server와 client 모두 실행


## Express
* 익스프레스 app 객체의 주요 메소드와 속성
  | 메소드 이름 | 설명 |
  | --- | --- |
  | set(name, value) | 서버 설정을 위한 속성을 지정 <br>set()메소드로 지정한 속성은 get() 메소드로 꺼내 확인할 수 있음 |
  | get(name) | 서버 설정을 위해 지정한 속성을 꺼냄 |
  | use([path]function[, function...]) | 미들웨어 함수를 사용하도록 함 |
  | get([path, ]function) | 특정 path로 요청된 정보를 처리 |