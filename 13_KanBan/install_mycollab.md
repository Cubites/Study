# MyCollab 설치

## 1. JRE 설치
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

## 2. MySQL 설치
```bash
sudo apt-get update

# MySQL 설치
sudo apt-get install mysql-server

# 외부 접속 에러 발생 시 사용(포트 3306 오픈)
sudo ufw allow mysql
# ubuntu 방화벽을 열어주는 명령어

# MySQL 실행
sudo systemctl start mysql

# 서버 재시작 시 MySQL 자동 재시작
sudo systemctl enable mysql

# MySQL 접속
sudo /usr/bin/mysql -u root -p

# MyCollab에서 사용할 DB 생성
mysql> CREATE SCHEMA `mycollab` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

# MyCollab에서 DB 접속 시 사용할 계정 생성
mysql> CREATE USER 'mycollab'@'localhost' IDENTIFIED BY 'password';

# 생성한 계정에 생성한 DB에 대한 모든 권한 부여
mysql> GRANT ALL PRIVILEGES ON mycollab.* TO 'mycollab'@'localhost' IDENTIFIED BY 'password';

mysql> FLUSH PRIVILEGES;

# 계정 권한 조회
mysql> show grants for mycollab;

mysql> exit;
```

## 3. MyCollab 설치
```bash
# MyCollab 파일 다운(다운 받을 폴더 위치에서)
wget https://github.com/MyCollab/mycollab/releases/download/Release_7.0.3/MyCollab-All-7.0.3.zip

# 압축 해제(압축 해제 패키지 설치 필요)
upzip MyCollab-All-7.0.3.zip

# 설치파일 실행(Linux: startup.sh, Windows: startup.bat)
./MyCollab-All-7.0.3/bin/startup.sh

# 설정 파일(도메인, 포트 번호 등 설정 변경 가능)
sudo vi MyCollab-All-7.0.3/config/application.properties.ftl
```

## 4. 설치한 MyCollab에 접속하여 초기설정 등록
* 초기 포트번호 = 8080

* 재부팅 한경우
```bash
# 아래의 실행파일 재 실행
./MyCollab-All-7.0.3/bin/startup.sh
```