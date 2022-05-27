# 8. HTTP 헤더2 - 캐시와 조건부 요청
## 캐시 기본 동작
### 캐시가 없는 경우
* 데이터가 변경되지 않아도 계속 네트워크를 통해서 데이터를 다운로드 받아야함
* 인터넷 네트워크는 매우 느리고 비쌈
* 브라우저 로딩 속도가 느림 
<br>>> 느린 사용자 경험

### 캐시가 적용된 경우
* 캐시 덕분에 캐시 가능 시간동안 네트워크를 사용하지 않아도 됨
* 비싼 네트워크 사용량을 줄일 수 있음
* 브라우저 로딩 속도가 매우 빠름
<br>>> 빠른 사용자 경험

### 캐시 시간이 초과된 경우
* 캐시 유효 시간이 초과되면, 서버를 통해 데이터를 다시 조회하고, 캐시를 갱신
* 이때 다시 네트워크 다운로드 발생

## 검증 헤더와 조건부요청
* 캐시 유효 시간이 초과해서 서버에 다시 요청한 경우 가능한 상황
  1. 서버에서 기존 데이터를 변경함
  2. 서버에서 기존 데이터를 변경하지 않음
<br> 데이터가 변경됐는지 확인을 위한 "검증 헤더"가 필요

### 검증 헤더
* 데이터 최종 수정일을 기록하여 요청 시 서버에 있는 파일의 최종 수정일과 비교
* 캐시 데이터와 서버 데이터가 같은지 검증하는 데이터
* Last-Modified, ETag
* 응답과 요청 상황 예시
  * 요청 헤더
    > <pre>if-modified-since: 2020년 11월 10일 10:00:00</pre>
  * 응답 메시지 예시
    > <pre>
    > HTTP/1.1 304 Not Modified -> 304 : 변경사항이 없음
    > Content-Type: image/jpeg
    > cache-control: max-age=60
    > Last-Modified: 2020년 11월 10일 10:00:00
    > Content-Length: 34012
    > </pre>
  * 캐시 유효 시간이 초과해도 서버의 데이터가 갱신되지 않은 경우
    > \> 304 Not Modified + 헤더 메타 정보만 응답 (바디X)
    > <br>> 클라이언트는 서버가 보낸 응답 헤더 정보로 캐시의 메타 정보 갱신
    > <br>> 클라이언트는 캐시에 저장되어 있는 데이터 재활용
* 결과적으로 네트워크 다운로드가 발생하지만 용량이 적은 헤더 정보만 다운
* 매우 실용적인 해결책

### 조건부 요청
* 검증 헤더로 조건에 따른 분기(조건이 참일 때, 거짓일 때)를 서버에 요청
* If-Modieied-Since - Last-Modified와 같이 사용
* If-None-Match - ETag와 같이 사용
* 조건이 만족하면 200 OK, 만족하지 않으면 304 Not Modified
#### If-Modified-Since
* 예시 : If-Modified-Since를 사용했을 때
  * 데이터가 변경되지 않은 경우
    > * 캐시(2020년 11월 10일 10:00:00) == 서버(2020년 11월 10일 10:00:00)
    > * 304 Not Modified, 헤더 데이터만 전송(Body 미포함)
    > * 전송 용량 0.1M (헤더 0.1M, 바디 1.0M)
  * 데이터가 변경된 경우
    > * 캐시(2020년 11월 10일 10:00:00) != 서버(2020년 11월 10일 11:00:00)
    > * 200 OK, 모든 데이터 전송(Body 포함)
    > * 전송 용량 1.1M (헤더 0.1M, 바디 1.0M)
* Last-Modified, If-Modified-Since 단점
  > * 1초 미만(0.x초) 단위로 캐시 조정 불가
  > * 날짜 기반의 로직 사용
  > * 데이터 수정 후, 날짜는 다르지만 데이터는 동일한 경우 구별 X
  > * 서버에서 별도의 캐시 로직을 관리 불가
  >   * 예: space, 주석같이 크게 영향이 없는 변경에서 캐시를 유지하고 싶은 경우
#### ETag(Entity Tag), If-None-Match
* 예시
  * 캐시용 데이터에 임의의 고유한 버전 이름을 달아둠
    * 예: ETag: "v1.0", ETag: "a2jiodwjekjl3"
  * 데이터가 변경되면 이 이름을 바꾸어서 변경함(Hash를 다시 생성)
    * 예: ETag: "aaaaa" -> ETag: "bbbbb"
* ETag만 보내서 같으면 유지, 다르면 다시 받게 됨
* 캐시 제어 로직을 서버에서 완전히 관리
  * 클라이언트는 단순히 이 값을 서버에 제공
  * 클라이언트는 캐시 메커니즘을 모르게 됨
