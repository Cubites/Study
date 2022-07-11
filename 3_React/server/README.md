# NodeJS
## 기본 셋팅
* package.json 생성
  * 방법 1. <code>npm init </code>
    <br>: package.json의 기본 값들 입력하고 생성
  * 방법 2. <code>npm init -y</code>
    <br>: 기본 값들을 전부 자동입력 처리
  > </pre>
* 기본 명령어
  * <code>npm install [package-name]</code> 
    <br>: 패키지 설치
  * <code>npm install [package-name] -s</code> 
    <br>: 설치하는 패키지를 package.json의 dependencies에 추가
    <br>> 단, npm5 버전 이후로는 --save 를 기본 옵션으로 적용
* package.json > script 실행방법
  * 방법1. <code>npm run [지정 명령어]</code>
  * 방법2. <code>yarn [지정 명령어]</code>
* nodemon
  * 설치 : <code>npm install nodemon -D</code>
  * -D : package.json 에 기록될 때 dependencies가 아니라 devDependencies에 기록됨
  * devDependencies : 개발할 때만 필요하고 실제 운영할 때는 필요없는 모듈들을 적어 놓은 것

## 예제 실행 시 추가 사항
* config > dev.js 파일 생성 후 아래 코드 입력
  > <pre>
  > module.exports = {
  >   mongoURI: 'mongoDB URI 입력'
  > }
  > </pre>