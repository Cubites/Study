# 샘플 프로젝트를 실행하기 위한 서버 환경 구성
### Node.js 설치
<pre>
# asdf 설치를 위해 yum 패키지 매니저로 Git 설치
$ sudo yum install git -y

# asdf를 GitHub에서 다운받고 설치
$ git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.9.0
$ echo . $HOME/.asdfasdf.sh >> ~/.bashrc

# 업데이트 된 bash shell의 설정 파일을 현재 터미널 세션에서 바로 사용할 수 있게 함
# 터미널 종료 후 다시 실행해도 됨
$ source ~/.bashrc

# asdf에 node.js 플러그인 추가
$ asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# asdf를 이용해 Node.js 16.14.0 버전을 설치하고 기본 버전으로 지정
$ asdf install nodejs 16.14.0
$ asdf global nodejs 16.14.0

# 설치한 Node.js 버전 확인
$ node -e "console.log(process.version)"
</pre>