* 예시
  * 서버는 베타 오픈 기간인 3일 동안 파일이 변경되어 ETag 를 동일하게 유지
  * 애플리케이션 배포 주기에 맞추어 ETag 모두 갱신

## 캐시와 조건부 요청 헤더
### 캐시 제어 헤더
* 종류
  * Cache-Control: 캐시 제어
  * Pragma: 캐시 제어(하위 호환)
  * Expires: 캐시 유효 기간(하위 호환)
#### Cache-Control
* Cache-Control: max-age
  <br>> 캐시 유효 시간, 초 단위
* Cache-Control: no-cache
  <br>> 데이터는 캐시해도 되지만, 항상 원(origin) 서버에 검증하고 사용
* Cache-Control: no-store
  <br>> 데이터에 민감한 정보가 있으므로 저장하면 안된다는 의미
  <br>> 메모리에서 사용하고 최대한 빨리 삭제하라는 의미
#### Pragma
* Pragma: no-cache
* HTTP 1.0 하위 버전에서 사용(하위 호환)
#### Expires
* <code>expires: Mon, 01 Jan 1990 00:00:00 GMT</code>
* 캐시 만료일을 정확한 날짜로 지정
* HTTP 1.0부터 사용
* 지금은 더 유연한 Cache-Control: max-age 권장
* Cache-Control: max-age와 함께 사용하면 Expires는 무시

### 검증 헤더
* <code>ETage: "v1.0"</code>, <code>ETage: "asid93jkrh2l"</code>
* Last-Modified: Thu, 04 Jun 2020 07:19:24 GMT
### 조건부 요청 헤더
* If-Match, If-None-Match: ETag 값 사용
* If-Modified-Since, If-Unmodified-Since: Last-Modified 값 사용

## 프록시 캐시
* 서버가 요청을 보내기 너무 멀리 있는 경우(예: 해외 서버) 사용
* 클라이언트와 인접한 지역에 프록시 캐시 서버를 두고 대신 요청을 받음
### Cache-Control (캐시 지시어; directives)
* Cache-Control: public
  <br>: 응답이 public 캐시에 저장되어도 됨
* Cach-Control: private
  <br>: 응답이 해당 사용자만을 위한 것임, private 캐시에 저장해야 함(기본값)
* Cach-Control: s-maxage
  <br>: 프록시 캐시에만 적용되는 max-age
* Age: 60 (HTTP 헤더)
  <br>: 오리진 서버에서 응답 후 프록시 캐시 내에 머문 시간(초)

## 캐시 무효화
* Cache-Control의 확실한 캐시 무효화 응답
  > <pre>
  > Cache-Control: no-cache, no-store, must-revalidate
  > Pragma: no-cache (HTTP 1.0 하위 호환)
  > </pre>
* Cache-Control: no-cache
  * 데이터는 캐시해도 되지만, 항상 원 서버에 검증하고 사용(이름에 주의!)
* Cache-Control: no-store
  * 데이터에 민감한 정보가 있으므로 저장하면 안됨
  <br>> 메모리에서 사용하고 최대한 빨리 삭제
* Cach-Control: must-revalidate
  * 캐시 만료 후 최초 조회 시 원 서버에 검증해야 함
  * 원 서버 접근 실패 시 반드시 오류가 발생해야함 - 504(Gateway Timeout)
  * must-revalidate는 캐시 유효 시간이라면 캐시를 사용함
* Pragma: no-cache
  * HTTP 1.0 하위 호환

### no-cache와 must-revalidate를 같이 쓰는 이유
* no-cache의 흐름
  * 정상 흐름
    > 1. 클라이언트가 캐시 서버 요청
    > 2. 프록시 캐시 서버를 지남
    > 3. 원 서버에서 캐시 검증 후 응답 전송 (304 Not Modified)
    > 4. 프록시 캐시 서버를 지남
    > 5. 클라이언트가 응답을 받고 캐시 데이터 사용
  * 프록시 캐시 서버와 원 서버의 연결이 단절된 경우
    > 1. 클라이언트가 캐시 서버 요청
    > 2. 프록시 캐시 서버가 원 서버 대신 응답 전송 (Error or 200 OK)
    > 3. 클라이언트가 응답을 받음
* must-revalidate
  * 프록시 캐시 서버와 원 서버의 연결이 단절된 경우
    > 1. 클라이언트가 캐시 서버 요청
    > 2. 프록시 캐시 서버에서 에러 발생(504 Gateway Timeout)
    > 3. 클라이언트가 응답을 받음