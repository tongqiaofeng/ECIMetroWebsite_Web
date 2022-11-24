<template>
  <div>
    <van-button type="primary" @click="testToast">主要按钮</van-button>
    <div>
      <UploadImg :imgUrl="imgList" :imgType="3"></UploadImg>
    </div>
    <div style="height: 500px; background-color: aqua"></div>
    <p class="font-color">你好呀</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// import { ElMessage } from "element-plus";
// import { base_request_url } from "@/request/http";

// import { formatNumberRgx, getDateNow } from "@/utils/utils";
import { articlePort } from "@/request/api/activity";

import UploadImg from "@/components/upload-img.vue";
import { Toast } from "vant";

function testToast() {
  Toast({
    message: "测试",
  });
}

const imgList = ref<Array<string>>([]);

articlePort({
  keyword: "",
  page: 1,
  pageNum: 10,
  source: 0,
}).then((res) => {
  console.log("活动列表", res);
});
</script>

<style lang="scss" scoped></style>
