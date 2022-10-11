# HTTP 성공

## 시도 성공 1
### sites-available/.conf 파일
```bash
server {
        listen 80;
        listen 443 ssl;

        server_name commenter.link;

        location / {
                root /home/ec2-user/aws-test/client/build;
                index index.html index.htm;
                try_files $uri $uri/ /index.html/;
        }

        location /api/ {
                proxy_pass http://commenter.link:4000/api/;

                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;
                proxy_redirect off;
        }
}
```

### React
* http, IP로 요청
```javascript
const RequestServer = async () => {
    const url = process.env.REACT_APP_NODE_ENV === 'production' ? `http://${process.env.REACT_APP_AWS_IP}:4000/api/http` : '/api/http';
    console.log('url : ', url);
    console.log('HTTP 통신(IP)');
    try{
        const answer = await axios.post(url);
        console.log('data: ', answer.data.contents);
        setResponseHttp(answer.data.contents);
    }catch(err){
        console.log(err);
        setResponseHttp("HTTP 통신(IP) 에러");
    }
}
```

### Node 서버
* IP과 Domain Name 허용()
```javascript
let corsOptions = {
    origin: [
        'http://54.180.18.215',
        'http://commenter.link',
        'https://54.180.18.215',
        'https://commenter.link'
    ]
}

app.post('/api/http', cors(corsOptions), (req, res) => {
    console.log('req.url : ', req.url);
    res.status(200).send({success: true, contents: 'This is HTTP(IP) page'});
});

app.listen(app.get('port'), () => {
    console.log(`http에서 서버가 실행되었습니다.`);
});
```