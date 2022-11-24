# Focalboard 설치(Ubuntu)
* 설치 가이드 : https://www.focalboard.com/download/personal-edition/ubuntu/

```bash
# 설치 파일 다운
wget https://github.com/mattermost/focalboard/releases/download/v7.5.1/focalboard-server-linux-amd64.tar.gz
tar -xvzf focalboard-server-linux-amd64.tar.gz
# 아래 focalboard release 페이지에서 사용할 버전 확인
# https://github.com/mattermost/focalboard/releases

# 설치 파일 이동
sudo mv focalboard /opt
```

## Nginx 설치
* SSL 설정이 필요 없는경우 설치할 필요없음

```bash
# nginx config 파일 생성
sudo vi /etc/nginx/sites-available/focalboard

# 앞에서 생성한 focalboard 파일에 다음 내용 작성
upstream focalboard {
   server localhost:8000;
   keepalive 32;
}

server {
   listen 80 default_server;

   server_name focalboard.example.com;

   location ~ /ws/* {
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
       client_max_body_size 50M;
       proxy_set_header Host $http_host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
       proxy_set_header X-Frame-Options SAMEORIGIN;
       proxy_buffers 256 16k;
       proxy_buffer_size 16k;
       client_body_timeout 60;
       send_timeout 300;
       lingering_timeout 5;
       proxy_connect_timeout 1d;
       proxy_send_timeout 1d;
       proxy_read_timeout 1d;
       proxy_pass http://focalboard;
   }

   location / {
       client_max_body_size 50M;
       proxy_set_header Connection "";
       proxy_set_header Host $http_host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
       proxy_set_header X-Frame-Options SAMEORIGIN;
       proxy_buffers 256 16k;
       proxy_buffer_size 16k;
       proxy_read_timeout 600s;
       proxy_cache_revalidate on;
       proxy_cache_min_uses 2;
       proxy_cache_use_stale timeout;
       proxy_cache_lock on;
       proxy_http_version 1.1;
       proxy_pass http://focalboard;
   }
}
# 앞에 까지 작성

# sites-enabled 폴더에 다른 파일 삭제
sudo rm /etc/nginx/sites-enabled/default

# 앞에서 생성한 focalboard 파일을 sites-enabled 폴더에 복사 & 변경 사항 자동 적용
sudo ln -s /etc/nginx/sites-available/focalboard /etc/nginx/sites-enabled/focalboard

# nginx conf 파일의 에러 확인
sudo nginx -t

# nginx 변경 사항 적용
sudo /etc/init.d/nginx reload
```

## MySQL 설치 및 Focalboard와 연결
* 다른 DB는 공식 홈페이지 설치 가이드 확인
<br>: https://www.focalboard.com/download/personal-edition/ubuntu/

```bash
# MySQL 설치
sudo apt-get install mysql-server

# MySQL 실행
sudo mysql
# 비밀번호 입력 줄에서 공백 상태로 Enter 시, ubuntu 서버 비밀번호로 자동입력됨

# DB 생성
CREATE DATABASE boards;

# user 생성
CREATE USER 'boardsuser'@'localhost' IDENTIFIED BY 'boardsuser-password';

# 생성한 user에게 boards DB의 모든 권한 부여
GRANT ALL PRIVILEGES ON boards.* TO 'boardsuser'@'localhost';

# MySQL 나가기
exit;

# Focalboard에 MySQL 연결
sudo vi /opt/focalboard/config.json

# config.json 파일에서 아래 두줄 수정
"dbtype": "mysql",
"dbconfig": "boardsuser:boardsuser-password@tcp(127.0.0.1:3306)/boards",
```

## Focalboard 실행을 위한 구성
```bash
# 다름 파일 생성
sudo vi /lib/systemd/system/focalboard.service

# 생성한 파일에 다음 내용 작성
[Unit]
Description=Focalboard server

[Service]
Type=simple
Restart=always
RestartSec=5s
ExecStart=/opt/focalboard/bin/focalboard-server
WorkingDirectory=/opt/focalboard

[Install]
WantedBy=multi-user.target
# 윗줄까지 작성

# 앞에서 작성한 service 내용 적용
sudo systemctl daemon-reload

# focalboard 실행
sudo systemctl start focalboard.service

# 서버 부팅 시, focalboard 자동 실행 지정
sudo systemctl enable focalboard.service

# focalboard 접속 테스트
curl localhost:8000

# Nginx 접속 테스트
curl localhost
```