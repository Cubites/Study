# 메일 서버
## 설명
### 용어
* SMTP 릴레이(relay) : 메일 서버 외부에서 메일 서버를 경유하여 다른 메일 서버로 메일을 보내는 것

#### 프로토콜
* IMAP : 서버에서 이메일을 읽는 프로토콜
* POP3 : 사용자의 기기로 이메일을 다운로드하여 읽는 프로토콜
  <br>> 다운로드한 내용은 서버에서 삭제됨

### 관련 패키지
* sendmail, postfix, Exim4

### 그 외
* 시중에 운영되는 메일 서버를 가져다 사용하려면 서버 주소, 포트, 누군가의 계정 정보가 필수로 필요함
  <br>> 개인 계정을 사용하지 않으려면 메일 서버를 직접 구축해야함

## 메일 전송 테스트
```
telnet localhost 25
```

## Postfix
* 구축 가이드 : https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postfix-on-ubuntu-22-04

```bash
sudo apt update

# postfix 설치 및 환경변수 지정
sudo DEBIAN_PRIORITY=low apt install postfix

# postfix 설치 중, 설정
## General type of mail configuration >> Internet Site
## System mail name >> 메일 이름(예: mail.example.com, example.com 등)
## Root and postmaster mail recipient >> 메일을 보낼 리눅스 계정. 사용하는 리눅스 사용자 이름 입력
## Other destinations to accept mail for >> 수신할 도메인 목록. 추가할게 없으면 기본값 사용
## Force synchronous updates on mail queue? >> No 선택
## Local networks >> 메일 서버가 메시지를 릴레이할 수 있게 구성할 네트워크 목록. 기본값 입력
## Mailbox size limit >> 메시지 크기 제한. "0"으로 하면 비활성화 됨
## Local address extension character >> 주소의 일반 부분과 확장자를 구분하는 기호. 기본값은 "+"
## Internet protocols to use >> 사용할 인터넷 프로토콜. "all" 선택

# 위 설정을 수정하고 싶은 경우 아래 명령어 입력
sudo dpkg-reconfigure postfix

# 메일을 저장할 폴더 지정
sudo postconf -e 'home_mailbox= Maildir/'

# 리눅스 계정과 이메일 계정을 mapping할 테이블 위치 지정
sudo postconf -e 'virtual_alias_maps= hash:/etc/postfix/virtual'

# 이메일을 받을 이메일 계정 작성
sudo vi /etc/postfix/virtual
# 아래 2줄은 예시
contact@example.com [리눅스 사용자명]
admin@example.com [리눅스 사용자명]

# 설정 저장
sudo postmap /etc/postfix/virtual

# postfix 재시작
sudo systemctl restart postfix

# 방화벽 설정
sudo ufw allow Postfix


echo 'export MAIL=~/Maildir' | sudo tee -a /etc/bash.bashrc | sudo tee -a /etc/profile.d/mail.sh

# 변경 사항 적용
source /etc/profile.d/mail.sh

# s-nail 설치
sudo apt install s-nail

# s-nail 편집
sudo nano /etc/s-nail.rc
# 마지막에 다음 3줄 추가
set emptystart
set folder=Maildir
set record=+sent
```

### 이메일 전송 테스트
```bash
# 현재 위치에 있는 파일(~/test_message) 내용을 user@email.com에게 메일로 보냄
# 제목은 'Test email subject line', 보낸 사람은 contact@example.com
cat ~/test_message | s-nail -s 'Test email subject line' -r contact@example.com user@email.com

# "반드시" 관리자 권한(sudo)가 아닌 서버 사용자 권한 상태에서 위 명령어 실행
```
* 회사 메일로는 보내지나(스팸 메일함), gmail과 네이버에는 보내지지 않음

## SASL 설정
```bash
# 필요한 라이브러리 설치
apt install libsasl2-modules sasl2-bin

# 5개의 파일 수정 필요
## 10-auth : 접속 권한(SMTP 사용을 위해 로그인 접속 권한 추가 필요)
## 10-mail : 메일에 대한 설정(예: 메일함 위치 지정)
## 10-master : dovecot 설정(예: pop3 포트, ssl 사용 여부 등)
## 1-ssl : SSL 설정(예: ssl 사용 여부, ssl 인증서 등록 등)
```


## Youtrack에 Postfix 메일 서버 적용

### 필요한 설정
| 설정명 | 내용 | 필수 여부 |
| :---: | --- | :---: |
| 서버 주소 | 메일 서버 주소(예:192.168.56.1) | 필수 |
| 서버 포트 | 메일 서버 포트<br/>기본 포트는 25<br>465, 587이 아니어서 에러가 발생할 수도 있음 | 필수 |
| 메일 프로토콜 | postfix는 SMTP | 필수 |
| 사용자 이름 | 외부 메일 서버 사용 시(예: gmail) 구글 계정 정보 입력 | 외부 메일 서버는 필수 |
| 비밀번호 | 외부 메일 서버 사용 시(예: gmail) 계정 비밀번호 입력<br>(구글은 앱 비밀번호 생성 후, 입력) | 외부 메일 서버는 필수 |
| SSL 키 | [파악중] | 선택 |
| 주소에서 | 메일을 보낸 사람에 들어가는 이름 | 필수 |
| 회신 주소 | [파악중] | 선택 |


