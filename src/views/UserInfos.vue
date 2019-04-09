<template>
  <section>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline" v-model="formInline">
          <el-form-item :label="$t('form.name')">
            <el-input
              :placeholder="$t('form.name')"
              v-model="formInline.user.name"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.date')">
            <el-date-picker
              v-model="formInline.user.date"
              align="right"
              type="date"
              :placeholder="$t('form.select')"
              :picker-options="pickerOptions1"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('form.address')">
            <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="formInline.user.address"
            ></el-cascader>
          </el-form-item>
          <el-form-item :label="$t('form.place')">
            <el-select placeholder="Select" v-model="formInline.user.place">
              <el-option
                v-for="item in places"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery">{{
              $t("form.fetch")
            }}</el-button>
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          border
          style="width: 100%"
          v-loading="tableloading"
        >
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <!-- <el-table-column
            prop="date"
            label="日期"
            width="180"
          ></el-table-column>-->
          <el-table-column :label="$t('table.date')" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="name" label="姓名" width="180"></el-table-column> -->
          <el-table-column :label="$t('table.name')" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ $t("table.name") }}: {{ scope.row.name }}</p>
                <p>{{ $t("table.address") }}: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            :label="$t('table.place')"
          ></el-table-column>
          <el-table-column :label="$t('table.operation')">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >{{ $t("table.edit") }}</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >{{ $t("table.delete") }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top:30px;text-align:center">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :title="$t('table.edit')"
      :visible.sync="dialogFormVisible"
      :before-close="handleBeforeClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="$t('form.name')">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.address')">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.date')">
          <el-date-picker
            type="date"
            :placeholder="$t('form.select')"
            v-model="form.date"
            style="width: 100%;"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSave"
            v-loading="editLoading"
            >{{ $t("table.confirm") }}</el-button
          >
          <el-button @click="dialogFormVisible = false">{{
            $t("table.cancel")
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- <el-button type="text" @click="outerVisible = true"
      >点击打开外层 Dialog</el-button
    >

    <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
      <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body
      ></el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true"
          >打开内层 Dialog</el-button
        >
      </div>
    </el-dialog>-->
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
      form: {
        name: "",
        date: "",
        address: ""
      },
      //测试数据
      userData: [
        {
          date: "2016-05-02",
          name: "王小2",
          address: "上海市普陀区金沙江路 1518 弄",
          place: "深圳"
        },
        {
          date: "2016-05-04",
          name: "王小3",
          address: "上海市普陀区金沙江路 1517 弄",
          place: "深圳"
        },
        {
          date: "2016-05-01",
          name: "王小4",
          address: "上海市普陀区金沙江路 1519 弄",
          place: "深圳"
        },
        {
          date: "2016-05-03",
          name: "王小5",
          address: "上海市普陀区金沙江路 1516 弄",
          place: "深圳"
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
      tableData: [],
      tableloading: false,
      editLoading: false,
      dialogFormVisible: false,
      // outerVisible: false,
      // innerVisible: false,
      table_index: -1,
      currentPage: 2
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      this.table_index = index;
      console.log(this.form);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onQuery() {
      let o = this.userData.filter(
        t => t.name.indexOf(this.formInline.user.name) != -1
        // t.name.indexOf(this.formInline.user.date) &&
        // t.name.indexOf(this.formInline.user.address)
      );
      this.tableData = o;
      console.log(o);
    },
    handleSave() {
      this.$confirm("确认提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.editLoading = true;
          this.tableData.splice(this.table_index, 1, this.form);
          this.$message({
            type: "success",
            message: "save success!"
          });
          this.editLoading = false;
          this.dialogFormVisible = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "cancel"
          });
        });
    },
    handleBeforeClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
.el-row {
  padding: 5px;
}
.el-pagination {
  width: 200px;
}
</style>
