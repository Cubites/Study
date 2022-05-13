# 2. URI와 웹 브라우저 요청 흐름

## URI
* Uniform Resource Identifier
  * 인터넷에 있는 자원을 나타내는 유일한 주소
  * URL (Locator) : 리소스가 있는 위치 지정, 일반적으로 URI라고하면 URL을 말함
  * URN (Name) : 리소스에 이름 부여

* URL
  > scheme://[userinfo@]host[:port][/path][?query][#fragment]
  > * host : 도메인명 또는 IP주소
  > * scheme : http, https
  > * [/path] : 리소스 경로, 계층적 구조에 사용
  > * [?query] : key=value 형태, query parameter(or string)으로 불림
  > * [#fragment] : 같은 페이지 내에서의 이동에 사용


## 웹브라우저 요청 흐름 (**중요)
1. URL 주소 입력
2. 웹 브라우저가 HTTP 메시지 생성
-- 애플리케이션 계층 --
3. SOCKET 라이브러리를 통해 전달
4. TCP/IP 패킷 생성(IP, PORT 정보, HTTP 메시지 포함)
-- 전송 계층 --
5. 패킷 전송
5. 수신 서버에서 패킷 수신 후 메시지 확인
6. HTTP 응답 메시지 작성 (1과 동일한 과정)