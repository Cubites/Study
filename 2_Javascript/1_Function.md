# 함수
## 함수 정의 방법
### 기본형
  ```javascript
  function testFunc(){
    console.log("함수입니다.");
  }
  ```
### 함수 리터럴
  ```javascript
  const testFunc = function(){
      console.log("함수입니다.");  
  }
  ```
### 익명 함수
  ```javascript
  (function(){
    console.log("함수입니다.");  
  })()
  ```
  * 함수 생성과 동시에 실행됨