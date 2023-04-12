const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // 👇️ make sure to update your target
      target: "https://whats-server.onrender.com",
      changeOrigin: true,
    })
  );
};
