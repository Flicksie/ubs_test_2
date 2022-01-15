const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function proxyMiddleWare(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
    }),
  );
};
