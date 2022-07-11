### Allow Function 사용 시 주의사항
* Allow Function은 Window를 Scope로 잡음
  <br>> Function은 해당 Function 내부로 Scope를 잡음

### yarn start가 보안 에러 나는 경우
1. PowerShell을 관리자 권한으로 실행
2. set-ExecutionPolicy Unrestricted
 > 되돌리는 법 : set-ExecutionPolicy restricted
 > 보안정책 확인방법 : get-ExecutionPolicy