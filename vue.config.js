const path = require("path");
module.exports = {
  configureWebpack: {
    devtool: "source-map-inline",
    resolve: {
      alias: {
        "@": path.join(__dirname, "src/renderer/")
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      // Use this to change the entrypoint of your app's main process
      mainProcessFile: "src/server/background.js",
      // Use this to change the entry point of your app's render process. default src/[main|index].[js|ts]
      rendererProcessFile: "src/renderer/main.js",
      nodeIntegration: true
    }
  }
};
