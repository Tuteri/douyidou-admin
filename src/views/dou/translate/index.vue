<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="原格式" prop="source">
        <el-input v-model="queryParams.source" placeholder="请输入原格式" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="现格式" prop="target">
        <el-input v-model="queryParams.target" placeholder="请输入现格式" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="用户id" prop="uid">
        <el-input v-model="queryParams.uid" placeholder="请输入用户id" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="任务名" prop="task">
        <el-input v-model="queryParams.task" placeholder="请输入任务名" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px">
        <el-date-picker v-model="daterangecreateTime" value-format="YYYY-MM-DD" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" style="width: 308px">
        <el-date-picker v-model="daterangeUpdatedAt" value-format="YYYY-MM-DD" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete" v-hasPermi="['dou:translate:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['dou:translate:export']">导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="translateList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" width="55" />
      <el-table-column label="用户id" align="center" prop="uid" width="85" />
      <el-table-column label="视频url" align="center" prop="url" show-overflow-tooltip />
      <el-table-column label="原格式" align="center" prop="source" />
      <el-table-column label="现格式" align="center" prop="target" />
      <el-table-column label="转码状态" align="center" prop="status">
        <template #default="scope">
          <el-tag v-if="scope.row.status == 0" type="3" effect="dark" > 等待中 </el-tag>
          <el-tag v-else-if="scope.row.status == 1" type="1" effect="dark" > 转码中 </el-tag>
          <el-tag v-else-if="scope.row.status == 2" type="2" effect="dark" > 成功 </el-tag>
          <el-tag v-else-if="scope.row.status == 3" type="danger" effect="dark" > 失败 </el-tag>
          <el-tag v-else-if="scope.row.status == 4" type="danger" effect="dark" > 终止 </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="任务名" align="center" prop="task" width="350" />
      <el-table-column label="下载地址" align="center" prop="downloadUrl" width="550" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['dou:translate:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />

  </div>
</template>

<script setup name="Translate">
import { listTranslate, getTranslate, delTranslate } from "@/api/dou/translate";

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
    pageSize: 30,
    url: null,
    source: null,
    target: null,
    uid: null,
    status: null,
    task: null,
    createTime: null,
    updatedAt: null,
  },
});

const { queryParams } = toRefs(data);

/** 查询视频转码列表 */
function getList() {
  loading.value = true;
  queryParams.value.params = {};
  if (null != daterangecreateTime && "" != daterangecreateTime) {
    queryParams.value.params["begincreateTime"] = daterangecreateTime.value[0];
    queryParams.value.params["endcreateTime"] = daterangecreateTime.value[1];
  }
  if (null != daterangeUpdatedAt && "" != daterangeUpdatedAt) {
    queryParams.value.params["beginUpdateTime"] = daterangeUpdatedAt.value[0];
    queryParams.value.params["endUpdateTime"] = daterangeUpdatedAt.value[1];
  }
  listTranslate(queryParams.value).then((response) => {
    translateList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
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
  ids.value = selection.map((item) => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal
    .confirm('是否确认删除视频转码编号为"' + _ids + '"的数据项？')
    .then(function () {
      return delTranslate(_ids);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    "dou/translate/export",
    {
      ...queryParams.value,
    },
    `translate_${new Date().getTime()}.xlsx`
  );
}

getList();
</script>
