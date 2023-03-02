<template>
  <!-- 电力设备分类 柴油发电机组等-->
  <Detail :detail-name="name" :detail-content="grabContent"></Detail>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getProductClassify } from "@/utils/utils";

import Detail from "@/components/detail.vue";

const route = useRoute();
const name: any = ref();
name.value = route.query.name;
const { grabContent } = await getProductClassify(
  "动力设备",
  "电力设备",
  name.value
);
</script>

<style scoped lang="scss">
@media screen and (min-width: 991px) {
  .grab-main-content {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
