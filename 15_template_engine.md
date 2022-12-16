# 템플릿 엔진
* 웹 템플릿 엔진 : 지정된 템플릿 양식과 데이터를 합쳐 HTML로 출력해주는 소프트웨어
* 종류 : pug(구 jade), ejs 등

## 적용 방법
### Node Server
```javascript
// 위치: 프로젝트 app.js 파일(최상위 위치)
// 랜더링에 사용되는 파일이 있는 폴더 지정
app.set('views', path.join(__dirname, 'views'));

// 화면 engine을 ejs로 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
```

### HTML
* 일반적인 HTML 파일처럼 작성하면 적용됨