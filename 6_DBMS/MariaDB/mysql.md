# MySQL 명령어

## 터미널에서 접속
```bash
mysql -u root -p
# 그 뒤에 root 계정 비밀번호 입력
```

## 유저관련 명령어
```bash
# 유저 정보 조회
use mysql;
select user, host, password from user;

# 계정 생성
mysql> CREATE USER 'mycollab'@'localhost' IDENTIFIED BY 'password';

# 계정에 권한 부여(예 : 특정 DB에 대해 모든 권한 부여)
mysql> GRANT ALL PRIVILEGES ON DB명.* TO '아이디'@'localhost';

# 환경 설정의 변경 사항을 MySQL 재부팅 없이 적용
mysql> FLUSH PRIVILEGES;

# 계정 권한 조회
mysql> show grants for 아이디@localhost;

# mysql 나가기
mysql> exit;
```

