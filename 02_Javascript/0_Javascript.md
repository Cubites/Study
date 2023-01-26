# Javascript
* javscript는 객체 기반 언어이자 프로톹타입 기반 언어
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