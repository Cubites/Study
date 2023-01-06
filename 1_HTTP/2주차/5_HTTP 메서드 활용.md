# 5. HTTP 메서드 활용

## 클라이언트에서 서버로 데이터 전송
### 데이터 전달 방식
  * 쿼리 파라미터를 통한 데이터 전송
    * GET / 주로 정렬 필터(검색어)에 사용
    * 예 : GET /search?q=hello&hl=ko HTTP/1.1
  * 메시지 바디를 통한 데이터 전송
    * POST, PUT, PATCH / 회원 가입, 상품 주문, 리소스 등록, 리소스 변경
### 4가지 상황
#### 1. 정적 데이터 조회
  * 예 : <code>GET /static/star.jpg HTTP/1.1</code>
  * 이미지, 정적 텍스트 문서
  * 조회는 GET 사용
  * 정적 데이터는 일반적으로 쿼리 파라미터 없이 리소스 경로로 단순하게 조회 가능
#### 2. 동적 데이터 조회
  * 예 : <code>GET /search?q=hello&hl=ko HTTP/1.1</code> > 쿼리 파라미터 사용
  * 주로 검색, 게시판 목록에서 정렬 필터(검색어)
  * 조회 조건을 줄여주는 필터, 조회 결과를 정렬하는 정렬 조건에 주로 사용
  * 조회는 GET 사용
  * GET은 쿼리 파라미터를 사용해서 데이터 전달
#### 3. HTML Form 데이터 전송
  * form에 input 값들을 넣고 submit을 하면 웹 브라우저가 HTTP 메시지를 생성해줌
  * HTML Form 전송은 GET, POST만 지원
  * POST를 사용할 경우
    * 예)
      ```
      POST /save HTTP/1.1
      Host: localhost: 8080
      Content-Type: application/x-www-form-urlencoded
      
      username=kim&age=20
      ```
    * Content-Type: application/x-www-form-urlencoded 사용
      * 데이터를 form 태그를 사용하여 보낸다는 의미
    * 메시지 body로 데이터를 전송(key=value, 쿼리 파라미터 형식)
    * 전송 데이터를 url encoding 처리 (예: abc김 > abd%EA%B9%80)
  * GET을 사용할 경우 
    * 예)
      ```
      GET /members?usename=kim&age=20 HTTP/1.1
      Host: localhost: 8080
      ```
    * GET은 메시지 body를 사용하지 않으므로 URI 경로에 쿼리로 데이터를 넣음
  * Content-Type: multipart/form-data
  

#### 4. HTTP API 데이터 전송
  * HTML을 사용하지 않고 데이터를 직접 만들어 전송할 때 사용
  * 주로 사용하는 곳
    * 서버 to 서버(백엔드 시스템 통신)
    * 앱 클라이언트(아이폰, 안드로이드)
    * 웹 클라이언트
      * HTML에서 Form 전송 대신 자바 스크립트를 통한 통신에 사용(AJAX)
      * 예) React, VueJs 같은 웹 클라이언트와 API 통신
  * POST, PUT, PATCH, GET 전부 사용 가능
    * POST, PUT, PATCH: 메시지 바디로 데이터 전송
    * GET: 조회에 사용, 쿼리 파라미터로 데이터 전달
  * Content-Type: application/json을 주로 사용
    * TEXT, XML, JSON 등

## HTTP API 설계 예시
### HTTP API - 컬렉션 : POST 기반 등록 (예: 회원 관리 API 제공)
* 메소드 선정
  ```
  * 회원 목록 /members -> GET
  * 회원 등록 /members -> POST
  * 회원 조회 /members/{id} -> GET
  * 회원 수정 /members/{id} -> PATCH, PUT, POST
  * 회원 삭제 /members/{id} -> DELETE
  ```
* 클라이언트는 등록될 리소스의 URI를 모름
  * 회원 등록 /members -> POST /members
* 서버가 리소스의 URI 생성
  ```
  HTTP/1.1 201 Created
  Location: /members/100
  ```
* 컬렉션(Collection)
  * 서버가 관리하는 리소스 디렉토리
  * 서버가 리소스의 URI를 생성하고 관리
  * 여기서 컬렉션은 /members

### HTTP API - 스토어 : PUT 기반 등록 (예: 정적 컨텐츠 관리, 원격 파일 관리)
* 예
  ```
  * 파일 목록 /files -> GET
  * 파일 조회 /files/{filename} -> GET
  * 파일 등록 /files/{filename} -> PUT
  * 파일 삭제 /files/{filename} -> DELETE
  * 파일 대략 등록 /files -> POST
  ```
* 클라이언트가 리소스 URI를 알고 있어야 함
  * 파일 등록 /files/{filesname} -> PUT /files/star.jpg
* 클라이언트가 직접 리소스의 URI를 지정
* 스토어(Store)
  * 클라이언트가 관리하는 리소스 저장소
  * 클라이언트가 리소스의 URI를 알고 관리
  * 여기서 스토어는 /files
### HTML FORM 사용 : GET, POST만 사용 가능 (예: 웹 페이지 회원 관리)
* HTML FORM은 GET, POST만 지원
* AJAX 같은 기술을 사용해서 해결 가능 -> 회원 API 참고
* 순수 HTML, HTML FORM으로 예를 듬
* 예
  ```
  * 회원 목록 /members -> GET
  * 회원 등록 폼 /members/new -> GET
  * 회원 등록 /members/new, /members -> POST
  * 회원 조회 /members/{id} -> GET
  * 회원 수정 폼 /members/{id}/edit -> GET
  * 회원 수정 /members/{id}/edit, /members/{id} -> POST
  * 회원 삭제 /members/{id}/delete -> POST
  ```
* 컨트롤 URI
  * GET, POST만 지원하는 제약의 해결을 위해 동사로 된 리소스 경로 사용
  * POST의 /new, /edit, /delete가 컨트롤 URI
  * HTTP 메서드로 해결하기 애매한 경우 사용(HTTP API 포함)

### 참고하면 좋은 URI 설계 개념
* 문서(document)
  * 단일 개념(파일 하나, 객체 인스턴스, 데이터베이스 row)
* 컬렉션(collect)
  * 서버가 관리하는 리소스 디렉터리, 서버가 리소스의 URI를 생성하고 관리
  * 예) members/
* 스토어(store)
  * 클라이언트가 관리하는 자원 저장소, 클라이언트가 리소스의 URI를 알고 관리
  * 예) files/
* 컨트롤러(controller), 컨트롤 URI
  * 문서, 컬렉션, 스토어로 해결하기 어려운 추가 프로세스 실행
  * 동사를 직접 사용
  * 예) /members/{id}/delete

> https://restfulapi.net/resource-naming