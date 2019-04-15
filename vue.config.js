// const HOST = process.env.HOST;
// const PORT = process.env.PORT && Number(process.env.PORT);
const db = require("./public/db");
const jsonServer = require("json-server");
const apiServer = jsonServer.create();
const apiRouter = jsonServer.router(db);
const middlewares = jsonServer.defaults();

apiServer.use(middlewares);
apiServer.use(apiRouter);

apiServer.listen(3334, () => {
  console.log("JSON Server is running");
});
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // publicPath: "/app",
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  devServer: {
    proxy: {
      "/api": {
        target: "https://localhost:3334/", //对应自己的接口
        pathRewrite: {
          "^/api": "/api"
        },
        changeOrigin: true,
        ws: true
      }
    }

    // before: function(app) {
    //   //可请求   api/data
    //   app.get("/api/data", function(req, res) {
    //     console.log(appData);
    //     res.json({
    //       code: 0,
    //       data: appData
    //     });
    //   });
    // }
    // before(app) {
    //   app.get("/api", function(req, res) {
    //     res.json({
    //       msg: "success",
    //       data: {
    //         // all
    //       }
    //     });
    //   });
    // }
  },
  chainWebpack: config => {
    // config.resolve.alias.set("@", resolve("src"));
    // config.module.rules.delete("svg");
    config.module
      .rule("svg-smart")
      .test(/\.svg$/)
      .include.add(resolve("src/icons/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "[name]"
      });
    config.module
      .rule("svg-smart")
      .use("svgo")
      .loader("svgo-loader")
      .options({
        plugins: [
          // 还有很多配置，具体可以查看https://github.com/svg/svgo
          {
            removeViewBox: false
          },
          {
            removeXMLNS: true
          }
        ]
      });
    config.module.rule("svg").exclude.add(resolve("src/icons/svg"));
  }
};
