## URL 구조
* 예) <code>HTTP<dumy>://testpage.com:3080/http/url?start=1&end=2#2</code>

  | 문구 | 의미 |
  | --- | --- |
  | HTTP:// | Protocol (예: http, https) |
  | testpage.com | Host. 도메인명 또는 IP주소 사용|
  | :3080 | Port. 접속포트로 일반적으로 생략함 |
  | /http/url | Path. 리소스의 경로 |
  | ?start=1&end=2 | Query parameter 혹은 Query string. <br>웹 서버에 제공하는 파라미터<br> key=value 형태로 되어 있음 |
  | #2 | fragment. html 내부 북마크 등에 이용<br> 예) 같은 페이지 내에서 다른 위치로 이동하는 주석 |


## HTTP 메시지 구조
* 요청 메시지 구조
  > 예)<pre>
  > GET /search?q=hello&hl=ko HTTP/1.1
  > HOST: www.google.com
  > 
  > \<html> 
  >   \<body>
  >     ...
  >   \</body>
  > \</html>
  > </pre>

  | 구조 | 내용 |
  | :---: | --- |
  | 시작 라인 | HTTP_메서드 요청_대상 HTTP_버전 <br> 예) GET /search?q=hello&hl=ko HTTP/1.1 |
  | HTTP 헤더 | HTTP 전송에 필요한 모든 부가 정보 포함 <br> 예) HOST: www.google.com |
  | 공백 라인 | 비어있는 공간 |
  | HTTP 메시지 바디 | 실제 전송할 데이터 <br> 예: \<html> ... \</html> |

* 응답 메시지 구조
  > 예)<pre>
  > HTTP/1.1 200 OK
  > Content-Type: text/html;charset=UTF-8
  > Content-Length: 3424
  > 
  > \<html> 
  >   \<body>
  >     ...
  >   \</body>
  > \</html>
  ></pre>

  | 구조 | 내용 |
  | :---: | --- |
  | 시작 라인 | HTTP_버전 HTTP_상태_코드 이유_문구 <br> 예) HTTP/1.1 200 OK |
  | HTTP 헤더 | HTTP 전송에 필요한 모든 부가 정보 포함 <br> 예) <pre>Content-Type: text/html;charset=UTF-8<br>Content-Length: 3424</pre> |
  | 공백 라인 | 비어있는 공간 |
  | HTTP 메시지 바디 | 실제 전송할 데이터 <br> 예: \<html> ... \</html> |
    