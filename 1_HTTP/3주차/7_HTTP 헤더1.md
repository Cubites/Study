# 7. HTTP 헤더1 - 일반 헤더
## HTTP 헤더 개요
* HTTP 헤더 : HTTP 전송에 필요한 모든 부가 정보
* field-name(예: <code>Content-Type:</code>)은 대소문자 구분이 없음
* RFC2616 (과거)
  * General 헤더: 메시지 전체에 적용되는 정보
  * Request 헤더: 요청 정보
  * Response 헤더: 응답 정보
  * Entity 헤더: 엔티티 바디 정보
  * message body
    * 메시지 본문은 엔티티 본문을 전달하는데 사용
    * 엔티티 헤더는 엔티티 본문의 데이터르 해석할 수 있는 정보 제공
* RFC723x (현재) 변화
  * 엔티티(entity) > 표현(representaion)
  * 메시지 본문을 통해 표현 데이터 전달
    * 표현 : 요청이나 응답에서 전달할 실제 데이터
  * 메시지 본문 = 페이로드(payload)<br/>
    \> 페이로드 : 전송의 목적인 데이터의 일부분(헤더, 메타데이터 같은 데이터 제외)
  * 표현 헤더는 표현 데이터를 해석할 수 있는 정보 제공

## 표현
* 표현의 예 : HTML로 표현, json으로 표현 등등
* 헤더 내의 표현 정보
  * Content-Type: 표현 데이터의 형식
  * Content-Encoding: 표현 데이터의 압축 방식
  * Content-Language: 표현 데이터의 자연 언어
  * Content-Length: 표현 데이터의 길이
  \> 표현 헤더는 전송, 응답 둘 다 사용
### Content-Type
* 표현 데이터의 형식 설명
* 미디어 타입, 문자 인코딩
* 예
  * <code>text/html; charset=utf-8</code>
  * <code>application/json</code> (json의 default가 utf-8)
  * <code>image/png</code>
### Content-Encodeing
* 표현 데이터를 압축하기 위해 사용
* 데이터를 전달하는 곳에서 압축 후 인코딩 헤더 추가
* 데이터를 읽는 쪽에서 인코딩 헤더의 정보로 압축 해제
* 예 : gzip, deflate, identity
### Content-Language
* 표현 데이터의 자연 언어를 표현
* 예 : ko, en, en-US
### Content-Length
* 바이트 단위
* Transfer-Encoding(분할 전송)을 사용하면 Content-Length를 사용하면 안됨

## 콘텐츠 협상
* 클라이언트가 선호하는 표현의 요청
### 종류
  * Accept: 클라이언트가 선호하는 미디어 타입 전달
  * Accept-Charset: 클라이언트가 선호하는 문자 인코딩
  * Accept-Encoding: 클라이언트가 선호하는 압축 인코딩
  * Accept-Language: 클라이언트가 선호하는 자연 언어
  <br>> 협상 헤더는 요청시에만 사용
### 협상 예시
  * 요청
    > <pre>
    > GET /event
    > Accept-Laguage: ko
    > </pre>
  * 응답
    > 다중 언어 지원 서버 (en, ko)
    > <pre>
    > Content-Language: ko
    > 안녕하세요
    > </pre>
    \> 하지만 만약 서버에서 해당 언어를 지원하지 않는다면? > 기본 언어 지정 필요
### 우선순위
#### 우선순위 1
* Quality Values(q) 값 사용
* 0 ~ 1 사용. 클 수록 우선순위가 높음
* 생략하면 1
* 예시
  > <pre>Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8;en;q=0.7</pre>
  > * ko-KR : q=1 이 생략 됨
  > * ko;q=0.9
  > * en-US;q=0.8
  > * en;q=0.7
#### 우선순위 2
* 구체적인 것이 우선함
* 예
  > <pre>Accept: text/*, text/plain, text/plain;format=flowed, */*</pre>
  > 1. text/plain;format=flowed
  > 2. text/plain
  > 3. text/*
  > 4. \*/*
