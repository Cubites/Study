# 샘플 프로젝트를 실행하기 위한 서버 환경 구성
<pre>
# asdf 설치를 위해 yum 패키지 매니저로 Git 설치
$ sudo yum install git -y

# asdf를 GitHub에서 다운받고 설치
$ git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.9.0
$ echo . $HOME/.asdfasdf.sh >> ~/.bashrc