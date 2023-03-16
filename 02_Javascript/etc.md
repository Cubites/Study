## Script 호출 방법
#### \<head> 에서 호출
* 과정
  > html 파싱
  > <br>> getching js, excuting js
  > <br>> html 파싱
* 단점
  * js 파일이 크고 인터넷이 느리면 html이 열리는데 오래걸림
  * dom이 완성되기 전에 실행되어 정상적인 dom 작업이 어려울 수 있음
#### \<body> 안의 마지막에 로드
* 과정
  > html 파싱 > fetching js, excuting js
* 단점
  * 웹사이트가 javascript에 의존적인 경우, 정상적인 페이지를 볼 때까지 기다려야함
#### \<head> 에서 async 사용
* 과정
  > html 파싱 & (fetching js, excuting js) > html 파싱
* 파싱과 병렬로 다운로드
* 단점 : html이 파싱되기 전에 자바스크립트가 실행되어 dom 요소 조작에 실패할 수도 있음
#### \<head> 에서 defer
* 과정
  > html 파싱 & fetching js > excuting js
* 다운(fetching js) 속도에 따라서 실행속도가 달라짐(동시에 실행되지 않을 수도 있음)

## 함수
* 문자열 변형
  | 함수 | 기능 |
  | --- | --- |
  | slice(index1, index2) | 지정한 배열의 index1 부터 index2 앞까지를 얕은 복사한 값을 새로운 배열 객체로 반환 |
  | splice(start[, deleteCount[, item1[, item2[, ...]]]]) | 지정한 배열의 start 부터 deleteCount 개의 값을 item1, ...로 대체 |
  | concat(array1) | 지정한 배열과 array1 배열을 합쳐 새 배열을 반환 | 

## 에러
### Uncaught SyntaxError: Cannot use import statement outside a module
* import문은 JavaScript 파일이 아니라 JavaScript 모듈에서 동작함
* 해결법: import문을 사용할 파일을 html에 불러올 때 <script>태그에 type="module" 이라는 속성을 추가함
  * JavaScript 파일 예
    ```javascript
      // 파일명 = testFile.js
      import testModule from './testModule.js';
      console.log(testModule());
    ```
  * HTML 파일 예
    ```html
    ...
    <html>
      <header>
        ...
        <script src="./testModule.js"></script>
      </header>
      <body>
        ...
        <script type="module" src="./testFile.js"></script>
      </body>
      ...
    </html>
    ```