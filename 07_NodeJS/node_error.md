# Node Error
### Postman으로 node 서버에 접속 시도 시 무한로딩
* 다음 내용들이 제대로 작성되어 있는지 확인
```javascript
const express = require('express');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
```
* 원인 : <code>app.use(cookieParser());</code>가 아니라 <code>app.use(cookieParser);</code>라고 적혀 있었음