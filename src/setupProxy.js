const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.openaq.org',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};