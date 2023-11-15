const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    // express 모듈(use)을 사용한 미들웨어
    // '/api/server-practice'로 접속이 들어오면 4000번 포트로 연결 시킴
    app.use(
        '/api/server-practice',
        createProxyMiddleware({
            target: 'http://localhost:4000',
            changeOrigin: true
        })
    )
}