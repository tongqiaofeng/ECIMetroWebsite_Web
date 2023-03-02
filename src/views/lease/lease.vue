<template>
  <!-- 租赁业务 -->
  <div v-show="cliWidth > 768" class="eci-main-content">
    <img
      :src="base_request_url + '/file/' + imgClassifyUrl"
      class="top-big-img"
    />

    <div class="grab-main-content">
      <div class="grab-font-content">
        <div class="home-title-six">
          <div>租赁业务</div>
        </div>
        <div class="font-main" @click="openService" v-html="grabContent"></div>
      </div>
    </div>
  </div>
  <div v-show="cliWidth < 769">
    <img
      :src="base_request_url + '/file/' + imgClassifyPhoneUrl"
      class="top-big-img"
    />

    <div class="grab-main-content">
      <div class="grab-font-content">
        <div class="home-title-six">
          <div>租赁业务</div>
        </div>
        <div class="font-main" @click="openService" v-html="grabContent"></div>
      </div>
    </div>

    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>

  <el-dialog
    title="在线看机"
    v-model="lookShow"
    class="dialog-box"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    center
    :width="cliWidth > 1200 ? '800px' : '80%'"
  >
    <div style="text-align: center">
      <iframe
        src="https://s.wcd.im/v/1ps3eZ6m/"
        frameborder="0"
        width="100%"
        height="570"
      ></iframe>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { base_request_url } from "@/request/http";
import { getProductClassify } from "@/utils/utils";
import Header from "@/layouts/header/index.vue";

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  // 窗口大小发生改变时,调用一次
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };

  if (cliWidth.value > 991) {
    document
      .getElementById("contactImg")
      ?.setAttribute("style", "cursor: pointer");
    document.getElementById("contactImg")?.addEventListener("click", () => {
      console.log("55555555---------");

      lookShow.value = true;
    });
  }
});

const lookShow = ref(false);
const openService = (e: any) => {
  console.log(e);
  if (cliWidth.value < 992) {
    if (e.target.id == "contactImg") {
      window.open("https://s.wcd.im/v/1ps3eZ6m/");
    }
  }
};

const { grabContent, imgClassifyUrl, imgClassifyPhoneUrl } =
  await getProductClassify("租赁业务");
</script>

<style scoped lang="scss">
.home-title-six {
  background: url("../../assets/imgs/pc/common/titleBack6.png") no-repeat;
  background-size: 100% 100%;
}

@media screen and (min-width: 1200px) {
  .home-title-six {
    margin-top: 60px;
    margin-bottom: 15px;

    div {
      padding: 19px 5px 21px 10px;
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1199px) {
  .home-title-six {
    margin-top: 43px;
    margin-bottom: 17px;

    div {
      padding: 12px 4px 15px 8px;
    }
  }
}

@media screen and (max-width: 767px) {
  .home-title-six {
    margin-top: 18px;
    margin-bottom: 0;

    div {
      padding: 11px 2px 14px 7px;
    }
  }
}
</style>
