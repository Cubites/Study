# 2. URI와 웹 브라우저 요청 흐름
---

## URI
* Uniform Resource Identifier
  * 인터넷에 있는 자원을 나타내는 유일한 주소
  * URL (Locator) : 리소스가 있는 위치 지정
  * URN (Name) : 리소스에 이름 부여

* URL
> scheme://[userinfo@]host[:port][/path][?query][#fragment]
> * scheme : http, https
> * [/path] : 계층적 구조에 사용
> * [?query] : key=value 형태, query parameter(or string)으로 불림
---

## 웹브라우저 요청 흐름
1. 웹 브라우저가 HTTP 메시지 생성
> 1. SOCKET 라이브러리를 통해 전달
> 2. TCP/IP 패킷 생성(IP, PORT 정보, HTTP 메시지 포함)
4. 수신 서버에서 메시지 확인
5. HTTP 응답 메시지 작성 (1과 동일한 과정)