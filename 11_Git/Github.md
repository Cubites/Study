# 11. Github

## Git
* <code>git init</code> : git에 업로드하기 위해 파일들을 임시 저장소에 저장
* <code>git status</code>
* <code>git add</code> : Staging Area에 파일을 올림
  * staging area : git에 파일을 올리기전에 임시로 있는 공간
  * add한 후 파일을 지우는 방법
    <br>> <code>git rm --cached [폴더 이름] -r</code>
* <code>git commit -m [문구]</code> : git에 업로드하고, 업로드 설명에 [문구]가 기록됨
* <code>git push</code>

## git & github
* git: 소스 코드의 버전을 관리할 수 있는 도구
* github: git을 사용하여 만들어진 클라우드 서비스

## 오류
### github desktop에서 파일이 있음에도 폴더 내에 파일을 인식하지 못하는 문제
* 해당 폴더 안에 .git 폴더를 삭제하면 해결됨

### 이미 업로드한 파인에 .gitignore 적용방법
 * 터미널에 <code>git rm -r --cached</code> 입력
  <br>> git 캐시를 지움