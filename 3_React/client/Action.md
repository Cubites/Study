## 로그인 확인 과정
* email, password 입력후 Login 버튼 누름
  | 순서 | 내부 로직 |
  | --- | --- |
  | 1 | LoginPage.jsx >> _actions/user_action.js <br>body(email, password) 전송 |
  | 2 | /api/users/login 경로(server.js)로 body 데이터 보냄 |
  | 3 | server.js에서 body 값을 받아 email, password 순으로 일치 확인 |
  | 4 | email, password 모두 일치할 경우, 성공 여부와 token을 response로 전송 |
  | 5 | LoginPage.jsx에서 성공 여부를 받아 true 인 경우, 홈('/')으로 이동 시킴 |

## Redux
### 요소
* state : 원본 데이터
* store : state 모아둔 장소
* dispatch : action에서 할 행동을 받아 > reducer 연결
  * dispatch(loginPage(body))
* action : 행동 수신호
* reducer : 신호를 받아서 동작하는 거, state 값을 수정함
