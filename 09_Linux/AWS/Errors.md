# 발생했던 에러들

### xhr.js:220 Mixed Content: The page at 'https://commenter.link/' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://54.180.18.215:4000/api/main'. This request has been blocked; the content must be served over HTTPS.
* https 페이지에서 http로 요청을 보낼 때 발생하는 에러
* https 페이지에서는 https로 요청을 보내야함

### POST https://54.180.18.215:4000/api/first net::ERR_SSL_PROTOCOL_ERROR
* nodejs 서버에서 인증서를 인식하지 못한 것으로 추정
* nodejs 서버로 접근조차 하지 못함

### 메인 페이지 이외의 페이지에서 새로고침 시 500 에러 발생
* 원인
  ```bash
  # nginx conf 파일 일부
  location / {
      ...
      try_files $uri $uri/ /index.html/;
  }
  ```
  * React에서는 하나의 html 파일에서 일부 component가 달라짐
    <br>> nginx에서 새로고침 시, 다른 html 파일을 찾으려고 시도해, 파일이 없어 에러 발생
* 해결
  ```bash
    # nginx conf 파일 일부
    location / {
        ...
        try_files $uri $uri/ /index.html =404;
    }
  ```

### nginx 실행에러
* 에러 메세지 : Failed to start The nginx HTTP and reverse proxy server.
* 원인 
  ```
  예전에 nginx 에러 때문에 아파치로 서버 구현을 해보고자 시도할 때, "httpd를 재부팅 시 자동 실행"을 설정했었음
  > 인스턴스를 재부팅하자 nginx를 실행할 포트를 httpd가 차지함
  > 해당 포트에 이미 실행 중인 것이 있어 nginx 에러 발생
  ```
* 해결
  ```bash
  # 실행 중인 포트 확인
  netstat -tylpn
  # httpd 자동 실행 해제 후, httpd 종료 및 nginx 실행
  ```