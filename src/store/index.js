import Vue from "vue";
import Vuex from "vuex";
import tagsView from "./modules/tagsViews";
import lang from "./modules/lang";
import getters from "./getter";
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    tagsView,
    lang
  },
  getters

  // state: {
  //   openTab: [], //所有打开的路由
  //   activeIndex: "" //激活状态
  // },
  // mutations: {
  //   // 添加tabs
  //   add_tabs(state, data) {
  //     console.log("addtab:", data);
  //     this.state.openTab.push(data);
  //   },
  //   // 删除tabs
  //   delete_tabs(state, route) {
  //     let index = 0;
  //     for (let option of state.openTab) {
  //       if (option.route === route) {
  //         break;
  //       }
  //       index++;
  //     }
  //     this.state.openTab.splice(index, 1);
  //   },
  //   // 设置当前激活的tab
  //   set_active_index(state, index) {
  //     this.state.activeIndex = index;
  //   }
  // },
  // actions: {}
});
export default store;
