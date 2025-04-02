<template>
  <div class="app-container">
    <el-form ref="formRef" :model="formData" :rules="rules" size="default" label-width="100px">
      <el-form-item label="小程序标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入小程序标题" clearable :style="{width: '50%'}"></el-input>
      </el-form-item>
      <el-form-item label="小程序公告" prop="notice">
        <el-input v-model="formData.notice" type="textarea" placeholder="请输入小程序公告" clearable :style="{width: '50%'}" :autosize="{ minRows: 3, maxRows: 6 }"></el-input>
      </el-form-item>
      <el-form-item label="小程序id" prop="app_id">
        <el-input v-model="formData.app_id" placeholder="请输入小程序id" clearable :style="{width: '50%'}"></el-input>
      </el-form-item>
      <el-form-item label="小程序密钥" prop="app_secret">
        <el-input v-model="formData.app_secret" type="text" placeholder="请输入小程序密钥" clearable :style="{width: '50%'}"></el-input>
      </el-form-item>
      <el-form-item label="激励广告id" prop="adRewardsId">
        <el-input v-model="formData.adRewardsId" type="text" placeholder="请输入激励广告id" clearable :style="{width: '50%'}"></el-input>
      </el-form-item>
      <el-form-item label="banner广告id" prop="adBannerId">
        <el-input v-model="formData.adBannerId" type="text" placeholder="请输入banner广告id" clearable :style="{width: '50%'}"></el-input>
      </el-form-item>
      <el-form-item label="解析广告" prop="adParseStatus">
        <el-switch v-model="formData.adParseStatus" :active-value="'true'" :inactive-value="'false'"></el-switch>
      </el-form-item>
      <el-form-item label="下载广告" prop="adSaveStatus">
        <el-switch v-model="formData.adSaveStatus" :active-value="'true'" :inactive-value="'false'"></el-switch>
      </el-form-item>
      <el-form-item label="banner广告" prop="adBannerStatus">
        <el-switch v-model="formData.adBannerStatus" :active-value="'true'" :inactive-value="'false'"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { configRoutine, configRoutineSave } from "@/api/dou/config";
import { reactive } from "vue";
const { proxy } = getCurrentInstance();
const formRef = ref();
const data = reactive({
  formData: {
    title: "",
    notice: "",
    app_id: "",
    app_secret: "",
    adRewardsId: "",
    adBannerId: "",
    adParseStatus: "",
    adSaveStatus: "",
    adBannerStatus: "",
  },
  rules: {
    title: [
      {
        required: true,
        message: "请输入小程序标题",
        trigger: "blur",
      },
    ],
    app_id: [
      {
        required: true,
        message: "请输入小程序id",
        trigger: "blur",
      },
    ],
    app_secret: [
      {
        required: true,
        message: "请输入小程序密钥",
        trigger: "blur",
      },
    ],
    adRewardsId: [],
    adBannerId: [],
  },
});
const { formData, rules } = toRefs(data);
const originFormData = reactive([]);
const getConfigRoutine = () => {
  configRoutine().then((res) => {
    // 整理数据
    Object.assign(originFormData, res.data);
    // 使用 reduce 一次性转换数据
    formData.value = res.data.reduce((acc, item) => {
      const key = item.configKey.replace("routine.", ""); // 直接替换
      acc[key] = item.configValue;
      return acc;
    }, {});
  });
};
/**
 * @name: 表单提交
 * @description: 表单提交方法
 * @return {*}
 */
function submitForm() {
  formRef.value.validate((valid) => {
    if (!valid) return;
    // TODO 提交表单
    const dataArray = originFormData.map((item) => ({
      configId: item.configId,
      configKey: item.configKey,
      configValue: formData.value[item.configKey.replace("routine.", "")].trim(), // 直接从 formData 获取值
    }));

    configRoutineSave(dataArray).then((res) => {
      proxy.$modal.msgSuccess("保存成功");
    });
  });
}
/**
 * @name: 表单重置
 * @description: 表单重置方法
 * @return {*}
 */
function resetForm() {
  formRef.value.resetFields();
}
getConfigRoutine();
</script>
<style>
</style>
