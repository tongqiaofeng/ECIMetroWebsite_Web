<template>
  <!-- <div>支持/维修支持/维修常识</div> -->
  <div v-if="cliWidth > 768" class="eci-main-content">
    <img :src="base_request_url + '/file/' + imgSuUrl" class="top-big-img" />
    <div class="home-title-six"><div>维修常识</div></div>
    <div class="font-main" v-html="supportContent"></div>

    <div class="classify-two-main">
      <div v-for="item in childSuList" :key="item.id" class="classify-every">
        <router-link
          :to="{
            path: '/support/fileDetail',
            query: {
              title: '维修支持',
              name: '维修常识',
              headline: '维修保养小贴士',
            },
          }"
        >
          <img
            class="classify-img"
            :src="base_request_url + '/file/' + item.imgSort"
          />
          <div class="classify-title">
            <span>维修保养小贴士</span>
            <van-icon name="arrow" color="#fff" size="14" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="bcp-container">
      <img :src="base_request_url + '/file/' + imgSuUrl" class="top-big-img" />

      <div class="grab-font-content">
        <div class="home-title-six"><div>维修常识</div></div>
        <div class="font-main" v-html="supportContent"></div>
      </div>
      <div class="classify-two-main common-sense-content" v-if="childSuList">
        <div v-for="item in childSuList" :key="item.id" class="classify-every">
          <router-link
            :to="{
              path: '/support/fileDetail',
              query: {
                title: '维修支持',
                name: '维修常识',
                headline: '维修保养小贴士',
              },
            }"
          >
            <img
              class="classify-img"
              :src="base_request_url + '/file/' + item.imgSort"
            />
            <div class="classify-title">
              <span>维修保养小贴士</span>
              <van-icon name="arrow" color="#fff" size="14" />
            </div>
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
      path: "/support/maintain",
      name: "维修支持",
    },
    {
      path: "/support/commonSense",
      name: "维修常识",
    },
  ])
);

const { supportContent, imgSuUrl, imgSuPhoneUrl, videoSu, childSuList } =
  await getSupportClassify("支持", "维修支持", "维修常识");

const cliWidth = ref(document.documentElement.clientWidth);
</script>

<style scoped lang="scss">
.home-title-six {
  background: url("../../../assets/imgs/pc/common/titleBack6.png") no-repeat;
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
      padding: 10px 5px 14px 10px;
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

  .common-sense-content {
    padding: 0 15px;
    display: flex;
    justify-content: center;
  }

  .classify-every {
    width: 100% !important;

    .classify-title {
      justify-content: center !important;
    }
  }
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
