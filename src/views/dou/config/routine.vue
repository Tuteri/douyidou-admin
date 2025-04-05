<template>
  <div class="app-container">
    <el-form ref="formRef" :model="formData" :rules="rules" size="default" label-width="200px">
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

      <el-form-item label="解析广告" prop="adParseStatus">
        <template #label>
          <span>解析广告
            <el-tooltip :content="objectFormData.adParseStatus.remark || objectFormData.adParseStatus.configName" placement="bottom" effect="light" v-if="objectFormData.adParseStatus">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </span>
        </template>
        <el-switch v-model="formData.adParseStatus" :active-value="'true'" :inactive-value="'false'"></el-switch>
      </el-form-item>
      <el-form-item label="下载广告" prop="adSaveStatus">
        <template #label>
          <span>下载广告
            <el-tooltip :content="objectFormData.adSaveStatus.remark || objectFormData.adSaveStatus.configName" placement="bottom" effect="light" v-if="objectFormData.adSaveStatus">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </span>
        </template>
        <el-switch v-model="formData.adSaveStatus" :active-value="'true'" :inactive-value="'false'"></el-switch>
      </el-form-item>

      <template v-if="formData.adParseStatus=='true' || formData.adSaveStatus=='true'">
        <el-form-item label="激励广告id" prop="adRewardsId">
          <el-input v-model="formData.adRewardsId" type="text" placeholder="请输入激励广告id" clearable :style="{width: '50%'}"></el-input>
        </el-form-item>
        <el-form-item label="广告间隔时长" prop="adRewardInterval">
          <template #label>
            <span>广告间隔时长
              <el-tooltip :content="objectFormData.adRewardInterval.remark || objectFormData.adRewardInterval.configName" placement="bottom" effect="light" v-if="objectFormData.adRewardInterval">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </span>
          </template>
          <el-input-number v-model="formData.adRewardInterval" :min="0" :max="100000000"></el-input-number>
        </el-form-item>
      </template>
      <el-form-item label="banner广告" prop="adBannerStatus">
        <el-switch v-model="formData.adBannerStatus" :active-value="'true'" :inactive-value="'false'"></el-switch>
      </el-form-item>
      <el-form-item label="banner广告id" prop="adBannerId" v-if="formData.adBannerStatus == 'true'">
        <el-input v-model="formData.adBannerId" type="text" placeholder="请输入banner广告id" clearable :style="{width: '50%'}"></el-input>
      </el-form-item>
      <el-form-item label="奖励次数状态" prop="adRewardParseNumStatus">
        <template #label>
          <span>奖励次数状态
            <el-tooltip :content="objectFormData.adRewardParseNumStatus.remark || objectFormData.adRewardParseNumStatus.configName" placement="bottom" effect="light" v-if="objectFormData.adRewardParseNumStatus">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </span>
        </template>
        <el-switch v-model="formData.adRewardParseNumStatus" :active-value="'true'" :inactive-value="'false'"></el-switch>
      </el-form-item>
      <template v-if="formData.adRewardParseNumStatus == 'true'">
        <el-form-item label="广告奖励次数（临时）" prop="adRewardParseNum">
          <template #label>
            <span>广告奖励次数（临时）
              <el-tooltip :content="objectFormData.adRewardParseNum.remark || objectFormData.adRewardParseNum.configName" placement="bottom" effect="light" v-if="objectFormData.adRewardParseNum">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </span>
          </template>
          <el-input-number v-model="formData.adRewardParseNum" :min="1" :max="100000000"></el-input-number>
        </el-form-item>
      </template>

      <el-form-item label="主动广告奖励tokens状态" prop="adRewardTokensStatus">
        <template #label>
          <span>主动广告奖励tokens状态
            <el-tooltip :content="objectFormData.adRewardTokensStatus.remark || objectFormData.adRewardTokensStatus.configName" placement="bottom" effect="light" v-if="objectFormData.adRewardTokensStatus">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </span>
        </template>
        <el-switch v-model="formData.adRewardTokensStatus" :active-value="'true'" :inactive-value="'false'"></el-switch>
      </el-form-item>
      <el-form-item label="主动广告奖励tokens" prop="adRewardTokens" v-if="formData.adRewardTokensStatus == 'true'">
        <template #label>
          <span>主动广告奖励tokens
            <el-tooltip :content="objectFormData.adRewardTokens.remark || objectFormData.adRewardTokens.configName" placement="bottom" effect="light" v-if="objectFormData.adRewardTokens">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </span>
        </template>
        <el-input-number v-model="formData.adRewardTokens" :min="0" :max="100000000"></el-input-number>
      </el-form-item>

      <el-form-item label="每日分享状态" prop="shareNumStatus">
        <template #label>
          <span>每日分享状态
            <el-tooltip :content="objectFormData.shareNumStatus.remark || objectFormData.shareNumStatus.configName" placement="bottom" effect="light" v-if="objectFormData.shareNumStatus">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </span>
        </template>
        <el-switch v-model="formData.shareNumStatus" :active-value="'true'" :inactive-value="'false'"></el-switch>
      </el-form-item>
      <template v-if="formData.shareNumStatus == 'true'">
        <el-form-item label="每日分享次数" prop="shareNum">
          <el-input-number v-model="formData.shareNum" :min="1" :max="100000000"></el-input-number>
        </el-form-item>
        <el-form-item label="每日分享获得tokens" prop="shareNumTokens">
          <template #label>
            <span>每日分享获得tokens
              <el-tooltip :content="objectFormData.shareNumTokens.remark || objectFormData.shareNumTokens.configName" placement="bottom" effect="light" v-if="objectFormData.shareNumTokens">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </span>
          </template>
          <el-input-number v-model="formData.shareNumTokens" :min="1" :max="100000000"></el-input-number>
        </el-form-item>
      </template>

      <el-form-item label="tokens与次数比例" prop="adTokensToParseNum">
        <template #label>
          <span>tokens与次数比例
            <el-tooltip :content="objectFormData.adTokensToParseNum.remark || objectFormData.adTokensToParseNum.configName" placement="bottom" effect="light" v-if="objectFormData.adTokensToParseNum">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </span>
        </template>
        <el-input-number v-model="formData.adTokensToParseNum" :min="1" :max="100000000"></el-input-number>
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
    adRewardInterval: 0,
    adRewardParseNum: 0,
    adRewardTokens: 0,
    adTokensToParseNum: 0,
    adRewardParseNumStatus: "",
    adRewardTokensStatus: "",
    shareNumStatus: "false",
    shareNum: 0,
    shareNumTokens: 0,
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
const objectFormData = reactive({});

const getConfigRoutine = () => {
  configRoutine().then((res) => {
    // 整理数据
    Object.assign(originFormData, res.data);
    // 使用 reduce 一次性转换数据
    formData.value = res.data.reduce((acc, item) => {
      const key = item.configKey.replace("routine.", ""); // 直接替换
      acc[key] = item.configValue;
      objectFormData[key] = item;
      return acc;
    }, {});
    console.log(objectFormData);
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
      configValue:
        formData.value[item.configKey.replace("routine.", "")] + "".trim(), // 直接从 formData 获取值
    }));
    console.log(dataArray);
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
