const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api', {
    target: 'http://192.168.13.196:8080',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    }
  }),
  proxy('/jg', {
    target: 'http://192.168.13.196:8080',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/jg": ""
    }
  }))
}