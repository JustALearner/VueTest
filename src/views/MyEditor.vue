<template>
  <div style="padding:5px">
    <!-- {{ msg }} -->
    <tinymce-editor
      ref="editor"
      v-model="msg"
      :disabled="disabled"
      @onClick="onClick"
    ></tinymce-editor>
    <!-- <button @click="clear">清空内容</button> -->
    <!-- <button @click="disabled = true">禁用</button> -->
  </div>
</template>

<script>
import TinymceEditor from "../components/mytiny";
export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      msg: "Welcome to Use Tinymce Editor",
      disabled: false
    };
  },
  mounted() {
    console.log("mounted");
    // this.initTinymce();
  },
  activated() {
    console.log("activated");
    // this.initTinymce();
  },
  deactivated() {
    console.log("deactivated");
    // this.destroyTinymce();
  },
  beforeDestroy() {
    console.log("destroyed");
    this.$refs.editor.destroyTinymce();
    // this.destroyTinymce();
  },
  methods: {
    // 鼠标单击的事件
    onClick(e, editor) {
      console.log("Element clicked");
      console.log(e);
      console.log(editor);
    }
    // 清空内容
    // clear() {
    //   this.$refs.editor.clear();
    // }
  }
};
</script>
