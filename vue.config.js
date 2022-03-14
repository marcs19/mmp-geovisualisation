module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "https://mmp.acdh-dev.oeaw.ac.at/api",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
