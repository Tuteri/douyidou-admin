<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="原格式" prop="source">
        <el-input
          v-model="queryParams.source"
          placeholder="请输入原格式"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="现格式" prop="target">
        <el-input
          v-model="queryParams.target"
          placeholder="请输入现格式"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户id" prop="uid">
        <el-input
          v-model="queryParams.uid"
          placeholder="请输入用户id"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务名" prop="task">
        <el-input
          v-model="queryParams.task"
          placeholder="请输入任务名"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px">
        <el-date-picker
          v-model="daterangecreateTime"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" style="width: 308px">
        <el-date-picker
          v-model="daterangeUpdatedAt"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['dou:translate:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['dou:translate:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['dou:translate:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['dou:translate:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="translateList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" width="55"/>
      <el-table-column label="用户id" align="center" prop="uid" width="85"/>
      <el-table-column label="视频url" align="center" prop="url" show-overflow-tooltip />
      <el-table-column label="原格式" align="center" prop="source" />
      <el-table-column label="现格式" align="center" prop="target" />
      <el-table-column label="转码状态" align="center" prop="status" />
      <el-table-column label="任务名" align="center" prop="task" width="450"/>
      <el-table-column label="下载地址" align="center" prop="downloadUrl" width="650"/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['dou:translate:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['dou:translate:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改视频转码对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="translateRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="视频url" prop="url">
          <el-input v-model="form.url" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="原格式" prop="source">
          <el-input v-model="form.source" placeholder="请输入原格式" />
        </el-form-item>
        <el-form-item label="现格式" prop="target">
          <el-input v-model="form.target" placeholder="请输入现格式" />
        </el-form-item>
        <el-form-item label="用户id" prop="uid">
          <el-input v-model="form.uid" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="任务名" prop="task">
          <el-input v-model="form.task" placeholder="请输入任务名" />
        </el-form-item>
        <el-form-item label="下载地址" prop="downloadUrl">
          <el-input v-model="form.downloadUrl" placeholder="请输入下载地址" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Translate">
import { listTranslate, getTranslate, delTranslate, addTranslate, updateTranslate } from "@/api/dou/translate";

const { proxy } = getCurrentInstance();

const translateList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const daterangecreateTime = ref([]);
const daterangeUpdatedAt = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    url: null,
    source: null,
    target: null,
    uid: null,
    status: null,
    task: null,
    createTime: null,
    updatedAt: null
  },
  rules: {
    url: [
      { required: true, message: "视频url不能为空", trigger: "blur" }
    ],
    source: [
      { required: true, message: "原格式不能为空", trigger: "blur" }
    ],
    target: [
      { required: true, message: "现格式不能为空", trigger: "blur" }
    ],
    uid: [
      { required: true, message: "用户id不能为空", trigger: "blur" }
    ],
    status: [
      { required: true, message: "转码状态不能为空", trigger: "change" }
    ],
    task: [
      { required: true, message: "任务名不能为空", trigger: "blur" }
    ],
    createTime: [
      { required: true, message: "创建时间不能为空", trigger: "blur" }
    ],
    updatedAt: [
      { required: true, message: "更新时间不能为空", trigger: "blur" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询视频转码列表 */
function getList() {
  loading.value = true;
  queryParams.value.params = {};
  if (null != daterangecreateTime && '' != daterangecreateTime) {
    queryParams.value.params["begincreateTime"] = daterangecreateTime.value[0];
    queryParams.value.params["endcreateTime"] = daterangecreateTime.value[1];
  }
  if (null != daterangeUpdatedAt && '' != daterangeUpdatedAt) {
    queryParams.value.params["beginUpdateTime"] = daterangeUpdatedAt.value[0];
    queryParams.value.params["endUpdateTime"] = daterangeUpdatedAt.value[1];
  }
  listTranslate(queryParams.value).then(response => {
    translateList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    url: null,
    source: null,
    target: null,
    uid: null,
    status: null,
    task: null,
    downloadUrl: null,
    createTime: null,
    updatedAt: null
  };
  proxy.resetForm("translateRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  daterangecreateTime.value = [];
  daterangeUpdatedAt.value = [];
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加视频转码";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getTranslate(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改视频转码";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["translateRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateTranslate(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addTranslate(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除视频转码编号为"' + _ids + '"的数据项？').then(function() {
    return delTranslate(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('dou/translate/export', {
    ...queryParams.value
  }, `translate_${new Date().getTime()}.xlsx`)
}

getList();
</script>
