# Youtrack 설치 및 Virtualbox 네트워크 설정

* 참고: Ubuntu 22.04.1 운영체제 기준으로 설명

* Virtualbox Ubuntu 설치는 0_virtualbox.md 확인

## 1. Youtrack 파일 다운
```bash
wget -O /home/youtrack/youtrack.jar https://download.jetbrains.com/charisma/youtrack-<version>.jar
# 설치할 파일을 다운 받아 "youtrack.jar" 라는 이름으로 저장
# 버전은 아래 수동 다운 페이지에서 확인
# 다운 링크 : https://www.jetbrains.com/ko-kr/youtrack/download/get_youtrack.html#section=server
```

## 2. JRE 설치
```bash
sudo apt-get update

sudo apt-get install openjdk-8-jdk
# 혹은 sudo apt-get install openjdk-8-jre >> jdk 설치 시 jre도 같이 설치됨

sudo vi /etc/environment
# 환경변수 추가 : JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64"

source /etc/environment
# 환경변수 적용

echo $JAVA_HOME
# path 확인
```

### 3. Youtrack 설치 및 실행

```bash
sudo adduser youtrack --disabled-password		
# youtrack 이라는 이름의 사용자 추가

chown youtrack:youtrack /[youtrack 설치파일 경로]/youtrack.jar
# 설치 파일에 권한 설정

# /etc/systemd/system/youtrack.service 파일 생성 후 아래의 내용 작성

[Unit]
Description=Youtrack
Requires=network.target
After=syslog.target network.target

[Service]
Type=simple
WorkingDirectory=/home/youtrack
ExecStart=/usr/bin/java -jar /home/youtrack/youtrack.jar --J-Xmx1G 8080
ExecStop=/usr/bin/java -jar /home/youtrack/youtrack.jar stop
User=youtrack

[Install]
WantedBy=default.target
# Service 3번째 줄 마지막 숫자가 포트번호. 원하는 포트로 바꿔도 무관
# 단, 후에 호스트에서 접속하기 위해 포트 포워딩을 설정할 때 필요하니 알아 둘 것

systemctl daemon-reload

systemctl enable youtrack
# youtrack 사용가능 설정

service youtrack start
# youtrack 실행

systemctl status youtrack
# 실행 중인 youtrack의 상태 확인. active라고 표시되어 있어야 정상 실행 중
```

