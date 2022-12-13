# 명령어

## 프로세스 실행
```bash
# 실행
sudo systemctl start <프로세스명>

# 서버 재시작 시 자동 재시작
sudo systemctl enable <프로세스명>

# 자동 재시작 해제
sudo systemctl disable <프로세스명>
```

## 프로세스 확인
* netstat 사용
  | 명령어 | 기능 |
  | --- | --- |
  | -l | netstat에 모든 수신 소켓 표기 |
  | -t | 모든 TCP 연결 표시 |
  | -u | 모든 UDP 연결 표시 |
  | -p | 포트에서 수신하는 어플리케이션/데몬 이름 표시 |
  | -n | 서비스 이름 대신 port 번호 표시 |
```bash
# 예
netstat -ltup 

# 명령어 입력 결과
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 127.0.0.1:587           0.0.0.0:*               LISTEN      28071/sendmail: MTA
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1255/nginx: master
...

# Program name 값이 표시되지 않는 경우 > 관리자 권한으로 시도하면 표시됨
```

## 조회

### 폴더 내부 조회
```bash
# 예시
ls -al 폴더경로

# ls : 해당 위치의 폴더와 파일들 전부 조회(폴더 경로 미입력시 현재 위치를 기준으로 조회)

# -a : 숨김 처리된 파일과 폴더도 전부 조회

# -l : 각 폴더와 파일의 권한 및 소유자까지 전부 표시. 권한은 3글자씩 끊어서 순서대로 소유자 - 그룹 - 그 외 사용자의 권한을 나타냄, 각 글자는 읽기(r), 쓰기(w), 실행(x) 권한을 의미

# 폴더경로 : 조회할 폴더 경로. 입력하지 않으면 현재 폴더가 지정됨
```

### 서버 실행 시 자동 재부팅되는 프로그램 목록 조회
```bash
systemctl list-unit-files --state=enabled
```

### 설치되어 있는 패키지 조회
```bash
apt list --installed

# 뒤에 "| greb 찾으려는_패키지_명"을 추가로 입력하면 특정 패키지 조회 가능

# 설치되어 있는 패키지를 설치한 시간 순서대로 조회
ll /var/lib/dpkg/info/*.list -t 
```

### 실행 중인 nodejs 프로세스 조회
```bash
ps -aef | grep node
```

### Global node 패키지 설치 위치 조회
```bash
npm root -g
```

### SSL 인증서 유효기간 확인
```bash
openssl x509 -in /ssl인증서경로/cert파일명 -noout -dates
# cert파일명은 .pem, .crt, .cer 같은 확장자가 붙은 파일을 넣으면 됨
```

### SSL 인증서 정보 조회
```bash
openssl s_client -connect [도메인]:[포트]
```

### 사용자 목록 조회
```bash
cat /etc/passwd
```

### 환경변수 조회
```bash
vi /etc/environment
```

## 권한 및 소유자 변경
### 권한 변경
```bash
# 예시
chmod -R 755 폴더명

# -R : 해당 폴더의 모든 하위 폴더 및 파일의 권한을 변경

# 755 : 권한 지정 값 숫자 하나씩 [소유자 - 그룹 - 그 외 사용자의 권한]을 나타냄
# 읽기(4), 쓰기(2), 실행(1)이고 부여할 권한에 대응되는 숫자들의 합을 입력하면 됨
```

### 소유자 변경
```bash
chown 변경할_소유자:변경할_그룹 [변경할 파일 or 폴더]

# 변경할 소유자 : 해당 대상의 소유자가 될 사용자 명

# 변경할_그룹 : 해당 대상의 그룹으로 부여할 그룹명. 변경하지 않으면 적을 필요없음

# 변경할 파일 or 폴더 : 소유자를 변경할 대상 명
```

## 복사
```bash
cp 복사할_대상 복사할_위치

# 파일 혹은 폴더를 복사하는 명령어. 확장자가 있으면 파일 없으면 폴더

# 복사할 위치 : 복사할 위치와 파일명. 이때 적은 파일명으로 변경되어 복사됨

# 예시
cp /home/test/testfile.txt /home/test2/testfile2.txt
# testfile.txt 파일을 /home/test2 폴더로 옮기고 파일명은 testfile2.txt로 변경함
```

## 리눅스 시스템 종료
```bash
# 1분 뒤 시스템 종료
sudo shutdown

# 즉시 시스템 종료
sudo shutdown now
```

## NAS 마운트
* NFS : Linux/Unix 환경에서 주로 사용. 오래 됨. 원격 저장소, 공유 저장소 구축 목적
* CIFS : Windows 환경에서 주로 사용. 파일 공유 목적
```bash
# nfs-common, cifs-utils 둘 중 하나 설치
sudo apt install nfs-common
sudo apt install cifs-utils

# nas와 마운트
## nfs-common
sudo mount -t nfs //<IP 주소, 혹은 도메인>/<마운트 할 폴더 경로> /<마운트 할 폴더 경로>
## cifs
sudo mount -t cifs //<IP 주소, 혹은 도메인>/<마운트 할 폴더 경로> /<마운트 할 폴더 경로> -o username=<아이디>,password=<비밀번호>,rw
### rw : 읽기(r), 쓰기(w) 권한 부여
```

## Sudo 권한 부여
```bash
# 방법 1. /etc/sudoers 파일 편집
# 방법 2. /etc/sudoers.d 폴더에 파일을 생성하여 편집
# sudoers에서 문법 오류 발생 시 sudo 명령어가 제대로 동작하지 않을 수 있음
# 때문에 visudo 를 사용하여 문법 오류 발생 시 저장이 안되게 하는게 좋음
sudo EDITOR=vi visudo /etc/sudoers.d/파일명
# EDITOR 뒤에는 본인이 편한 편집기를 적으면 됨( ex) vi, vim, nano)

# 작성 장법은 다음과 같음
<사용자 명> <Host>=(<사용자 권한>:<그룹 권한>) NOPASSWD: <권한을 허용할 명령어>

## 예시
user ALL=(root) NOPASSWD: bin/rm /home/user/*.txt
## >> 아무 경로(ALL)로 접속했을 때 user라는 사용자에게 /home/user 폴더 내 .txt 파일 삭제 명령에 대해 root 권한 부여. 명령어 사용 시 비밀번호 입력 필요없음(NOPASSWD)

user ALL=(ALL) NOPASSWD: ALL
## >> user라는 사용자에게 모든 명령어에 모든 권한 부여
```



# Q&A
* sudo 명령어로 웹 서버를 실행하는 이유
<br>: 기본 보트 0 ~ 1024 를 이용하여 프로그램을 실행할 때 root 권한이 필요함