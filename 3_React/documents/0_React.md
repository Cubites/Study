# React 규칙
* component 파일명의 첫글자는 대문자 (예 : Login.jsx)
* jsx 에서는 class가 아닌 className 사용

## 컴포넌트 생명주기(Lifecycle of Components)
* 컴포넌트가 처음으로 import되어 DOM을 형성하는 단계
* Mount - Update - Unmount 세 단계로 이루어짐

### Mount
* DOM이 생성되고 웹 브라우저상에 나타나는 것

### Update
* Update가 발생하는 경우
  * props가 바뀔 때
  * state가 바뀔 때
  * 부모 component가 리렌더링될 때