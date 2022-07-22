## vi
* <code>sudo vi [파일명]</code> : vi 편집기로 파일 열기
* 파일을 연 후, 사용되는 명령어
  * <code>:w</code> : 저장
  * <code>:q</code> : 닫기 
  * <code>:wq</code> : 저장 후 닫기
* <code>shift + insert</code> : 클립보드에 있는 내용 붙여넣기(내용이 너무 많으면 에러 발생)

## nginx
* 셋팅 (인스턴스 중지 후 재실행 시, IP가 바뀌어 server_name 재설정 필요)
  * 서버 등록 (AWS책 36 페이지)
    <pre>
    # vi로 파일을 열음
    $ sudo vi /opt/nginx/conf/nginx.conf
    <br>
    # server > server_name 값을 EC2 인스턴스의 IPv4 퍼블릭 주소 값으로 입력
    server {
      listen 80;
      server_name 1.124.352.312;

      ...

    }
    </pre>
* <code>sudo /opt/nginx/sbin/nginx</code> : nginx 서버 실행
* <code>sudo /opt/nginx/sbin/nginx -s stop</code> : nginx 서버 종료

## nginx 간단 실행 셋팅
* 책 39p
  * 1. /etc/init.d 에 nginx 파일 생성
    <pre>
    $ cd /etc/init.d
    $ sudo vi nginx
    </pre>
  * 2. 링크(https://git.io/JeMFD)의 내용을 파일에 입력 후 저장
    * <code>shift + insert</code> : 클립보드 내용 붙여넣기
  * 3. <code>$ sudo chmod 755 nginx</code> 로 파일 권한 변경
* 추가된 명령어
  <pre>
  $ sudo service nginx start # nginx 시작<br>
  $ sudo service nginx stop # nginx 종료<br>
  $ sudo service nginx restart # nginx 재시작<br>
  $ sudo service nginx status # nginx 프로세스 상태 확인
  </pre>


## git clone
* 방법
  * 1. clone 할 폴더로 이동
  * 2. <code>git clone [repository 링크]</code>
  * 3. 유저 이름, access token 입력
