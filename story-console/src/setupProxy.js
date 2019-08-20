const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/hub', {
    target: 'http://127.0.0.1:7002',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/hub": "/"
    },
    // cookieDomainRewrite: "http://localhost:3000"
  }));
};