# 3. HTTP 기본
---

## 모든 것이 HTTP
* HTTP (HyperText Transfer Protocol)
  * 거의 모든 형태의 데이터 전송 가능
<br>
* HTTP 역사
  * HTTP/1.1 1997년: 가장 많이 사용, 현재 가장 중요한 버전
<br>
* 기반 프로토콜
  * TCP: HTTP/1.1 , HTTP/2
  * UDP: HTTP/3
  * 현재 HTTP/1.1을 주로 사용
<br>
* HTTP 특징
  * 클라이언트 서버 구조
  * 무상태 프로토콜(스테이스리스), 비연결성
  * HTTP 메시지
  * 단순함, 확장 가능
---

## 클라이언트 서버 구조
* 클라이언트 서버 구조
  * Request Response 구조
  * 클라이언트 : 서버에 요청을 보내고, 응답을 대기
  * 서버 : 요청에 대한 결과를 만들어서 응답
---

## Stateful, Stateless
* 무상태 프로토콜

* Stateful - 상태 유지 (서버가 클라이언트의 상태를 유지함)
  * 중간에 서버가 바뀌면 안됨
* Stateless - 무상태 (서버가 클라이언트의 상태를 유지하지 않음)
  * 중간에 서버가 바뀌어도 됨. 즉, 무한한 서버 증설 가능
  * 스케일 아웃 - 수평 확장에 유리

* Stateless 실무한계
  * 무상태로 설계가 불가능한 것도 존재 (예: 로그인 상태 유지)
    * 일반적으로 브라우저 쿠키와 서버 세션등을 사용해서 상태 유지
  * 서버는 가능한한 무상태로 설계함
---

## 비연결성 (connectionless)
* HTTP 는 기본적으로 연결을 유지하지 않는 모델
* 실제로 동시에 처리하는 요청의 수는 크지 않음
* 서버 자원을 매우 효율적으로 사용가능
* 단점
  * 다시 요청을 하려면 TCP/IP 연결을 새로 맺어야 함
  * 수 많은 자원이 함께 다운로드(http, js, css, 이미지 등)
  * 현재 HTTP 지속 연결(Persistent Connections)로 문제 해결
---

## HTTP 메시지 (*중요)
* HTTP 요청 메시지 / HTTP 응답 메시지
* HTTP 메시지 구조
  * 시작 라인(start-line) - 헤더(header) - 공백 라인(CRLF) - message body
  * 시작 라인
    * request-line (요청 시작 라인) / status-line (응답 시작 라인)
    * request-line : method SP(공백) request-target SP HTTP_version CRLF(엔터)
      * method : get, post 등
    * status-line : HTTP-version SP status-code SP reason-pharse CRLF
      > * HTTP status-code(상태 코드)
      >   * 200 : 성공
      >   * 400 : 클라이언트 요청 오류
      >   * 500 : 서버 내부 오류
  * 헤더
    * field-name":" OWS field-value OWS (OWS : 띄어쓰기 허용)
    * field-name은 대소문자 구분 X
    * HTTP 전송에 필요한 모든 부가정보 포함
  * HTTP message body
    * 실제 전송할 데이터