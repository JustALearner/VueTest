// const express = require("express");
// const app = express();
// var appData = require("./public/mock/db.json");
// var all = appData.all;

// var apiRoutes = express.Router();

// app.use("/api", apiRoutes);
// const HOST = process.env.HOST;
// const PORT = process.env.PORT && Number(process.env.PORT);

const jsonServer = require("json-server");
const apiServer = jsonServer.create();
// var appData = require("./public/mock/db.json");
// var all = appData.all;
const apiRouter = jsonServer.router("./public/mock/db.json");
const middlewares = jsonServer.defaults();

apiServer.use(middlewares);
apiServer.use(apiRouter);

apiServer.listen(3334, () => {
  console.log("JSON Server is running");
});

module.exports = {
  // publicPath: "/app",
  baseUrl: process.env.NODE_ENV === "production" ? "./" : "/",
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3334/", //对应自己的接口
        pathRewrite: {
          "^/api": ""
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
  }
};
