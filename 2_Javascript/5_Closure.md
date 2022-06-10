# Closure (클로저)
## 내부함수, 외부함수
### 예
> <pre>
> function outer() {
>     let word = "text";
>     function inner() {
>         alert(word);
>     }
>     return inner;
> }
>
> let outerFunc = outer();
> outerFunc();
> </pre>
* outer - 외부함수 / inner - 내부함수
* 내부함수 inner는 외부함수 outer에서 선언된 변수 word를 사용할 수 있음
* 만약, inner 함수가 다음과 같을 때
  > <pre>
  > function inner() {
  >     let word = "text2"
  >     alert(word);
  > }
  > </pre>
  * "test2"를 출력하고 싶다면 word가 아닌 <code>this.word</code>를 사용해야 함

## Lexical scoping (어휘적 범위 지정)
* 스코프는 함수를 호출할 때가 아니라 "선언"할 때 생성됨 
  <br>> 즉, 함수가 어디에 선언됐는지에 따라 스코프가 결정 됨 (정적 스코프)
  <br>> 반대로 어디서 호출됐는지에 따라 스코프가 결정되는 것도 있음 (동적 스코프)
  * 예시는 lexical_scoping.js 파일 참고
