<template>
  <!-- 矿山设备详情 -->
  <Detail
    :detail-name="mineInfo.equipmentTypeName"
    :detail-content="mineInfo.content"
  ></Detail>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

import { base_request_url } from "@/request/http";
import { getProductClassify } from "@/utils/utils";

import Detail from "@/components/detail.vue";

const route = useRoute();
console.log(route.query.content);

const imgClassifyUrl = ref("");
const mineInfo = ref();

const name: any = ref();
name.value = route.query.name;
const { childList } = await getProductClassify("矿山设备", name.value);
const id = route.query.id;
console.log("------------", childList.value);

for (const item of childList.value) {
  if (item.id == id) {
    imgClassifyUrl.value = item.imgPc;
    mineInfo.value = item;
    console.log(mineInfo.value);

    if (mineInfo.value.content) {
      mineInfo.value.content = mineInfo.value.content.replaceAll(
        "/_file_/",
        base_request_url + "/file/"
      );
    }
  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 991px) {
  .grab-main-content {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
