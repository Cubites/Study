# Javascript의 표준 내장 객체
## Map
* key-value 쌍의 집합
* 삽입 순서를 기억함
* 값 동일성은 SameValueZero를 기반으로 함
  * SameValueZero: NaN을 NaN과 동일한 것으로 취급, 그 이외에는 엄격한 비교(===)와 동일(+0, -0은 같음 등)
* Date 객체를 key로 사용할 수 없음
