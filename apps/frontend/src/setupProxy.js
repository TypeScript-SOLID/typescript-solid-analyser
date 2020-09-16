const { createProxyMiddleware } = require('../../../node_modules/http-proxy-middleware/dist/index');

module.exports = function (app) {
  app.use(
    '/api/v1/analyses',
    createProxyMiddleware({
      target: process.env.ANALYSES_SERVICE_URL,
      changeOrigin: true,
      logLevel: 'debug',
      ws: true,
      xfwd: true,
      pathRewrite: { '^/api/v1': '' },
    }),
  );
  app.use(
    '/api/v1/auth',
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE_URL,
      changeOrigin: true,
      logLevel: 'debug',
      xfwd: true,
      pathRewrite: { '^/api/v1': '' },
    }),
  );
  app.use(
    '/api/v1/repositories',
    createProxyMiddleware({
      target: process.env.REPOS_SERVICE_URL,
      changeOrigin: true,
      logLevel: 'debug',
      xfwd: true,
      pathRewrite: { '^/api/v1': '' },
    }),
  );
  app.use(
    '/api/v1/plugins',
    createProxyMiddleware({
      target: process.env.PLUGINS_SERVICE_URL,
      changeOrigin: true,
      logLevel: 'debug',
      xfwd: true,
      pathRewrite: { '^/api/v1': '' },
    }),
  );
};