## 4. Nginx 단축키 설정(with Nginx)
```bash
sudo vi /etc/init.d/youtrack

# 앞에서 생성된 파일 youtrack에 다음 내용 작성
export HOME=/home/youtrack

set -e

PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
NAME=youtrack
SCRIPT=/home/$NAME/$NAME.sh

d_start() {
	su youtrack -l -c "$SCRIPT start"
}
d_stop() {
	su youtrack -l -c "$SCRIPT stop"
}

case "$1" in
	start)
		echo "Starting $Name..."
		d_start
	;;
	stop)
		echo "Stoping $Name..."
		d_stop
	;;
	restart|force-reload)
		echo "Restarting $Name..."
		d_stop
		d_start
	;;
	*)
		echo "Usage: sudo /etc/init.d/youtrack {start|stop|restart}" >&2
		exit 1
	;;
esac

exit 0
### 여기까지 작성

sudo chmod +x /etc/init.d/youtrack
sudo update-rc.d youtrack defaults
# youtrack을 실행할 사용자인 youtrack가 접근할 수 있게 작성한 파일 권한 숮어

sudo mkdir /var/log/youtrack
sudo chown youtrack:youtrack /var/log/youtrack
# 로그 저장용 폴더 생성 후, 소유자를 사용자 youtrack으로 변경

sudo vi /home/youtrack/youtrack.sh
# youtrack.sh 파일에 아래의 내용 작성

#! /bin/sh
###
# YouTrack startup script
###

export HOME=/home/youtrack
export JAVA_HOME=/usr/bin/java
NAME=youtrack
PORT=8112
MAXHEAP=512M
BASEDIR=/srv/www/your.domain.tld
JAR=$BASEDIR/`ls-Lt $BASEDIR/*.jar | grep -o "$NAME-[^/]*.jar" | head -1`
LOG=/var/log/$NAME/$NAME-$PORT.log
PID=/run/$NAME/$NAME-$PORT.pid

# Setup proper run environment
if [ ! -d /run/$NAME ]; then
	mkdir /run/$NAME
	chown $NAME:$NAME /run/$NAME
fi
if [ ! -d /var/log/$NAME ]; then
	mkdir /var/log/$NAME
	chown $NAME:$NAME /var/log/$NAME
fi

d_start() {
	if [ -f $PID ]; then
		PID_VALUE=`cat $PID`
		if [ ! -z "$PID_VALUE" ]; then
			PID_VALUE=`ps ax | grep $PID_VALUE | grep -v grep | awk '{print $1}'`
			if [ ! -z "$PID_VALUE" ]; then
				exit 1;
			fi
		fi
	fi
	
	PREV_DIR=`pwd`
	cd $BASEDIR
	exec $JAVA_HOME -Xmx$MAXHEAP -jar $JAR $PORT >> $LOG 2>&1 &
	echo $! > $PaID
	cd $PREV_DIR
}

d_stop() {
	if [ -f $PID ]; then
		PID_VALUE=`cat $PID`
		if [ ! -z "$PID_VALUE" ]; then
			PID_VALUE=`ps ax | grep $PID_VALUE | grep -v grep | awk '{print $1}'`
			if [ ! -z "$PID_VALUE" ]; then
				kill $PID_VALUE
				WAIT_TIME=0
				while [ `ps ax | grep $PID_VALUE | grep -v grep | wc -l`-ne 0 -a "$WAIT_TIME" -lt 2 ]
				do
					sleep 1
					WAIT_TIME=$(expr $WAIT_TIME + 1)
				done
				if [ `ps ax | grep $PID_VALUE | grep -v grep | wc -l` -ne 0 ]; then
					WAIT_TIME=0
					while [ `ps ax | grep $PID_VALUE| grep -v grep | wc -l` -ne 0 -a "$WAIT_TIME" -lt 15 ]
					do
						sleep 1
						WAIT_TIME=$(expr $WAIT_TIME + 1)
					done
					echo
				fi
				if [ `ps ax | grep $PID_VALUE | grep -v grep | wc -l` -ne 0 ]; then
					kill -9 $PID_VALUE
				fi
			fi
		fi
		rm -f $PID
	fi
}

case "$1" in
	start)
		d_start
	;;
	stop)
		d_stop
	;;
	restart|force-reload)
		d_stop
		d_start
	;;
	*)
		echo "Usage: $0 {start|stop|restart|force-reload}" >&2
		exit 1
	;;
esac

exit 0
# 바로 윗줄까지 작성

sudo shown youtrack:youtrack /home/youtrack/youtrack.sh
sudo chmod +x /home/youtrack/youtrack.sh
# youtrack.sh 파일의 소유자 변경 및 권한 수정

# /home/youtrack 폴더로 youtrack 설치파일(.jar)을 가져옴
# 방법 1. 호스트에서 다운받아 공유 폴더에 파일을 넣고 /home/youtrack으로 복사
# 방법 2. wget http://download.jetbrains.com/charisma/youtrack-[버전].jar -P /home/youtrack 명령어로 직접 설치

# 본 글에서는 youtrack-2022.3.62571.jar 로 진행

sudo shown youtrack:youtrack /home/youtrack/youtrack-[버전].jar
# 사용자 youtrack으로 파일 소유자 변경
```

## 5. 웹 서버 구축(Nginx)
* 성능 이슈 발생, 혹은 도메인 적용 시 구축 필요
```bash
sudo apt-get install nginx-full
# 웹 서버 소프트웨어인 nginx 설치

sudo vi /etc/nginx/sites-available/default
# 서버(nginx) 설정

# 해당 파일의 location을 아래 내용으로 작성

location / {
    proxy_pass http://[서버이름]:8080/?wizard_token=토큰값;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
}

# 경로 = systemctl status youtrack.service 명령어 입력시 가장 마지막 줄에 나오는 경로
# 예 : http://test:8080/?wizard_token=HrARrE3FEgRawE
# 서버이름 : ubuntu 설치할 때 입력한 서버 이름
# 포트 : /etc/init.d/youtrack 파일을 작성할 때 입력한 포트번호
# 토큰값 : youtrack.jar 파일 실행 시 발급된 토큰

# /etc/nginx/sites-available/default 파일이 아닌 같은 경로에 새파일을 생성하여 작성해도 됨
# 만약 새 파일을 생성한 경우 아래의 명령어 실행 필요
ln -s /etc/nginx/sites-available/생성한_파일명 /etc/nginx/sites-enabled/생성한_파일명
# 새 파일을 생성하지 않았다면 입력할 필요 없음

sudo service nginx start
# 서버(nginx) 실행
```

## 5-1. youtrack 카드 이동이 불안정한 경우(성능이슈 발생시)
* 리버스 프록시 설정 필요
* https://www.jetbrains.com/help/youtrack/server/2022.3/Reverse-Proxy-Configuration.html

```bash
# Nginx 기준 설명
# /etc/nginx/sites-available/default 파일 수정
# location / { } 부분의 내용을 아래의 내용으로 수정
add_header Strict-Transport-Security max-age=31536000;

location / {
	proxy_set_header X-Forwarded-Host $http_host;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded-Proto $scheme;

	proxy_buffers 8 64k;
	proxy_busy_buffers_size 128k;
	proxy_buffer_size 64k;

	client_max_body_size 10m;

	proxy_http_version 1.1;
	proxy_pass http://<youtrack 주소>:<youtrack 포트>;
}
location /api/eventSourceBus {
	proxy_cache off;
	proxy_buffering off;
	proxy_read_timeout 86400s;
	proxy_send_timeout 86400s;
	proxy_set_header Connection '';
	chunked_transfer_encoding off;

	proxy_set_header X-Forwarded-Host $http_host;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded-Proto $scheme;
	proxy_http_version 1.1;
	proxy_pass http://<youtrack 주소>:<youtrack 포트>;
}
# 윗줄까지 작성

# /etc/nginx/nginx.conf 파일 수정
# events { } 윗 줄에 아래 내용 추가
worker_rlimit_nofile 4096;

# events { } 안에 worker_connections 값을 2048 로 수정

# 브라우저 재 접속 시, Nginx 페이지로 접속되는 경우
# 크롬 기준
# 방문 기록 > 인터넷 사용 기록 삭제에서
# "캐시된 이미지 및 파일"을 체크하고 삭제
# 재시도 시, 정상 연결 됨
```

## 6. 네트워크 설정
```bash
# 5.1 virtualbox 상단 메뉴에서 네트워크 > 만들기

# 5.2 생성된 네트워크 IPv4 주소 확인(youtrack 접속 경로가 될 IP 주소)

# 5.3 virtualbox에서 게스트(ubuntu 가상환경) 설정 > 네트워크 > NAT에 연결된 어댑터(기본적으로 어댑터 1) > Advenced > 포트 포워딩

# 5.4 새 포트 포워딩 규칙 추가
# 호스트 IP : 5.2에서 확인한 IP 주소
# 호스트 포트 : 호스트에서 사용 중이지 않은 아무 포트
# 게스트 IP : 게스트에서 ip addr 명령어 사용시 enp0s3에 나오는 inet 값(IP)
# 게스트 포트 : youtrack이 실행 중인 포트 번호

# 5.5 5.에서 입력한 호스트 IP와 호스트 포트를 웹 브라우저에 입력하면 youtrack으로 접속 됨
# 예: http://[호스트 IP]:[호스트 포트]

# 5.6 youtrack 페이지가 나오면 성공
```