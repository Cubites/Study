## react-create-app
* 원래는 react-create-app 모듈 설치(--global) 후, react를 이용했어야 함
<br>> 지금은 <code>npm react-create-app</code> 명령어로 이용 가능

## Babel, webpack
### Babel 
* 최신 자바스크립트 문법을 지원하지 않는 브라우저를 위해, 최신 문법을 실행할 수 있게 변환해줌

### webpack
* 자바스크립트 기반의 모듈 번들러
* 웹 어플리케이션 개발에 필요한 요소들을 병합, 압축해주는 역할을 함

## npm, npx
### npm
* 역할 : 라이브러리를 보관하는 기능, 파일을 빌드할 때 사용
* local 설치와 global 설치가 나뉨
  * <code>npm install [module_name]</code> // local
  * <code>npm install [module_name] -g</code> // global

### npx
* 패키지를 설치하지 않고 실행함(정확히는 설치 후 삭제)
* 설치 목록에 해당 패키지가 없으면 웹상의 npm에서 최신버전을 사용함
<br>> 자주 사용하지 않거나, 최신 버전을 사용해야하는 패키지에 유용(예: create-react-app)

## CORS 이슈, Proxy 설정
### Cross Origin Resource Sharing
* 출처(origin)가 다른 경우에 다른 출처에 있는 자원을 선택할 수 있게 권한을 부여하도록 알려주는 체제
  * 출처 : scheme(protocol;http, https), hostname(domain), port로 정의됨

### Proxy
* http-proxy-middleware 사용(<code>npm install http-proxy-middleware</code>)
* 자세한 코드는 src/setupProxy.js 참고
* proxy server
  * 보내는 데이터 변경 가능
  * IP를 바꿔 접속자의 IP를 모르게 할 수도 있음
  * 기능 : 방화벽 기능, 웹 필터 기능, 캐쉬 데이터, 공유 데이터 제공 기능

## Concurrently
* clint와 server를 동시에 실행할 수 있게 해주는 패키지
* 설치 : <code>npm install concurrently -D</code>
* package.json > scripts에 작성
  > <code>concurrently --kill-others-on-fail \"서버 실행문\" \"client 실행문\""</code>
  * <code>--kill-others-on-fail</code>: 실행문들을 실행할 때 하나라도 실패하면 나머지 실행문들을 전부 종료 & 취소시킴

## ant design
* css framwork의 한 종류(그외 material UI, react Bootstrap 등)
* 설치 : <code>npm install antd</code>

## Props, State
### Props
* properties의 약자
* 부모 component에서 자식 component로 보내는 것만 가능(반대로는 불가능)
* 자식 component에서 받은 값은 변경할 수 없음

### State
* component 내에서 데이터를 전달하는 것
* state 값이 변경되면 re-render 됨

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
  * react-redux
    * Provider : 어떤 component든 redux store에 접근할 수 있게 해주는 component
* 동작


### combinReducers
* 기본적으로 state마다 reducer가 필요함
* combinReducers는 이 reducer 들을 하나로 묶어 rootReducer로 만듬

## Class Component vs Functional Component
### Class Component
* Life Cycle(생명 주기)
  * Mounting(생성)
    > constructor 
    > \> render 
    > \> React updates DOM and refs 
    > \> componentDidMount
  * Updating(업데이트)
    > 변경사항 발생(New props, setState(), forceUpdate())
    > \> render
    > \> React updates DOM and refs
    > \> componentDidUpdate
  * Unmounting(삭제)
    > componentWillUnmount()
* Class component는 기능이 많지만 이 때문에 무거웠음
* 이를 대체하고자 Functional component를 쓰게 됨

### Functional Component
* react hook이 생기면서 Class Component에서만 하던 것을 할 수 있게 됨

## HOC(Higher Order Component)