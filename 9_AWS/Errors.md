# 발생했던 에러들

### xhr.js:220 Mixed Content: The page at 'https://commenter.link/' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://54.180.18.215:4000/api/main'. This request has been blocked; the content must be served over HTTPS.
* https 페이지에서 http로 요청을 보낼 때 발생하는 에러
* https 페이지에서는 https로 요청을 보내야함

### POST https://54.180.18.215:4000/api/first net::ERR_SSL_PROTOCOL_ERROR
* nodejs 서버에서 인증서를 인식하지 못한 것으로 추정
* nodejs 서버로 접근조차 하지 못함