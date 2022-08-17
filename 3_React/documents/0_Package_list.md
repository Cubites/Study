## 설치 방법
> <pre>
> npm install 패키지명
> yarn add 패키지명
> </pre>

### Draft.js
* 텍스트 편집기 패키지
* React Draft Wysiwyg
  * Draft.js에 사용되는 라이브러리

### React Router Dom
* 설치
  > <pre>
  > npm install react-router-dom
  > yarn add react-router-dom
  > <pre>

### Node-sass
* 설치
  > <pre>
  > npm install node-sass
  > yarn add react-router-dom
  > </pre>
* import
  * css 파일에서
    > <pre>
    > @import "grid.scss"
    > @import "grid
    > </pre>

### bootstrap
* 설치: <code>npm install react-bootstrap bootstrap</code>

### styled-components
* 설치: <codE>npm install styled-components</code>
* component 파일 내애서 css를 사용하여 태그를 생성하여 해당 component에 사용함
* 예
  ```javascript
  import styled from styled-components;

  const home = styled.li`
    font-size: 20px;
    font-weight: bold;
    $:hover{
      background-color: #ddd;
    }
  `;

  return(
    <Home>메인 페이지 입니다</Home>
  )
  ```

### Axios
* 설치 : <code>npm install axios</code>

### MySQL
* 설치 : <code>npm install mysql</code>

### Daum 우편번호 API
* 설치 : <code>yarn add react-daum-postcode</code>