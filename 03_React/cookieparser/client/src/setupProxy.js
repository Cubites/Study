const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        '/api/users/register',
        createProxyMiddleware({
            target: 'http://localhost:4000',
            changeOrigin: true
        })
    );
}