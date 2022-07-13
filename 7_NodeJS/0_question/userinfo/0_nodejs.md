# NodeJS
## 외장 모듈
* 파일을 다루는 외장 모듈 path 메소드
  | 메소드 이름 | 설명 |
  | --- | --- |
  | join() | 여러 개의 이름들을 모두 합쳐 하나의 파일패스로 만듦 |
  | dirname() | 파일 패스에서 디렉터리 이름을 반환 |
  | basename() | 파일의 확장자를 제외한 이름을 반환 |
  | extname() | 파일의 확장자만 반환 |
* url 모듈의 메소드
  | 메소드 이름 | 설명 |
  | --- | --- |
  | parse() | 주소 문자열을 파싱해서 객체로 만듬 |
  | stringify() | 파라미터 객체를 문자열로 반환 |
  | format() | URL 객체를 주소 문자열로 반환 |

## 이벤트
* 비동기 방식으로 처리하기 위해 한 쪽에서 다른 쪽으로 데이터 전달
* EventEmitter 사용
* 한 쪽에서 이벤트를 emit으로 보내고 다른 쪽에서 리스너를 등록하여 on으로 받음
* Javascript 이벤트와 NodeJS 이벤트의 차이
  * JS : UI에 일어나는 일을 이용해 발생됨 => UI가 있어야 됨
  * NodeJS : 서버의 개념에서의 event라 파일과 파일 사이에 발생
* 메소드
  | 메소드 이름 | 설명 |
  | --- | --- |
  | on(event, listner) | 지정한 이벤트의 리스너를 추가 |
  | once(event, listner) | 지정한 이벤트의 리스너를 추가하지만 한 번 실행한 후에는 자동으로 리스너가 제거 됨 |
  | removeListner(event, listner) | 지정한 이벤트에 대한 리스너를 제거 |
  | emit(event, param) | 이벤트를 전송 |

## package.json
### dependencies 와 devDependencies 의 차이
* dependencies는 실행에 필요한 모듈들 표시
* devDependencies도 실행에 필요한 모듈이지만 개발 단계에서 필요한 모듈(배포 시, 필요 X)
* 배포할 시 빌드 작업을 간소화 하기 위해, 개발 단계에만 필요하고 배포 시에는 필요없는 모듈들을 devDependencies에 적음
* <code>npm install 모듈 -D</code>로 적으면 devDependencies에 기록됨