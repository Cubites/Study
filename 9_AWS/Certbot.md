# Let's Encrypt 설치

### 1. EPEL 다운
```bash
sudo wget -r --no-parent -A 'epel-release-*.rpm' http://dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/
```

### 2. 리포지토치 패키지 설치
```bash
sudo rpm -Uvh dl.fedoraproject.org/pub/epel/7/x86_64/Packages/e/epel-release-*.rpm
```

### 3. epel 활성화
```bash
sudo yum-config-manager --enable epel*
```

### 4. certbot 설치
```bash
sudo yum install -y certbot python2-certbot-apache
sudo yum install certbot-nginx
```

## Let's Encrypt 사용
### 1. nginx.conf 파일 수정
* sudo vi /etc/nginx/nginx.conf > server > server_name에 도메인 네임 입력

### 2. Let's Encrypt 실행
```bash
sudo certbot --nginx
```

### 3. Let's Encrypt 자동갱신
* /etc/crontab 파일 수정
```bash
<실행시간(분)> <실행시간(시)>, <실행시간(시)> * * * <명령 실행 권한> certbot renew --no-self-upgrade
# 예시
30 1, 13 * * * root certbot renew --no-self-upgrade
```

## 인증서 파일 위치
* /etc/letsencrypt/live/<도메인 네임> 위치에 있음