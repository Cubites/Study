# 우선 순위
  | 서열 | 설명 | 예 |
  | --- | --- | --- |
  | 1 | 속성 뒤에 <code>!important</code> | <code>p{color: blue !important}</code> |
  | 2 | 태그에 inline으로 style 지정 | <code><p style=\"blue">TEST<\/p></code> |
  | 3 | 아이디 선택자 | <code>#blue{color: blue}</code> |
  | 4 | 가족 클래스 선택자 | <code>h1+p{color: blue}</code> |
  | 5 | 클래스 선택자<br>가상 클래스 선택자 | <code>.blue{color: blue}<br>p:before{color: blue}</code> |
  | 6 | 요소 선택자 | <code>p{color: blue}</code> |
  | 7 | 부모의 상속 | <code>div{color: blue}</code><br>><code> <div\><p\>TEST<\/p></div></code> |
  * 동일 서열은 더 나중에 지정한 것이 우선됨