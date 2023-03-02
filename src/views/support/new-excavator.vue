<template>
  <!-- <div>支持/新一代挖机操作</div> -->
  <div v-if="cliWidth > 768" class="eci-main-content">
    <img :src="base_request_url + '/file/' + imgSuUrl" class="top-big-img" />
    <div class="home-title-six"><div>新一代挖机操作</div></div>
    <div class="font-main" v-html="supportContent"></div>

    <div v-if="childSuList.length > 0">
      <div class="tools-list-content">
        <router-link
          v-for="(item, index) in childSuList"
          :key="index"
          class="item"
          :to="{
            path: '/support/fileDetail',
            query: { title: '新一代挖机操作', name: item.title },
          }"
        >
          <div class="item-img">
            <img class="img" :src="base_request_url + '/file/' + item.imgPc" />
          </div>
          <div class="name">{{ item.title }}</div>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="bcp-container">
      <img
        :src="base_request_url + '/file/' + imgSuPhoneUrl"
        class="top-big-img"
      />
      <div class="padding-left-right">
        <div class="home-title-six"><div>新一代挖机操作</div></div>
        <div class="font-main" v-html="supportContent"></div>
      </div>

      <div v-if="childSuList">
        <div class="support-list-content">
          <router-link
            v-for="(item, index) in childSuList"
            :key="index"
            class="item"
            :to="{
              path: '/support/fileDetail',
              query: { title: '新一代挖机操作', name: item.title },
            }"
          >
            <div class="img">
              <img
                class="img"
                :src="base_request_url + '/file/' + item.imgMobile"
              />
            </div>
            <div class="title">{{ item.title }}</div>
          </router-link>
        </div>
      </div>
      <div class="grab-nav">
        <Header :isShow="'otherPage'"></Header>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "@/layouts/header/index.vue";

import { base_request_url } from "@/request/http";
import { getSupportClassify } from "@/utils/utils";

sessionStorage.setItem(
  "BreadcrumbItem",
  JSON.stringify([
    {
      path: "/support",
      name: "支持",
    },
    {
      path: "/support/excavator",
      name: "新一代挖机操作",
    },
  ])
);

const { supportContent, imgSuUrl, imgSuPhoneUrl, videoSu, childSuList } =
  await getSupportClassify("支持", "新一代挖机操作");

const cliWidth = ref(document.documentElement.clientWidth);
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
      padding: 20px 8px 24px 10px;
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1199px) {
  .home-title-six {
    margin-top: 40px;
    margin-bottom: 17px;

    div {
      padding: 12px 4px 15px 8px;
    }
  }
}

@media screen and (max-width: 767px) {
  .home-title-six {
    margin-top: 18px;
    margin-bottom: 4px;

    div {
      padding: 6px 3px 9px 5px;
    }
  }
}
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
