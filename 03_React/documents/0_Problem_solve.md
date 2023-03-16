### Allow Function 사용 시 주의사항
* Allow Function은 Window를 Scope로 잡음
  <br>> Function은 해당 Function 내부로 Scope를 잡음

### yarn start가 보안 에러 나는 경우
1. PowerShell을 관리자 권한으로 실행
2. set-ExecutionPolicy Unrestricted
 > 되돌리는 법 : set-ExecutionPolicy restricted
 > 보안정책 확인방법 : get-ExecutionPolicy

### react-router-dom을 사용했을 때 index 위치가 아닌 페이지에서 새로고침 시, 404에러가 발생하는 경우
* 원인
  * npm start 상태가 아닌 웹 서버(nginx, apache, IIS 등)에서 발생하는 에러
  * index가 아닌 다른 페이지로 넘어가면 주소에 "/path"처럼 경로가 추가됨
  * 하지만 React는 겉보기에는 여러 페이지로 이루어져 보이지만, 사실 하나의 페이지임
  * 즉, 모든 페이지의 경로는 "/"(index.html)인데 새로고침을 하면 다른 경로에 요청을 보내니 에러가 발생
* 해결방법
  * React 프로젝트를 build하고 난 후, web.config라는 파일이 생성되는데 이곳에 아래의 코드를 입력하면 됨
    ```html
      <?xml version="1.0" encoding="UTF-8"?>
      <configuration>
      <system.webServer>
      <rewrite>
          <rules>
          <rule name="ReactRouter Routes" stopProcessing="true">
              <match url=".*" />
              <conditions logicalGrouping="MatchAll">
              <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
              <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
              <add input="{REQUEST_URI}" pattern="^/(docs)" negate="true" />
              </conditions>
              <action type="Rewrite" url="index.html" />
          </rule>
          </rules>
      </rewrite>
      </system.webServer>
      </configuration>
    ```