#### 우선순위 3
* 구체적인 것을 기준으로 미디어 타입을 맞춤
* 예
  > <pre>Accept: text/*;q=0.3, text/html;q=0.7, text/html;level=1, text/html;level=2;q=0.4, */*;q=0.5</pre>
  > <code>text/*;q=0.3</code>
  > <br><code>text/html;q=0.7</code>
  > <br><code>text/html;level=1</code>
  > <br><code>text/html;level=2;q=0.4</code>
  > <br><code>\*/\*;q=0.5</code><br>
  > * text/plain >> text/*;q=0.3

## 전송 방식
* 종류 : 단순 전송, 압축 전송, 분할 전송, 범위 전송
### 단순 전송
* content-Length를 알고 있는 경우에 사용
### 압축 전송
* content를 압축 해서 보냄
* content-encording 정보가 있어야 함(예: gzip)
### 분할 전송
* <code>Transfer-Encoding: chunked</code>
* content를 분할 해서 보냄
* content-Length를 보내면 안됨
* 예
  > <pre>
  > HTTP/1.1 200 OK
  > Content-Type: text/plain
  > Transfer-Encoding: chunked
  > 
  > 5
  > Hello
  > 5
  > World
  > 0
  > \r\n
  > </pre>
### 범위 전송
* 예
  * 요청
    > <pre>
    > GET /event
    > Range: bytes=1001-2000
    > </pre>
  * 응답
    > <pre>
    > HTTP/1.1 200 OK
    > Content-Type: text/plain
    > Content-Range: bytes 1001-2000 /2000
    > 
    > (content)
    > </pre>

## 일반 정보 (HTTP 헤더들)
### From : 유저 에이전트의 이메일 정보
* 일반적으로 잘 사용되지 않음
* 검색 엔진 같은 곳에서, 주로 사용
* 요청에서 사용
### Referer : 이전 웹 페이지 주소
* 현재 요청된 페이지의 이전 웹 페이지 주소
* A -> B로 이동하는 경우 B를 요청할 때 Referer: A 를 포함해서 요청
* Referer를 사용해서 유입 경로 분석 가능
* 요청에서 사용
* 참고: referer는 referrer의 오타
### User-Agent : 유저 에이전트 애플리케이션 정보
* 클라이언트의 애플리케이션 정보(웹 브라우저 정보 등)
* 통계 정보
* 어떤 종류의 브라우저에서 장애가 발생하는지 파악 가능
* 요청에서 사용
### Server : 요청을 처리하는 ORIGIN 서버의 소프트웨어 정보
* 요청이 전달되는 과정에서 지난 서버가 아닌 응답을 보낸 서버
* 예 : <code>Server: Apache/2.2.22 (Debian)</code>
* 응답에서 사용
### Date : 메시지가 발생한 날짜와 시간
* 예 : <code>Date: Tue, 15 Npv 1994 08:12:31 GMT</code>
* 응답에서 사용

## 특별한 정보 (HTTP 헤더들)
### Host : 요청한 호스트 정보(도메인)
* 요청에서 사용
* **"필수"**
* Host 정보가 필요한 경우
  * 하나의 서버가 여러 도메인을 처리해야할 때
  * 하나의 IP 주소에 여러 도메인이 적용되어 있을 때
### Location : 페이지 리다이렉션
* 웹 브라우저는 3xx 응답의 결과에 Location 헤더가 있으면, Location 위치로 자동 이동(리다이렉트)
* 응답코드
  * 201 (Created): Location값은 요청에 의해 생성된 리소스 URI
  * 301 (Redirection): Location 값은 요청을 자동으로 리다이렉션하기 위한 대상 리소스를 가리킴
### Allow : 허용 가능한 HTTP 메서드
* 405 (Method Not Allowed)에서 응답에 포함해야함
* <code>Allow: GET, HEAD, PUT</code>
### Retry-After : 유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간
* 503 (Server): 서비스가 언제까지 불능인지 알려줄 수 있음
* 예
  > <pre>
  > Retry-After: Fri, 31 Dec 1999 23:59:59 GMT (날짜 표기)
  > Retry-After: 120 (초단위 표시)
  > </pre>

## 인증
### Authorization: 클라이언트 인증 정보를 서버에 전달
* 예: <code>Authorization: Basic xxxxxxxxxxxxxx</code>
* 사용하는 보안 방식에 따라 값은 전혀 다름
### WWW-Authenticate: 리소스 접근시 필요한 인증 방법 정의
* 401 Unauthorized 응답과 함께 사용
* 예 : <code>WWW-Authenticate: Newauth realm="apps", type=1, title="Login to \"apps\"", Basic real="simple"</code>

## 쿠키
### Cookie
#### 쿠키가 필요한 예 : 로그인
  > * 로그인 요청 후, 서버에 요청을 보냈을 때 서버는 같은 사람인지 알 수 없음
  > <br>\> 때문에 모든 요청에 사용자 정보를 포함되도록 해야함
  > <br>\> 하지만 이렇게 하는 경우 매우 번거로워짐
* 유저 정보를 쿠키에 저장하고 요청을 보낼 때 쿠키를 읽어 쿠키를 같이 전송함
#### 쿠키의 특징
* 예
  > <pre>
  > set-cookie: sessionId=abcde1234; expires=Sat, 26-Dec-2020 00:00:00 GMT; path=\; domain=.google.com; Secure
  > </pre>
* 모든 요청에 쿠키 정보 자동 포함
* 사용처 : 사용자 로그인 세션 관리, 광고 정보 트래킹
* 쿠키 정보는 항상 서버에 전송됨
  * 네트워크 트래픽 추가 유발
  * 최소한의 정보만 사용(세션 id, 인증 토큰)
  * 서버에 전송하지 않고, 웹 브라우저 내부에 데이터를 저장하고 싶으면 웹 스토리지 (localStorage, sessionStorage) 참고
* 주의 : 보안에 민감한 정보(예: 주민번호 등)은 쿠키에 저장하면 안됨
#### 쿠키 - 생명주기 (Expires, max-age)
* <code>Set-Cookie: expires=Sat, 26-Dec-2020 04:39:21 GMT</code><br>
  \> 만료일이 되면 쿠키 삭제
* <code>Set-Cookie: max-age=3600 (3600초)</code><br>
  \> 0이나 음수를 지정하면 쿠키 삭제
* 세션 쿠키: 만료 날짜를 생략하면 브라우저 종료시까지만 유지
* 영속 쿠기: 만료 날짜를 입력하면 해당 날짜까지 유지
#### 쿠키 - 도메인 (Domain)
* 도메인 명시: 명시한 문서 기준 도메인 + 서브 도메인 포함하여 적용
  * 예 : domain=example.org를 지정해서 쿠키 생성
    > example.org는 물론, dev.example.org같은 하위 도메인도 쿠키 접근가능
* 도메인 생략: 현재 문서 기준 도메인만 적용
  * 예 : example.org에서 쿠키를 생성하고 domain 지정을 생략
    > example.org에서만 쿠키 접근이 가능하고, 하위 도메인은 접근불가
#### 쿠키 - 경로 (Path)
* 해당 경로를 포함한 하위 경로 페이지만 쿠키 접근
* 일반적으로 path=/ 루트로 지정
* 예: path=/home 지정
  > * /home > 가능 
  > * /home/level1 > 가능
  > * /home/level1/level2 > 가능
  > * /hello > 불가능 
#### 쿠키 - 보안 (Secure, HttpOnly, SameSite)
##### Secure
* 쿠키는 http, https를 구분하지 않고 전송
* Secure를 적용하면 https인 경우에만 전송
##### HttpOnly
* XSS 공격 방지
* 자바스크립트에서 접근 불가(document.cookie)
* HTTP 전송에만 사용
##### SameSite
* XSRF 공격 방지
* 요청 도메인과 쿠키에 설정된 도메인이 같은 경우만 쿠키 전송