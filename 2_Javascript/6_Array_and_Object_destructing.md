# Array and Object destrucing
(배열 및 객체의 비구조화)
## ES5 와 ES6의 차이
* 예시용 객체
  ```javascript
  const myObj = {firstName: '길동', lastName: '홍', age: '400', 'country: '율도국'};
  ```
* ES5
  ```javascript
  let firstName = myObj.firstName;
  let lastName = myObj.lastName;
  let age = myObj.age;
  let country = myObj.country;
  ```
  * 각 변수에 각 값을 일일이 할당

* ES6
  ```javascript
  > let {firstName, lastName, age, country} = myObj;
  > // 배열 예
  > let [value1, value2, value3, value4] = arr;
  ```
  * 객체의 속성을 얻기 위해 값을 중괄호 안에 넣으면 됨
  * 단 속성 이름과 동일해야 함(다를 경우 undefined 반환)