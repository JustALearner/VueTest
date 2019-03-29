<!--  -->
<template>
  <div class="pie"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
let echarts = require("echarts/lib/echarts");
// 引入组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
import ajaxHelper from "../../api/ajax-helper.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      name: "堆叠区域图",
      legends: [], //图例
      myChart: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: [
          "直接访问",
          "邮件营销",
          "联盟广告",
          "视频广告",
          "搜索引擎",
          "百度",
          "谷歌",
          "必应",
          "其他"
        ]
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
          name: "直接访问",
          type: "bar",
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "邮件营销",
          type: "bar",
          stack: "广告",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "bar",
          stack: "广告",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "bar",
          stack: "广告",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "搜索引擎",
          type: "bar",
          data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          markLine: {
            lineStyle: {
              normal: {
                type: "dashed"
              }
            },
            data: [[{ type: "min" }, { type: "max" }]]
          }
        },
        {
          name: "百度",
          type: "bar",
          barWidth: 5,
          stack: "搜索引擎",
          data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name: "谷歌",
          type: "bar",
          stack: "搜索引擎",
          data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
          name: "必应",
          type: "bar",
          stack: "搜索引擎",
          data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
          name: "其他",
          type: "bar",
          stack: "搜索引擎",
          data: [62, 82, 91, 84, 109, 110, 120]
        }
      ]
    };
    this.myChart = echarts.init(document.querySelector(".pie"));
    this.myChart.setOption(option);
    window.addEventListener(
      "resize",
      function() {
        this.myChart.resize();
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
.pie {
  height: 100%;
}
</style>
