# Cookie
## "같은 도메인"(Same-site)이란?
* 예시
  ```
    www.example.com이라는 사이트가 있는 경우
    도메인은 "example.com"을 의미함
    즉, "app.example.com", "web.example.com" 모두 같은 도메인

    만약, "example.com:80"과 "example.com:81"이 있다면 이는 다른 도메인임
    포트가 같아야 같은 도메인이기 때문
  ```

## Same-site 옵션
* 크로스 사이트 요청일 때 쿠키를 보낼지 말지 지정하는 설정
* 쉽게 말하면, 요청을 보낸 사이트와 받는 사이트가 같은 도메인일 때만 쿠키를 받게 할지 지정하는 설정

* 설정가능한 옵션 3가지
  * None: 크로스 사이트의 요청이어도 쿠키를 보내는 옵션
  * Lax: 몇 가지 경우를 제외하면, 크로스 사이트의 요청인 경우 쿠키를 보내지 않는 옵션
    * 제외 상황: 
      ```
        - <a> 태그 클릭을 통한 이동
        - window.location.replace를 통한 이동
        - 302 리다이렉트를 이용한 이동
        - Get 요청(서버의 상태를 바꾸지 않을 것으로 예측되는 요청)
      ```
  * Strict: 크로스 사이트의 요청인 경우, 절대 쿠키를 보내지 않는 옵션

* same-site: none 적용이 가능한 경우
  * 현재 Chrome 브라우저만 가능(다른 브라우저는 확인 필요)
    * 쿠키 옵션 중 하나인 "secure" 설정을 하면 "same-site: none"을 적용할 수 있음
    * secure: 보안 통신(https)인 경우에만 쿠키를 전송할 수 있게 해주는 옵션

## SameSite 관련 현황
* 현재 최신 Chromium 버전 - Chromium 111
* Chromium 엔진의 현황(2023-03-23일 기준)
  * 관련 사이트: https://www.chromium.org/updates/same-site/
  * 2020.02.04 - 크롬 80버전 배포. 이때 기본값이 Lax로 변경됨
  * 2021.03.18 - 크롬 91버전(2021.05.25 릴리즈)에서 chrome://flags에서 Same-site 기능을 비활성화 할 수 있었던 "cookies-without-same-site-must-be-secure" 플래그 삭제한다고 발표
    * 명령줄 플래그를 사용하여 same-site를 비활성화하는 방법이 있었음
      (https://piunikaweb.com/2021/06/14/google-chrome-flags-for-samesite-cookies-taken-away-after-update-v91/)
  * 2021.09.21 - 크롬 94버전(2021.09.21 릴리즈)에서 위 명령줄 플래그가 삭제되어 위 방법 사용 불가
    * 이 시점을 기준으로 Same-site 비활성화가 불가능해짐(lax, strict 중 택 1)
    * 즉, 이제 쿠키와 세션을 사용하려면 무조건 같은 도메인을 사용하거나 https 통신을 해야함
