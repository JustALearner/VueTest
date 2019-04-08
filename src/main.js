import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/styles/inedex.css";
import "./assets/styles/reset.css";
Vue.config.productionTip = false;
// const HOST = process.env.HOST;
// const PORT = process.env.PORT && Number(process.env.PORT);
import "echarts/theme/roma";
import "echarts/theme/macarons";
import "animate.css";
// console.log(process.env.VUE_APP_TITLE);
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
