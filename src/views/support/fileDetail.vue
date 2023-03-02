<template>
  <!-- <div>支持/新一代挖机操作</div> -->
  <Detail
    :detail-name="headline ? headline : name"
    :detail-content="supportContent"
  ></Detail>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

import Detail from "@/components/detail.vue";

import { getSupportClassify } from "@/utils/utils";

const route = useRoute();
let title: any = route.query.title;
let name: any = route.query.name;
let headline: any = route.query.headline ? route.query.headline : "";

const { supportContent } = await getSupportClassify(
  "支持",
  title,
  name,
  headline
);
</script>

<style scoped lang="scss">
.bcp-container {
  background-color: #f5f5f5;
}
.bcp-video {
  text-align: center;
}

.overlay-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #000;

  .overlay-close {
    padding-top: 40px;
    padding-right: 33px;
    text-align: right;
  }

  .overlay-video {
    flex: 1;
    text-align: center;
  }
}
</style>
<style>
.plugin_ctrl_mobile_txp_bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 6;
  bottom: 0;
  left: 0;
}

.plugin_ctrl_mobile_txp_bottom.txp_none {
  display: block !important;
}
</style>
