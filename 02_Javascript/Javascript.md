# Javascript
<details>
  <summary>
  <h2>Javascript</h2>
  </summary>

  ### Javascript란
  * javscript는 객체 기반 언어이자 프로토타입 기반 언어
    * 객체 원형인 프로토타입을 이용하여 새로운 객체를 만듬
  * 정확히는 원시 타입을 제외한 나머지는 모두 객체
    * 원시타입 : string, number, Boolean, null, undefined
  * 객체는 프로퍼티로 구성되어 있음
    * 프로퍼티 : key - value 로 이루어짐
    * 프로퍼티의 값이 함수인 경우, 일반 함수와 구분하기 위해 method라 부름
  * 호이스팅 지원 > 함수 호출이 함수 선언보다 앞에 있어도 실행됨

  ### BOM(Browser Object Model)
  * DOM과 달리 W3C의 표준 객체 모델이 아님
  * Javascript가 브라우저 요소에 접근할 수 있게 해줌
  * 종류 : window, location, navigator, history, screen, document

  ### DOM(Document Object Model)
  * XML이나 HTML 문서에 접근하기 위한 일종의 인터페이스
  * 문서 내의 모든 요소를 정의하고, 각각의 요소에 접근하는 방법을 제공
  * 구조
    * Document 
      <br>> 루트 요소 <code>\<html></code>
      <br>> 요소 <code>\<head></code>, 요소 <code>\<body></code>
      * <code>\<head></code> > 요소 <code>\<title></code> > 텍스트
      * <code>\<body></code> > 요소 <code>\<a></code> > 속성 "href"

  ### Node
  * HTML DOM은 노드라 불리는 계층적 단위에 정보를 저장함
  * HTML 정보 > 계층적 구조인 노드 트리에 저장
    * 노드 트리 : 노드로 이루어져있고 노드간의 관계를 보여줌
  * 노드의 종류
    | 노드 | 설명 |
    | :---: | --- |
    | 문서 노드<br>(document node) | HTML 문서 전체를 나타내는 노드 |
    | 요소 노드<br>(element node) | 모든 HTML 요소는 요소 노드<br> 속성 노드를 가질 수 있는 유일한 노드 |
    | 속성 노드<br>(attribute node) | 모든 HTML 요소의 속성은 속성 노드이고, 요소 노드에 관한 정보를 가지고 있음<br>단, 해당 요소 노드의 자식 노드에는 포함되지 않음 |
    | 텍스트 노드<br>(text node) | HTML 문서의 모든 텍스트는 텍스트 노드 |
    | 주석 노드<br>(comment node) | HTML 문서의 모든 주석은 주석 노드 |

  ### 원시 타입(Primitive)
  * 원시 타입은 언어마다 다름
  * Javascript에서의 원시 타입은 다음과 같음
    * String, Number, Boolean, Null, Undefined, Symbol, BigInt
  * <=> 객체 타입 : Object, Array

</details>

<details>

  <summary>
  <h2>Funtion</h2>
  </summary>

  ### 함수 정의 방법
  #### 기본형
    ```javascript
    function testFunc(){
      console.log("함수입니다.");
    }
    ```
  #### 함수 리터럴
    ```javascript
    const testFunc = function(){
        console.log("함수입니다.");  
    }
    ```
  #### 익명 함수
    ```javascript
    (function(){
      console.log("함수입니다.");  
    })()
    ```
    * 함수 생성과 동시에 실행됨

</details>

<details>
  <summary>
  <h2>RegExp</h2>
  </summary>

  #### 예
  ```javascript
  /* 정규표현식 리터럴 */
  let pattern = /a/;
  
  /* 정규표현식 객체 생성자 */
  let pattern2 = new RegExp('a');
  ```

  ### 함수
  ```javascript
  /* 
    * RegExp.exec('문자열')
    ** '문자열' 내에서 RegExp에 들어있는 정규표현식에 맞는 내용 출력
    ** 적합한 문자가 없으면 null 반환
  */
  let pattern = /a/;
  pattern.exec('abcde'); // ['a'] 출력

  RegExp.test('문자열'); // '문자열' 내에 RegExp에 들은 정규표현식에 맞는 내용이 있으면 true, 없으면 false 반환

  String.match(RegExp);

  String.replace(RegExp, replace_text)
  ```
  
  ### 옵션
  #### i 옵션
  * 대소문자를 구분하지 않는 옵션
  ```javascript
  let pattern = /a/i
  ```

  #### g 옵션
  * 검색된 모든 결과를 리턴, i와 같은 위치에 사용
</details>

<details>
  <summary>
  <h2>Scope와 Closure</h2>
  </summary>

  ## Scope
  * 참조 가능한 범위를 의미
  * 스크립트 전체에서 참조 가능하면 전역 스코프, 특정 함수 내에서와 같이 제한된 범위에서 참조 가능하면 지역 스코프하고 함
  ### Lexical Scope (어휘적 범위 지정)
  * 스코프는 함수를 호출한 위치가 아닌 선언된 위치를 기준으로 결정됨을 의미
    * 정적 스코프 - 함수가 선언된 위치에 따라 스코프 결정
    * 동적 스코프 - 함수가 호출된 위치에 따라 스코프 결정
  * Lexical Scope 예시
    ```javascript
      let word = 'first';
      function log(){
        console.log(word);
      }
      function wrapper(){
        let word = 'second'; // 지역변수 word2 생성
        log();
      }
      wrapper(); // 출력 값 : first
      /* 
        1. 함수 log는 함수 wrapper 내부에서 호출됐지만 선언은 wrapper 밖에서 선언됨
        2. 함수 log에서 사용한 변수는 log 내부 스코프에서 상위 스코프 순으로 탐색
        3. 함수 log에서 사용한 변수 word는 전역에 선언된 word를 사용
        4. 전역변수 word의 값인 "first" 출력
      */
    ```

