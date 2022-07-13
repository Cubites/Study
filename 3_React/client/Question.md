## crbug/1173575, non-JS module files deprecated. 에러
* 원인 : 네트워크 에러, crome에서 요청을 보내지 못하는 에러
* 해결법 : crome 재부팅, 서버 재부팅 > 안되면 컴퓨터 재부팅

## Library vs Package vs Module
* Library : 여러 패키지와 모듈들을 모아 놓은 것
* Package : 특정 기능과 관련된 여러 모듈을 한 폴더 안에 넣어 관리하는 것
* Module : 함수, 변수, 클래스를 모아놓은 것
* 관계 : Library >= Package >= Moduel

# 3주차 문제
## <code>props.history.push('/')</code> 가 동작하지 않음
* src > components > views > LoginPage > LoginPage.jsx 31번째 줄
### 강사의 답변
* https://www.inflearn.com/questions/52278
* LoginPage.jsx 상단에 <code>import { withRouter } from 'react-router-dom';</code> 추가
* 하단에 export 부분을 <code>export default withRouter(LoginPage)</code>로 수정

### 답변의 문제
* react-router-dom에서 withRouter가 없어짐!!!

### 해결
* withRouter > useHistory > useNavigate(v6)로 변경됨
* 해결법
  * 다음 코드 추가
    > <pre>
    > import { useNavigate } from 'react-router-dom';
    > const navigate = useNavigate();
    > <pre>
  * <code>props.history.push('/')</code>를 다음 코드로 대체
  <br>> <code>navigate('/');</code>

## Failed to parse source map: 'webpack://antd/./components/locale-provider/style/index.less' URL is not supported 에러
* 해결 : index.js에서 antd import 부분의 <code>antd.css</code>를 <code>antd.min.css</code>로 수정

## Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.
* 문제: App.js에 있는 route의 element에 Auth를 적용해서 생긴 문제
* 해결: Auth를 element가 아닌, 각 component 안에 export(내보내는) 부분의 component에 적용하면 해결됨
  <br>> component > views 안에 있는 component들 참고