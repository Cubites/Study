## app 개발에 필요한 것
* nodejs
* cordova : <code>npm install -g cordova</code>로 설치 가능
* andtoid studio
* grandle : 빌드에 사용, 안드로이드 스튜디오와 같이 설치됨
* java 환경 변수 setting
  * 환경 변수 > 시스템 변수 > 다음 내용 등록 
    > 변수 이름 : JAVA_HOME
    > 변수 값 : C:\Program Files\Java\jdk1.8.0_202
  * 환경 변수 > 사용자변수 > path > 다음 내용 등록
    > %JAVA_HOME%\bin
* android studio 환경 변수 setting
  * 환경 변수 > 시스템 변수 > 다음 내용 등록 
    > 변수 이름 : ANDROID_HOME
    > 변수 값 : C:\Users\PC이름\AppData\Local\Android\Sdk
  * 환경 변수 > 사용자변수 > path > 다음 내용 등록
    > %ANDROID_HOME%\platform-tools

## App project 생성
* cordova 프로젝트 생성
  > <pre>
  > cordova create hello net-first.hello HelloWorld
  > cordova create 폴더명 패키지명 파일명
  > </pre>
* 앱 생성(aandroid, iso)
  > <pre>
  > cd hello
  > cocrdova platform add [android, ios]
  > </pre>
* 빌드
  > <pre>
  > cordova build [android, ios]
  > cordova emulate [android, ios]
  > cordova run [android, ios]

### App 생성 과정
1. 생성하려는 폴더로 이동
2. <code>cordova 폴더명 패키지명 파일명</code>
3. "폴더명" 안의 www에 만든 웹 프로젝트 넣기
4. "폴더명" 폴더 위치에서 <code>cordova platform add [android, ios];
5. android studio에서 platforms > android > app 폴더 열기
6. 가상 디바이스로 실행하여 제대로 동작하면 성공
* android 삭제 방법: "폴더명 위치에서 <code>cordova platform rm [android, ios]</code>
  * platform 폴더 안에 비어있는 것 확인

### 아이콘 변경 방법
1. "폴더명/android/app" 폴더를 android studio에서 열기
2. res 폴더에 마우스 우클릭 후 new > image asset 클릭

### Android Studio 정식판 앱 만드는법
* buile > Generate Signed Bundle / APK > Android App Bundle > (keystore가 없으면 keystore 등록 후)
* 비 정식 앱은 cmd에서 <code>cordova build android</code>를 하면 됨