</details>

<details>
  <summary>
  <h2>Function & Callback</h2>
  </summary>

  ### Function
  * 변수에 저장된 값처럼 함수도 값임
  * 변수처럼 다른 변수에 넣을 수 있음
  * 객체의 속성 값으로 담겨진 함수 => 메소드(method)
    * 예:
      ```javascript
      a = {
        b: function(){}
      }
      ```
  * first-class citizen(object) - 밴수, 매개변수, 리턴값에 사용가능

</details>

<details>
  <summary>
  <h2>Array and Object destrucing (배열 및 객체의 비구조화)</h2>
  </summary>

  ### ES5 와 ES6의 차이
  * 예시용 객체
    ```javascript
    const myObj = {firstName: '길동', lastName: '홍', age: '400', country: '율도국'};
    ```
  #### ES5
  ```javascript
  let firstName = myObj.firstName;
  let lastName = myObj.lastName;
  let age = myObj.age;
  let country = myObj.country;
  ```
  * 각 변수에 각 값을 일일이 할당

  #### ES6
  ```javascript
  let {firstName, lastName, age, country} = myObj;
  // 배열 예
  let [value1, value2, value3, value4] = arr;
  ```
  * 객체의 속성을 얻기 위해 값을 중괄호 안에 넣으면 됨
  * 단 속성 이름과 동일해야 함(다를 경우 undefined 반환)

</details>

<details>
  <summary>
  <h2>Reference(참조)</h2>
  </summary>

  ### 복제
  * 복제 예시
    ```javascript
    let a = 1;
    let b = a;
    b = 2;
    console.log(a); // 1 출력
    ```
  * b는 a의 값을 "복제"한 것이므로 b의 값을 바꿔도 a의 값은 바뀌지 않음(a, b는 별개의 데이터)
  <br>> a가 "원시 데이터 타입"이기 때문
  * 원시 데이터 타입
    * 변수에 할당될 때, 메모리에 고정 크기로 원시 값을 저장
    <br>> 저장된 값을 변수가 직접적으로 가리킴
    * 불변성을 가지고 있어 재할당 시, 값이 변하는 것이 아닌 가리키는 메모리가 변화
    * 종류 : Boolean, Undefined, Number, BigInt, String, Symbol(ES6)

  ### 참조
  * 참조 예시
    ```javascript
    > let a = {'id': 1};
    > let b = a;
    > b.id = 2;
    > console.log(a.id) // 2 출력
    ```
  * b의 값을 바꾸면 a의 값도 같이 바뀜(a, b는 같은 데이터)
  * 다른 예시
    ```javascript
    let a = {'id': 1};
    let b = a;
    b = {'id': 2};
    console.log(a.id) // 1 출력
    console.log(b.id) // 2 출력
    ```
  * a와 b가 가리키는 것이 달라짐

  ## 함수와 참조

</details>

<details>
  <summary>
  <h2>Spread operator(확장 연산자)</h2>
  </summary>

  * for문 같은 반복문이나 다른 메서드를 사용하는 대신 Spread Operator를 사용하여 배열의 값을 가져올 수 있음
  * 예
    ```javascript
    const arr = ['apple', 'banana', 'peach', 'grape'];
    const Func = (...newArray) => {
      return newArray;
    }
    console.log(Func(arr));
    ```

</details>

<details>
  <summary>
  <h2>Javascript에서 날짜 사용</h2>
  </summary>

  ## 사용 예
  ```javascript
  // 현재 시간
  let nowDate = new Date(); // UTC 기준 시간이 출력됨
  console.log('현재 시간: ', nowDate); // 출력: 2023-02-27T04:35:35.658Z

  // 타임 스탬프(timestamp)
  // : "1970년 1월 1일"을 0으로 잡고 그 이후로 지난 시간을 나타낸 값(단위: ms)
  console.log(Date.now()); // 출력 예: 1677472933485

  // 시간 일부 추출 - new Date()로 생성한 시간은 UTC 기준이지만 아래 함수 출력은 서버시간 기준으로 출력됨
  console.log('년: ', nowDate.getFullYear()); // 연도
  console.log('월: ', nowDate.getMonth()); // 월(0 ~ 11; 실제 월은 출력값에 +1)
  console.log('일: ', nowDate.getDate()); // 일
  console.log('요일: ', nowDate.getDay()); // 요일(0 ~ 6; 일요일 ~ 토요일)
  console.log('시: ', nowDate.getHours()); // 시간(24시 표기)
  console.log('분: ', nowDate.getMinutes()); // 분

  // 날짜 값 수정
  console.log('수정 전: ', nowDate);
  let passYear = nowDate.setFullYear(nowDate.getFullYear() - 1);
  console.log(passYear); // set- 으로 날짜 수정 시, 결과 값이 timestamp로 나옴. 날짜 형태로 보고싶다면 변환 필요
  //// 변환 방법 1
  let temptime = new Date(passYear);
  console.log('변환 방법 1: ', temptime.toISOString()); // new Date() 출력 결과와 같은 형태
  //// 변환 방법 2
  console.log('변환 방법 2: ', Date(passYear)); // String 출력(예: Mon Feb 27 2023 13:49:35 GMT+0900 (대한민국 표준시))
  console.log('변환 방법 2: ', `${nowDate}`); // 템플릿 리터럴(Template literal)을 사용하면 Date()와 같은 형태의 String으로 출력됨
  ```

</details>

<details>
  <summary>
  <h2>Promise</h2>
  </summary>


</details>