import axios from "axios";
import router from "../router"; //配置路由的文件
import { Loading, Message } from "element-ui";
/****** 创建axios实例 ******/
const Axios = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 5000, // 请求超时时间
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    "Content-Type": "application/json;charset=utf-8"
  }
});
var loadinginstace;
//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // console.log("开始请求", config);

    // 在发送请求之前做某件事
    if (config.method === "post") {
      // 序列化
      // config.data = qs.stringify(config.data);
      // config.data = JSON.stringify(config.data);
      //能直接接受json 格式,可以不用 qs 来序列化的
    }

    // 若是有做鉴权token , 就给头部带上token
    // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
    // if (localStorage.token) {
    //   config.headers.Authorization = localStorage.token;
    // }
    return config;
  },
  error => {
    // error 的回调信息

    Message.error({
      message: "加载超时"
    });

    return Promise.reject(error);
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    //对响应数据做些事
    // if (res.data && !res.data.success) {
    //   return Promise.reject(res.data.error);
    // }
    // console.log("response", res.data);
    Message.success({
      message: "成功返回"
    });

    return res;
  },
  error => {
    // console.log(error);

    Message.error({
      message: "加载失败"
    });
    if (error.data) {
      switch (error.data.code) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // store.commit("del_token");
          router.push({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
      }
    }
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    // if (!window.localStorage.getItem("token")) {
    //   // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
    //   this.$router.push({
    //     path: "/login"
    //   });
    // } else {
    //   // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
    //   // 乖乖的返回去登录页重新登录
    //   let lifeTime =
    //     JSON.parse(window.localStorage.getItem("token")).lifeTime * 1000;
    //   let nowTime = new Date().getTime(); // 当前时间的时间戳
    //   console.log(nowTime, lifeTime);
    //   console.log(nowTime > lifeTime);
    //   if (nowTime > lifeTime) {
    //     Message({
    //       showClose: true,
    //       message: "登录状态信息过期,请重新登录",
    //       type: "error"
    //     });
    //     this.$router.push({
    //       path: "/login"
    //     });
    //   } else {
    //     // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
    //     // if (error.response.status === 403) {
    //     //     this.$router.push({
    //     //         path: "/error/403"
    //     //     });
    //     // }
    //     // if (error.response.status === 500) {
    //     //     this.$router.push({
    //     //         path: "/error/500"
    //     //     });
    //     // }
    //     // if (error.response.status === 502) {
    //     //     this.$router.push({
    //     //         path: "/error/502"
    //     //     });
    //     // }
    //     // if (error.response.status === 404) {
    //     //     this.$router.push({
    //     //         path: "/error/404"
    //     //     });
    //     // }
    //   }
    // }
    // 返回 response 里的错误信息
    // let errorInfo = error.data.error ? error.data.error.message : error.data;
    // return Promise.reject(errorInfo);error.response.data
    return Promise.reject(error);
  }
);

export default {
  get: function(url, data) {
    return new Promise(function(resolve, reject) {
      Axios.get(url, {
        params: data
      })
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
          reject(error);
        });
    });
  },
  post: function(url, data) {
    return new Promise(function(resolve, reject) {
      // axios.post(config.dynamicDomain+url, data).then(function (response) {
      Axios.post(url, data)
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
          reject(error);
        });
    });
  },
  put: function(url, data) {
    return new Promise(function(resolve, reject) {
      // axios.post(config.dynamicDomain+url, data).then(function (response) {
      Axios.put(url, data)
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
          reject(error);
        });
    });
  }
};
