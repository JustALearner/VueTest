<!--  -->
<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container editor-container"
  >
    <Editor :id="tinymceId" :init="init" />
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
import "tinymce/plugins/fullscreen";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Editor },
  data() {
    //这里存放数据
    return {
      // plugins: [
      //   "advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"
      // ],
      // toolbar: [
      //   "searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample",
      //   "hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"
      // ],
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      init: {
        body_class: "panel-body ",
        selector: `#${this.tinymceId}`,
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        height: 500,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false, //是否禁用“Powered by TinyMCE”
        menubar: this.menubar, //顶部菜单栏显示
        end_container_on_empty_block: true,
        powerpaste_word_import: "clean",
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: "square",
        advlist_number_styles: "default",
        imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
        default_link_target: "_blank",
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
        },
        init_instance_callback: editor => {
          if (this.value) {
            editor.setContent(this.value);
          }
          this.hasInit = true;
          editor.on("NodeChange Change KeyUp SetContent", () => {
            this.hasChange = true;
            this.$emit("input", editor.getContent());
          });
        },
        setup(editor) {
          editor.on("FullscreenStateChanged", e => {
            this.fullscreen = e.state;
          });
        }
      }
    };
  },
  props: {
    id: {
      type: String,
      default: function() {
        return (
          "vue-tinymce-" +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + "")
        );
      }
    },
    value: {
      type: String,
      default: ""
    },
    menubar: {
      type: String,
      default: "file edit insert view format table"
    },
    height: {
      type: Number,
      required: false,
      default: 360
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table wordcount fullscreen"
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat | fullscreen"
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || "")
        );
      }
    }
  },
  //方法集合
  methods: {
    initTinymce() {
      tinymce.init({});
    },
    destroyTinymce() {
      console.log(this.tinymceId);
      const tinymce = window.tinymce.get(this.tinymceId);
      console.log(tinymce);
      if (this.fullscreen) {
        tinymce.execCommand("mceFullScreen");
      }

      if (tinymce) {
        tinymce.destroy();
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initTinymce();
  },
  mounted() {
    console.log("mounted");
    // this.initTinymce();
  },
  deactivated() {
    console.log("deactivated");
    // this.destroyTinymce();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    console.log("destroyed");
    this.destroyTinymce();
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {
    console.log("activated");
    // this.initTinymce();
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
