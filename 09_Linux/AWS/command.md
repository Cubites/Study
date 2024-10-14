## vi
* <code>sudo vi [파일명]</code> : vi 편집기로 파일 열기
* 파일을 연 후, 명령모드에서 사용되는 명령어
  * <code>:w</code> : 저장
  * <code>:q</code> : 닫기 
  * <code>:wq</code> : 저장 후 닫기
  * <code>i</code> : 편집모드로 전환
  * (편집모드 상태에서) esc 키 : 명령모드로 전환
* <code>shift + insert</code> : 클립보드에 있는 내용 붙여넣기(내용이 너무 많으면 에러 발생)
* <code>shift + g</code> : 맨 아래로 커서 이동
* <code>gg</code> : 최상단으로 커서 이동
<<<<<<< Updated upstream:09_Linux/AWS/command.md
* 여러 줄 주석처리 : v(visual mode)에서 줄 선택 후 <code>:</code>, <code>norm i#</code>
* 여러 줄 주석처리 해제 : v(visual mode)에서 줄 선택 후 <code>:</code>, <code>norm 1x</code>

## nginx
* 셋팅
=======
### 주석 처리
#### 1. v를 눌러 visual 모드 진입
#### 2. 방향키(혹은 hjkl 키)로 영역 선택
#### 3. : 을 누르고 norm i# 입력 후 엔터
  * <code>norm i<문자></code> : <문자>를 앞에 붙임
  * : 를 눌렀을 때 나오는 문자를 지우면 안됨(선택 영역을 지칭하는 코드이므로)
#### 지우는 법은 1, 2와 동일하게 한 후, norm 1x 입력
  * <code>norm 1x</code> : 가장 앞 문자 1개를 없앤다는 의미

## nginx
### 셋팅 (인스턴스 중지 후 재실행 시, IP가 바뀌어 server_name 재설정 필요)
>>>>>>> Stashed changes:9_AWS/command.md
  * 서버 등록 (AWS책 36 페이지)
    ```bash
    # vi로 파일을 열음
    $ sudo vi /opt/nginx/conf/nginx.conf
    <br>
    # server > server_name 값 : EC2 인스턴스의 IPv4 퍼블릭 주소 값(or 도메인 네임)으로 입력
    server {
      listen 80;
      server_name 1.124.352.312;

      ...

    }
    ```
* <code>sudo /opt/nginx/sbin/nginx</code> : nginx 서버 실행
* <code>sudo /opt/nginx/sbin/nginx -s stop</code> : nginx 서버 종료

## sites-enabled를 사용한 nginx 세팅
* /etc/nginx/nginx.conf 파일 세팅
  ```bash
  http {
    include /etc/nginx/sites-enabled/세팅파일명.conf
  }
  ```
* /etc/nginx/sites-available/파일명.conf 세팅
  ```bash
  server {
    listen 80;
    listen 443;

    server_name 도메인네임;

    location / {
      ...
    }
  }
* sites-available, sites-enabled 연결
  ```bash
  sudo ln -s /etc/nginx/sites-available/파일명.conf /etc/nginx/sites-enabled/
  ```
  * sites-available에 있는 파일 수정 시, sites-enabled 파일에 수정 내역 자동 적용
  * sites-enabled에 있는 파일이 nginx에 적용

## nginx 실행 단축키 세팅
* 책 39p
  * 1. /etc/init.d 에 nginx 파일 생성
    ```bash
    $ cd /etc/init.d
    $ sudo vi nginx
    ```
  * 2. 링크(https://git.io/JeMFD)의 내용을 파일에 입력 후 저장
    * <code>shift + insert</code> : 클립보드 내용 붙여넣기
  * 3. <code>$ sudo chmod 755 nginx</code> 로 파일 권한 변경
* 추가된 명령어
  ```bash
  $ sudo service nginx start # nginx 시작
  $ sudo service nginx stop # nginx 종료
  $ sudo service nginx restart # nginx 재시작
  $ sudo service nginx status # nginx 프로세스 상태 확인
  ```

## nginx 가상 서버
#### 1. 폴더 생성 : /etc/nginx 경로에 sites-available, sites-enabled 폴더 생성
#### 2. sites-available 폴더에 .conf 파일 생성(이름은 아무거나 원하는 대로)
#### 3. 다음 내용 입력

#### 4. 다음 명령어 실행
```bash
sudo ln -s /etc/nginx/sites-available/[config 파일 이름] /etc/nginx/sites-enabled/
```
  * sites-available : 직접 수정할 .conf 파일
  * sites-enabled : nginx 실행 시 필요한 파일
  * 위 명령어를 입력하면 sites-enabled에 동일한 내용의 파일이 생성되고, sites-available에 있는 파일 수정 시 변경 사항이 자동으로 적용됨


## pm2
* 서버 실행 방법
```bash
# pm2 start <서버 파일 경로>/<서버 파일 명>
pm2 start server/server.js
```
* 서버 로그 확인
```bash
# 실행 중 로그 확인
pm2 monit
# 마지막 로그 15줄 확인 (앱 이름은 pm2 status 입력 후 나오는 표에서 확인 가능)
pm2 log <앱 이름>
```
## git clone
* 방법
  * 1. clone 할 폴더로 이동
  * 2. <code>git clone [repository 링크]</code>
    <br>> 특정 branch 다운은 <code>git clone -b <브런치 이름> --single-branch <저장소 URL></code>
  * 3. 유저 이름, access token 입력

## EC2에서 RDS 연결
* mariadb 패키지 설치
  * <code>sudo yum install -y mariadb</code>
* mariadb 버전 확인
  * <code>mysql --version</code>
* mariadb 연결
  * <code>mysql -u 유저이름 -p -h 엔드포인트</code>
  * <code>Enter password: 유저비밀번호</code>