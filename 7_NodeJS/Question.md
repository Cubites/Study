# Solution
## 1. npm install 모듈 --save 에서 --save는 왜 붙이는가?
* 모듈을 설치하면서 package.json 파일의 dependencies(의존성 모델) 목록에 넣기 위해서 붙임
* 단 npm 6 버전 이상부터는 --save가 default로 되어있어 굳이 붙일 필요 없음

## 2. /register 경로의 user.save((err, userInfo) => { ... })에서 userInfo가 무엇인가?
* /register 는 회원가입 기능의 경로이므로 회원가입에 필요한 정보인 name, email, password를 post로 보내봄
* userInfo 데이터를 터미널에 출력한 결과, mongoDB에 저장할 데이터가 출력되었음
* 결론 : userInfo는 save 메서드가 생성한 callback으로, mongoDB에 저장할 데이터를 가지고 있는 값을 생성함

# Question
## 1. userSchema.methods 와 userSchema.statics 의 차이
* method => 객체의 인스턴스를 만들어야만 사용이 가능
* static => 객체의 인스턴스를 만들지 않아도 사용 가능
* 링크 : https://www.inflearn.com/questions/30860
* https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/lecture/37074?tab=curriculum&q=30860

## 2. Javscript 에서의 this


# Information
## 1. 객체(object)를 console.log() 로 출력하는 경우, 복사가 아닌 "참조"가 일어남
* 예 : 아래 코드를 브라우저 콘솔에서 실행
  > <pre>
  > let obj = {};
  > console.log(obj.length);
  > obj.a = 1;
  > console.log(obj.length);
  > </pre>
* 최종 결과는 두 console.log 모두 같은 값인 {a: 1}이 된다.
  * 이유: console.log()는 참조를 하므로 <code>obj.a = 1</code>을 하기 전에 출력을 했더라도 그 후에 object가 변경되면 그 변경을 따라감
  * 해결책: 객체가 아닌 값을 출력하면 됨(예: arr의 경우 arr.length와 같은 값을 출력하면 됨)