<!--  -->
<template>
  <div class="tinymce-editor">
    <editor
      v-model="myValue"
      :init="init"
      :disabled="disabled"
      @onClick="onClick"
    ></editor>
    <button @click="clear">清空</button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Editor },
  data() {
    //这里存放数据
    return {
      init: {
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        height: 500,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false, //是否禁用“Powered by TinyMCE”
        menubar: false, //顶部菜单栏显示
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
        }
      },
      myValue: this.value
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table wordcount"
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat"
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    }
  },
  //方法集合
  methods: {
    initTinymce() {
      tinymce.init(this.init);
    },
    destroyTinymce() {
      console.log(123);
      if (tinymce) {
        tinymce.destroy();
      }
    },
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = "";
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    tinymce.init({});
    // window.tinymce.baseURL = "/tinymce";
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
<style scoped></style>
