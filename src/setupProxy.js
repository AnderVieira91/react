const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://192.168.5.125:48080",
            changeOrigin: true
        }),
    );
};