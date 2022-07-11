const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:4000',
            changeOrigin: true
        })
    );
};
/*
    changeOrigin : [boolean]
    - true = 이름 기반 가상 호스팅을 사용할 때 설정
*/