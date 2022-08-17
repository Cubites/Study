# 참조
## 복제
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

## 참조
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
