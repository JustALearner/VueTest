<!--  -->
<template>
  <div class="line">
    <stheme @switchTheme="switchTheme"></stheme>
    <div id="line" class="main"></div>
  </div>
</template>

<script>
import stheme from "./charttheme";
import axios from "axios";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入组件

require("echarts/lib/chart/line");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
import ajaxHelper from "../../api/ajax-helper.js";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { stheme },
  data() {
    //这里存放数据
    return {
      name: "堆叠区域图",
      legends: [], //图例
      myChart: {},
      weatherIcons: {},
      lineSeries: [],
      lineOption: {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: []
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {}
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            " name": "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: {
              normal: {}
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      themeJson: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getData() {
      // axios.get(config.dynamicDomain+url, {
      // ajaxHelper.get("api/line").then(
      //   res => {
      // console.log("开始加载数据", res);
      // this.lineSeries = res;
      // console.log("数据返回成功", this.lineSeries);
      this.myChart = echarts.init(
        document.querySelector(".line .main"),
        "macarons"
      );
      let temp = [];
      temp = this.lineSeries.map(item => {
        return item.name;
      });
      // console.log("准备legend数据", temp);
      this.lineOption.legend.data = temp;
      this.lineOption.series = this.lineSeries;
      this.myChart.setOption(this.lineOption);
      // console.log("option1", this.lineOption);

      window.addEventListener(
        "resize",
        function() {
          this.myChart.resize();
        }.bind(this)
      );
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
    },
    switchTheme(c) {
      this.myChart.dispose();
      this.myChart = echarts.init(document.getElementById("line"), c);
      this.myChart.setOption(this.lineOption);

      // axios.get("api/" + c).then(
      //   res => {
      //     // this.themeJson = JSON.parse(res);
      //     console.log("themejson", res);
      //     echarts.registerTheme("qq", res);
      //     this.myChart = echarts.getInstanceByDom(
      //       document.querySelector(".line .main")
      //     );
      //     let option = this.myChart.getOption();
      //     console.log("当前chart实例 ", this.myChart);

      //     this.myChart.dispose();
      //     this.myChart = echarts.init(document.querySelector(".line .main"), c);
      //     console.log("新chart实例 ", this.myChart);
      //     this.myChart.setOption(option);
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getData();
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
.line {
  height: 100%;
}
.line .main {
  height: 90%;
}
</style>
