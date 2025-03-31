<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入id"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台" prop="platform">
        <el-input
          v-model="queryParams.platform"
          placeholder="请输入平台"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['dou:parse:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['dou:parse:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="parseList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id"  width="55"/>
      <el-table-column label="用户id" align="center" prop="uid"  width="80"/>
      <el-table-column label="视频地址" align="center" prop="url" show-overflow-tooltip />
      <el-table-column label="Hash" align="center" prop="urlHash"  show-overflow-tooltip />
      <el-table-column label="视频类型" align="center" prop="type" show-overflow-tooltip />
      <el-table-column label="视频地址" align="center" prop="video" show-overflow-tooltip />
      <el-table-column label="音频地址" align="center" prop="audio" show-overflow-tooltip />
      <el-table-column label="图片地址" align="center" prop="images" show-overflow-tooltip />
      <el-table-column label="封面地址" align="center" prop="cover"  show-overflow-tooltip />
      <el-table-column label="文案" align="center" prop="text" show-overflow-tooltip />
      <el-table-column label="平台" align="center" prop="platform" />
      <el-table-column label="解析时间" align="center" prop="createTime" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['dou:parse:remove']">删除</el-button>
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
  </div>
</template>

<script setup name="Parse">
import { listParse, delParse } from "@/api/dou/parse";

const { proxy } = getCurrentInstance();

const parseList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    id: null,
    platform: null,
  },
});

const { queryParams } = toRefs(data);

/** 查询视频解析记录列表 */
function getList() {
  loading.value = true;
  listParse(queryParams.value).then(response => {
    parseList.value = response.rows;
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
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}


/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除视频解析记录编号为"' + _ids + '"的数据项？').then(function() {
    return delParse(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('dou/parse/export', {
    ...queryParams.value
  }, `parse_${new Date().getTime()}.xlsx`)
}

getList();
</script>
