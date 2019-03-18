<template>
  <section>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" v-model="formInline">
          <el-form-item label="姓名">
            <el-input
              placeholder="姓名"
              v-model="formInline.user.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="年份">
            <el-date-picker
              v-model="formInline.user.date"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="住址">
            <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="formInline.user.name"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-select placeholder="请选择" v-model="formInline.user.place">
              <el-option
                v-for="item in places"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="tableData" border style="width: 100%">
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <!-- <el-table-column
            prop="date"
            label="日期"
            width="180"
          ></el-table-column>-->
          <el-table-column label="日期" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="name" label="姓名" width="180"></el-table-column> -->
          <el-table-column label="姓名" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <p>住址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="修改个人信息" :visible="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading"
            >修改</el-button
          >
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import { Message, Loading } from "element-ui";
export default {
  data() {
    return {
      formInline: {
        user: {
          name: "",
          date: "",
          address: [],
          place: ""
        }
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      options: [
        {
          value: "guangdong",
          label: "广东",
          children: [
            {
              value: "shenzhen",
              label: "深圳",
              children: [
                {
                  value: "nanshan",
                  label: "南山"
                },
                {
                  value: "baoan",
                  label: "宝安"
                },
                {
                  value: "futian",
                  label: "福田"
                }
              ]
            }
          ]
        },
        {
          value: "guangxi",
          label: "广西",
          children: [
            {
              value: "guilin",
              label: "桂林",
              children: [
                {
                  value: "qixingqu",
                  label: "七星区"
                },
                {
                  value: "xiangshanqu",
                  label: "象山区"
                },
                {
                  value: "diecaiqu",
                  label: "叠彩区"
                }
              ]
            }
          ]
        }
      ],
      places: [
        { value: "guangxi", label: "广西" },
        { value: "guangdong", label: "广东" },
        { value: "hunan", label: "湖南" }
      ],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      editLoading: false,
      dialogFormVisible: false
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      this.table_index = index;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSave() {
      this.$confirm("确认提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.editLoading = false;
          this.dialogFormVisible = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
          this.editLoading = false;
          this.dialogFormVisible = false;
        });
    }
  }
};
</script>

<style scoped>
/* #userList {
  width: 100%;
  height: 100%;
  background-color: blue;
} */
</style>
