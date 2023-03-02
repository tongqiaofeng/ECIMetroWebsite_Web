<template>
  <!-- <div>支持</div> -->
  <div v-if="cliWidth > 768" class="eci-main-content">
    <img :src="base_request_url + '/file/' + imgSuUrl" class="top-big-img" />
    <div class="home-title-six"><div>支持</div></div>
    <div class="font-main" v-html="supportContent"></div>

    <div class="classify-main">
      <div v-for="item in childSuList" :key="item.id" class="classify-every">
        <router-link :to="routerUrl(item.title)">
          <img
            class="classify-img"
            :src="base_request_url + '/file/' + item.imgSort"
          />
          <div class="classify-title">
            <span>{{ item.title }}</span>
            <van-icon name="arrow" color="#fff" size="18" />
          </div>
        </router-link>
      </div>
      <div class="classify-every">
        <router-link :to="routerUrl('服务网点地图')">
          <img class="classify-img" src="../../assets/imgs/common/map.jpg" />
          <div class="classify-title">
            <span>服务网点地图</span>
            <van-icon name="arrow" color="#fff" size="18" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <img
      :src="base_request_url + '/file/' + imgSuPhoneUrl"
      class="top-big-img"
    />

    <div class="grab-font-content">
      <div class="home-title-six"><div>支持</div></div>
      <div class="font-main" v-html="supportContent"></div>
    </div>
    <div class="classify-main">
      <van-swipe :loop="false" :width="200" :show-indicators="false">
        <van-swipe-item v-for="item in childSuList" :key="item.id">
          <router-link
            :to="routerUrl(item.title)"
            class="classify-every"
            :style="{
              background:
                'url(' +
                base_request_url +
                '/file/' +
                item.imgSort +
                ') no-repeat',
              'background-size': 'cover',
            }"
          >
            <div class="classify-title">
              <span>{{ item.title }}</span>
              <van-icon name="arrow" color="#fff" size="14" />
            </div>
          </router-link>
        </van-swipe-item>
        <van-swipe-item>
          <router-link
            :to="routerUrl('服务网点地图')"
            class="classify-every map"
          >
            <div class="classify-title">
              <span>服务网点地图</span>
              <van-icon name="arrow" color="#fff" size="14" />
            </div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "@/layouts/header/index.vue";

import { base_request_url } from "@/request/http";
import { getSupportClassify } from "@/utils/utils";

const { supportContent, imgSuUrl, imgSuPhoneUrl, childSuList } =
  await getSupportClassify("支持");

const cliWidth = ref(document.documentElement.clientWidth);

const routerUrl = (item: string) => {
  let url = "";
  switch (item) {
    case "BCP使用保养规范":
      url = "/support/bcp";
      break;
    case "新一代挖机操作":
      url = "/support/excavator";
      break;
    case "维修支持":
      url = "/support/maintain";
      break;
    case "服务网点地图":
      url = "/support/map";
      break;
    default:
      url = "";
      break;
  }

  return url;
};
</script>

<style scoped lang="scss">
.home-title-six {
  background: url("../../assets/imgs/pc/common/titleBack2.png") no-repeat;
  background-size: 100% 100%;
}

@media screen and (min-width: 1200px) {
  .home-title-six {
    margin-top: 60px;
    margin-bottom: 15px;

    div {
      padding: 10px 5px 14px 10px;
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

  .map {
    background: url("../../assets/imgs/common/map.jpg") no-repeat;
    background-size: cover;
  }
}
</style>
