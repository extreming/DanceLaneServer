<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :inline="true" :model="searchForm" label-width="120px">
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="searchForm.name" @keyup.native.enter="goSearch(searchForm)" />
      </el-form-item>
      <el-form-item label="电话：" prop="phone">
        <el-input v-model="searchForm.phone" @keyup.native.enter="goSearch(searchForm)" />
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="goSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      stripe
      fit
      highlight-current-row
      header-row-class-name="tabel-header"
    >
      <el-table-column align="center" label="姓名" prop="name" width="95" />
      <el-table-column align="center" label="课程" prop="course" width="110" />
      <el-table-column align="center" label="电话" prop="phone" width="160" />
      <el-table-column align="center" label="年龄" prop="age" width="95" />
      <el-table-column label="性别" width="95" prop="sex" align="center">
        <template slot-scope="scope">
          {{ scope.row.sex === 'M' ? '男' : '女' }}
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="学校" prop="school" width="220" align="center" /> -->
      <el-table-column label="家长姓名" width="95" prop="parentsName" align="center" />
      <el-table-column label="家长电话" width="160" prop="parentsPhone" align="center" />
      <!-- <el-table-column label="与报名人关系" width="110" prop="relationship" align="center" /> -->
      <el-table-column label="状态" width="110" prop="status" align="center">
        <template slot-scope="scope">
          {{ scope.row.status | status }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="邮箱" prop="mail" width="160" align="center" />
      <el-table-column label="地址" prop="address" width="240" align="center" /> -->
      <el-table-column label="留言" prop="message" align="center" />
      <el-table-column label="报名时间" prop="createTime" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :itle="showDetail ? '详情' : '编辑'" :visible.sync="dialogFlag" width="40%">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px" :disabled="showDetail" inline>
        <el-form-item label="姓名"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="年龄"><el-input v-model="form.age" /></el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="M" />
            <el-option label="女" value="F" />
          </el-select>
        </el-form-item>
        <el-form-item label="课程">
          <el-select v-model="form.course" placeholder="请选择性别">
            <el-option label="少儿民族" value="1" />
            <el-option label="现代舞" value="2" />
            <el-option label="New Jazz" value="3" />
            <el-option label="Popping" value="4" />
            <el-option label="Breaking" value="5" />
            <el-option label="Locking" value="6" />
            <el-option label="House" value="7" />
          </el-select>
        </el-form-item>
        <el-form-item label="学校"><el-input v-model="form.school" style="width: 534px;" /></el-form-item>
        <el-form-item label="报名电话"><el-input v-model="form.phone" /></el-form-item>
        <el-form-item label="家长姓名"><el-input v-model="form.parentsName" /></el-form-item>
        <el-form-item label="与报名人关系">
          <el-select v-model="form.course" placeholder="请选择课程">
            <el-option label="父母" value="父母" />
            <el-option label="同学" value="同学" />
            <el-option label="朋友" value="朋友" />
            <el-option label="同事" value="同事" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>
        <el-form-item label="家长电话"><el-input v-model="form.parentsPhone" /></el-form-item>
        <el-form-item label="邮箱"><el-input v-model="form.mail" /></el-form-item>
        <el-form-item label="地址"><el-input v-model="form.address" /></el-form-item>
        <el-form-item label="留言"><el-input v-model="form.message" type="textarea" style="width: 534px;" /></el-form-item>
        <el-form-item label="报名时间"><el-input v-model="form.createTime" disabled="" /></el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="待沟通" value="0" />
            <el-option label="已分班" value="1" />
            <el-option label="待跟进" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="showEdit" label="处理备注" prop="desc"><el-input v-model="form.desc" type="textarea" style="width: 534px;" /></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFlag = false">取 消</el-button>
        <el-button type="primary" @click="changeApply">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getApply, updateApply } from '@/api/apply.js'
export default {
  filters: {
    status(val) {
      switch (val) {
        case '0':
          return '待沟通'
        case '1':
          return '已报名'
        default:
          return val
      }
    }
  },
  data() {
    const validateStatus = (rule, value, callback) => {
      if (value === '1' || value === '2') {
        callback()
      } else {
        callback(new Error('请更改报名表状态'))
      }
    }
    const validateName = (rule, value, callback) => {
      if (/^(?:[\u4e00-\u9fa5·]{2,16})$/.test(value) || value === '') {
        callback()
      } else {
        callback(new Error('请输入正确的姓名'))
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/.test(value) || value === '') {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    }
    return {
      listLoading: false,
      list: [],
      showDetail: false, // 详情标识
      showEdit: false, // 编辑标识
      form: {},
      rules: {
        status: [
          { validator: validateStatus, trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '处理备注不能为空', trigger: 'change' }
        ],
        name: [
          { validator: validateName, trigger: 'change' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'change' }
        ]
      },
      searchForm: {
        name: '',
        phone: ''
      }
    }
  },
  computed: {
    dialogFlag: {
      get() {
        return this.showDetail || this.showEdit
      },
      set(val) {
        if (val) {
          this.showDetail = this.showEdit = true
        } else {
          this.showDetail = this.showEdit = false
        }
      }
    }
  },
  mounted() {
    this.queryList()
  },
  methods: {
    queryList(params) {
      this.listLoading = true
      getApply(params).then(res => {
        this.list = res.data
        this.listLoading = false
      })
    },
    goSearch() {
      console.log(1)
      this.$refs.form.validate(valid => {
        if (valid) {
          this.queryList(this.searchForm)
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleDetail(index, row) {
      this.showDetail = true
      this.form = this.list[index]
      console.log(this.form)
    },
    handleEdit(index, row) {
      this.showEdit = true
      this.form = this.list[index]
      console.log(this.form)
    },
    changeApply() {
      if (this.showEdit) {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            const params = Object.assign(this.form, { id: this.form._id })
            updateApply(params).then(res => {
              this.$alert('处理报名表成功!').then(() => {
                this.dialogFlag = false
                this.queryList(this.searchForm)
              })
            })
          }
        })
      } else {
        this.showEdit = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.line{
  text-align: center;
}
.btn {
  margin-left: 60px;
}
/deep/ .tabel-header th {
  background: #11364b46 !important;
  color: #5d5f63 !important;
}
.el-input {
  width: 200px
}
</style>

