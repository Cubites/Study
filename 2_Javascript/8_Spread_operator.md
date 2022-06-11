# Spread operator(확장 연산자)
* for문 같은 반복문이나 다른 메서드를 사용하는 대신 Spread Operator를 사용하여 배열의 값을 가져올 수 있음
* 예
  > <pre>
  > const arr = ['apple', 'banana', 'peach', 'grape'];
  > const Func = (...newArray) => {
  >   return newArray;
  > }
  > console.log(Func(arr));