## Redux
* State를 관리하는 기술, 상태 관리 기술
* redux data flow > 한 방향으로만 흐름
  * dispatch(action) > Action > Reducer > Store > React Component > dispatch(action) > ...
  * Reducer : Action을 받아 변한 State를 반환하는 역할을 함, function이고 data를 수정할 수 있음
  * Store : 모든 state를 관리하는 곳
    * State : 실제로 데이터가 저장되어 있는 곳, 직접 접근 불가
      <br>> state에 접근하려면 dispatch, subscribe, getState 같은 것들을 사용
      * getState : render(UI 생성 역할) > getState > state > getState > render >> 웹 페이지 생성
      * subscribe : state 값이 바뀔 때 자동으로 render가 실행(UI 생성)되게 해줌
      * dispatch : action를 실행하여 결과 값을 reducer 함수에 전달, 이때 결과 값은 기본적으로 객체만 가능
      * replaceReducer :
* 동작 과정
  > 1. Action 실행 > 값 return
  > 2. Action의 결과 값을 reducer에 전달 > reducer가 state값 변경
  > 3. State 값 변경으로 인해 해당 State값을 사용하는 페이지들 rerendering
* 모듈
  * redux, react-redux, redux-promise, redux-thunk
  * redux-thunk : dispatch로 실행한 action의 결과로 function가 나와도 reducer에 보낼 수 있게 해줌
  * redux-promise : dispatch로 실행한 action의 결과로 promise가 나와도 reducer에 보낼 수 있게 해줌
    * 사용하는 이유 
      > action에서 axios 통신을 하게 되는데, axios 결과 값은 promise 임
      > <br>> dispatch는 기본적으로 객체만 reducer에 전달할 수 있음
      > <br>> 때문에 promise도 보낼 수 있게 해주는 redux-promise 미들웨어를 사용해야 함
  * react-redux
    * Provider : 어떤 component든 redux store에 접근할 수 있게 해주는 component
* 동작