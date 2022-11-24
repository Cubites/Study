## snap

* 패키지 버전 확인
```bash
sudo snap info 패키지명
```

## Wekan 설치
### 1. snap 설치
```bash
sudo apt update
sudo apt install snapd -y
```

### 2. wekan 설치
```bash
sudo snap install wekan
```

### 3. url과 포트번호 지정
```bash
snap set wekan root-url="http://<server-url>"
# <server-url> : url 혹은 ip 주소 입력

snap set wekan port="3001"
# 3001 이외 다른 포트번호를 사용해도 무관
```

### 4. wekan, mongodb 실행
```bash
sudo systemctl restart snap.wekan.mongodb
sudo systemctl restart snap.wekan.wekan
```

### 5. 실행 상태 확인
```bash
sudo systemctl status snap.wekan.mongodb
sudo systemctl status snap.wekan.wekan
```