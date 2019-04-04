<!--  -->
<template>
  <div class="radar">
    <stheme @switchTheme="switchTheme"></stheme>
    <div class="main" id="radar"></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import stheme from "./charttheme";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
let echarts = require("echarts/lib/echarts");
// 引入组件
require("echarts/lib/chart/radar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { stheme },
  data() {
    //这里存放数据
    return {
      radarOption: {
        title: {
          text: "多雷达图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          x: "center",
          data: ["某软件", "某主食手机", "某水果手机", "降水量", "蒸发量"]
        },
        radar: [
          {
            indicator: [
              { text: "品牌", max: 100 },
              { text: "内容", max: 100 },
              { text: "可用性", max: 100 },
              { text: "功能", max: 100 }
            ],
            center: ["25%", "40%"],
            radius: 80
          },
          {
            indicator: [
              { text: "外观", max: 100 },
              { text: "拍照", max: 100 },
              { text: "系统", max: 100 },
              { text: "性能", max: 100 },
              { text: "屏幕", max: 100 }
            ],
            radius: 80,
            center: ["50%", "60%"]
          },
          {
            indicator: (function() {
              var res = [];
              for (var i = 1; i <= 12; i++) {
                res.push({ text: i + "月", max: 100 });
              }
              return res;
            })(),
            center: ["75%", "40%"],
            radius: 80
          }
        ],
        series: [
          {
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [
              {
                value: [60, 73, 85, 40],
                name: "某软件"
              }
            ]
          },
          {
            type: "radar",
            radarIndex: 1,
            data: [
              {
                value: [85, 90, 90, 95, 95],
                name: "某主食手机"
              },
              {
                value: [95, 80, 95, 90, 93],
                name: "某水果手机"
              }
            ]
          },
          {
            type: "radar",
            radarIndex: 2,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [
              {
                name: "降水量",
                value: [
                  2.6,
                  5.9,
                  9.0,
                  26.4,
                  28.7,
                  70.7,
                  75.6,
                  82.2,
                  48.7,
                  18.8,
                  6.0,
                  2.3
                ]
              },
              {
                name: "蒸发量",
                value: [
                  2.0,
                  4.9,
                  7.0,
                  23.2,
                  25.6,
                  76.7,
                  35.6,
                  62.2,
                  32.6,
                  20.0,
                  6.4,
                  3.3
                ]
              }
            ]
          }
        ]
      },
      radarChart: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    switchTheme(c) {
      this.radarChart.dispose();
      this.radarChart = echarts.init(document.getElementById("radar"), c);
      this.radarChart.setOption(this.radarOption);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.radarChart = echarts.init(document.querySelector(".radar .main"));
    this.radarChart.setOption(this.radarOption);
    window.addEventListener(
      "resize",
      function() {
        this.radarChart.resize();
      }.bind(this)
    );
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.radar {
  height: 100%;
}
.radar .main {
  height: 90%;
}
</style>
