<template>
  <!-- 电力设备、石油动力设备等详情 -->
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
const { grabContent, imgClassifyUrl } = await getProductClassify(
  "动力设备",
  name.value
);
</script>
