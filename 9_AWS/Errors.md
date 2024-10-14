# 발생했던 에러들

### xhr.js:220 Mixed Content: The page at 'https://commenter.link/' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://54.180.18.215:4000/api/main'. This request has been blocked; the content must be served over HTTPS.
* https 페이지에서 http로 요청을 보낼 때 발생하는 에러
* https 페이지에서는 https로 요청을 보내야함

### POST https://54.180.18.215:4000/api/first net::ERR_SSL_PROTOCOL_ERROR
* nodejs 서버에서 인증서를 인식하지 못한 것으로 추정
* nodejs 서버로 접근조차 하지 못함

### .swp 파일이 존재하여 복구 여부를 계속 물어보는 경우
* 보통 텍스트 편집 중 "!"로 강제 종료할 때 .swp이 발생하는 경우 임
* .swp 파일을 삭제하면 해결됨
```bash
# 해당 파일 경로로 이동
# .swp은 숨겨진 파일이므로 숨겨진 파일까지 볼 수 있는 명령어로 파일 확인
ls -a
# 파일 삭제
rm <파일명>
```

### nginx 에러 : Failed to start The nginx HTTP and reverse proxy server
* 경우 : react에서 서버 요청 경로를 http로 지정하였으나 https로 요청하여 발생
* 원인 : 그 전에 캐시가 남아있어 변경사항이 적용되지 않아서 발생
* 해결 : 상단의 새로고침을 길게 누르면 나오는 "캐시 비우기 및 강력 새로고침" 클릭