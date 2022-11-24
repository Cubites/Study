* VirtualBox 7.0 기준 설명

# Virtualbox 가상환경 구축

### 가상환경 생성

* IOS Image 선택에서 Ubuntu 이미지 파일 선택(예: Ubuntu 22.04.1.iso)

### Ubuntu 설치

* 설치 과정 중 나오는 OpenSSL 설치 체크(후에 나오는 방화벽 창에서 방화벽 체크 후 확인)
    /> 호스트와 연결하기 위해 필요

# 호스트 - 게스트 공유 폴더

### 1. 대상 게스트의 설정 > 공유 폴더에 폴더 설정
* 폴더 경로: 호스트에서 공유할 폴더 경로
* 폴더 이름: virtualbox에서 공유할 폴더 (예: download)
* 마운트 지점: virtualbox에서 공유할 폴더 경로(폴더 명 포함) 
    (예: home/test/download)

### 2. 공유 폴더 설정에 필요한 모듈 설치
```bash
sudo apt-get update

# update : 설치 가능한 패키지 리스트를 최신화(설치된 패키지들을 업데이트하는 것이 아님. 실제 업데이트는 upgrade 명령어)

sudo apt-get install -y build-essential linux-headers-$(uname -r)

# build-essential : 프로그램 컴파일에 필요한 필수 패키지
# uname : 시스템 정보 출력(예: linux) , -r 옵션 : 커널의 릴리즈 정보를 출력
# linux-headers-버전번호-버전 : 리눅스 커널 헤더 파일 설치
#   >> 명령어에는 linux-headers-(uname -r)로 많이 사용됨

sudo apt-get install virtualbox-guest-utils

sudo adduser $(whoami) vboxsf
```

# virtualbox와 PuTTY 연결 방법
```bash
# 1. 게스트에서 다음 명령어 입력
ip addr
# 2. 나온 결과 중, enp0s3에 나온 inet 주소 기억

# 3. virtualbox 상단 메뉴에서 네트워크 > 만들기

# 4. 생성된 네트워크 IPv4 주소 확인

# 5. 게스트 설정 > 네트워크 > 어댑터 1 > Advanced > 포트 포워딩

# 6. 새 포트 포워딩 규칙 생성
# 호스트 IP : 4에서 확인한 IP
# 호스트 포트 : 22
# 게스트 IP : 2에서 확인한 IP
# 게스트 포트 : 22

# 7. PuTTY에서 호스트IP, 호스트 포트 입력 시 게스트 접근 가능
```

# VirtualBox에서 실행 중인 프로그램에 호스트에서 접속하는 방법
```bash
# 1. 앞의 5번과 동일한 곳 접근

# 2. 새 포트 포워딩 규칙 생성
# 호스트 IP: 앞의 6에서와 같은 IP 입력
# 호스트 포트 : 브라우저로 접속할 때 입력할 포트번호
# 게스트 IP : 앞의 6에서와 같은 IP 입력
# 게스트 포트 : 게스트에서 실행 중인 프로그램이 열려있는 포트

# 3. 호스트 컴퓨터에서 아무 브라우저의 주소 창에 "http://<호스트IP>:<호스트 포트>" 입력 시, 해당 프로그램에 접속 가능
```