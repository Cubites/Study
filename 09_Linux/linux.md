# 명령어

## 프로세스 실행
```bash
# 실행
sudo systemctl start <프로세스명>

# 서버 재시작 시 자동 재시작
sudo systemctl enable <프로세스명>

# 자동 재시작 해제
sudo systemctl disable <프로세스명>
sudo update-rc.d apache2 remove # ubuntu 14 이전 버전, debian 등 다른 linux에서 사용
```

## 프로세스 확인
* netstat 사용
  | 명령어 | 기능 |
  | --- | --- |
  | -a | 모든 연결 및 수신 대기 포트 표시 |
  | -l | LISTEN(대기)하고 있는 포트 표시 |
  | -t | 모든 TCP 연결 표시 |
  | -u | 모든 UDP 연결 표시 |
  | -p | PID 와 프로그램 이름 표시 |
  | -n | 서비스 이름 대신 ip:port 로 표시 |
  | -r | 라우팅 테이블 표시 |
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
* 연결 상태(State)
  | State | 의미 |
  | --- | --- |
  | LISTEN | 연결 요청을 기다리고 있음(포트가 열려있음) |
  | SYN_SENT | 로컬에서 원격 연결 요청(SYN 신호를 보냄)을 시도 |
  | SYN_RECV | 원격으로 부터 연결 요청을 받음. SYN+ACK 신호 응답 & ACK 받지 못함(이 상태가 많으면 Flooding 공격 의심) |
  | ESTABLISHED | 서로 연결되어 있음 |
  | FIN_WAIT1 | 소켓이 답히고 연결이 종료되는 중. 원격 응답은 받을 수 있음 |
  | FIN_WAIT2 | 로컬이 원격으로 부터 연결 종료 요구를 기다리는 중 |
  | CLOSE_WAIT | 원격으로 부터 FIN+ACK 신호를 받고 ACK 신호를 원격에 보냄(원격 연결요청 받음 & 연결 종료 대기) |
  | TIME_WAIT | 연결 종료. 원격 수신보장을 위해 기다리는 상태 |
  | LAST_ACK | 연결 종료. 승인 대기 상태 |
  | CLOSED | 연결 완전 종료 |

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

# 다른방법
certbot certificates
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

### 리눅스 버전 조회
```bash
uname -a
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

## 리눅스에서 윈도우로 파일 혹은 폴더 복사
```bash
# 파일 복사
scp root@IP:/경로/파일명.확장자 윈도우_복사_위치_경로
## 예시
scp root@126.24.58.186:/home/test/testfile.txt C:\Users\copyplace

# 폴더 복사
scp -r root@IP:/경로/폴더명 윈도우_복사_위치_경로
## 예시
scp -r root@126.24.58.186:/home/test/testfolder C:\Users\copyplace

## ps. 혹시 복사가 안되는 경우 root가 아닌 일반 유저 계정으로 시도해볼 것
```

## 파일 or 폴더 용량 확인
  | 옵션 | 기능 |
  | --- | --- |
  | -a | 모들 파일 크기 출력 |
  | -h | 디렉토리/파일 크기를 KB/MB/GB 단위로 표시 |
  | -max-depth=N | 최대 N번째 하위 디렉토리까지 표시 |
  | --apparent-size | 실제 파일의 용량 표시 |
  | -b | 바이트 단위 실제 파일의 용량 표시 |
```bash
du -sh 파일명_or_폴더명
# 예시
du -sh ./test
du -sh ./test.js
```

## 자바 버전 바꾸기
```bash
# 현재 사용버전 조회
java --version

# 사용할 버전 변경
sudo update-alternatives --config java
# 위 명령어 입력 후, 나오는 목록에서 사용할 버전의 번호 입력 후 Enter(변경하지 않을 거면 빈칸인 상태에서 Enter)

# 자바 컴파일러 버전 확인
javac --version

# 사용할 버전 변경
sudo update-alternatives --config javac
# 사용법은 위와 동일
```

# Q&A
* sudo 명령어로 웹 서버를 실행하는 이유
<br>: 기본 포트 0 ~ 1024 를 이용하여 프로그램을 실행할 때 root 권한이 필요함