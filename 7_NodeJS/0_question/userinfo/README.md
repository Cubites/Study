# 문제
### /register 경로의 user.save((err, userInfo) => { ... })에서 userInfo가 무엇인가?
* /register 는 회원가입 기능의 경로이므로 회원가입에 필요한 정보인 name, email, password를 post로 보내봄
* userInfo 데이터를 터미널에 출력한 결과, mongoDB에 저장할 데이터가 출력되었음
* 결론 : userInfo는 save 메서드가 생성한 callback으로, mongoDB에 저장할 데이터를 가지고 있는 값을 생성함