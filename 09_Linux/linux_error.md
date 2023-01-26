# 리눅스 에러

### The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 키이름
* PUBKEY를 추가하면 해결됨
```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <키이름>
```

## Warning

### Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), see the DEPRECATION section in apt-key(8) for details.
```bash
apt-key list

# 출력 결과 예시
--------------------
pub   rsa4096 2012-05-11 [SC]
      790B C727 7767 219C 42C8  6F93 3B4F E6AC C0B2 1F32
uid           [ unknown] Ubuntu Archive Automatic Signing Key (2012) <ftpmaster@ubuntu.com>

/etc/apt/trusted.gpg.d/ubuntu-keyring-2012-cdimage.gpg
------------------------------------------------------

# pub의 두번째 줄 마지막 8글자를 다음 명령어의 export 다음에 입력
sudo apt-key export C0B21F32 | sudo gpg --dearmour -o /etc/apt/trusted.gpg.d/teamviewer.gpg

# 경고문구 확인
apt update
```