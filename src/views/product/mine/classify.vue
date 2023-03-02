<template>
  <!-- 矿山设备分类对应设备列表 -->
  <div v-if="cliWidth > 768" class="eci-main-content">
    <img
      :src="base_request_url + '/file/' + imgClassifyUrl"
      class="top-big-img"
    />

    <div class="grab-main-content">
      <div class="grab-font-content">
        <div class="home-title-six">
          <div>{{ name }}</div>
        </div>
        <div class="font-main" v-html="grabContent"></div>
      </div>
    </div>

    <div class="tools-list-content">
      <router-link
        v-for="(item, index) in childList"
        :key="index"
        class="item"
        :to="{
          path: '/product/mine/detail',
          query: { name: name, id: item.id },
        }"
      >
        <div class="item-img">
          <img class="img" :src="base_request_url + '/file/' + item.imgSort" />
        </div>
        <div class="name">{{ item.equipmentTypeName }}</div>
      </router-link>
    </div>
  </div>
  <div v-else>
    <img
      :src="base_request_url + '/file/' + imgClassifyPhoneUrl"
      class="top-big-img"
    />

    <div class="grab-main-content">
      <div class="grab-font-content">
        <div class="home-title-six">
          <div>{{ name }}</div>
        </div>
        <div class="font-main" v-html="grabContent"></div>
      </div>
    </div>

    <div class="product-list-content tools">
      <router-link
        v-for="(item, index) in childList"
        :key="index"
        class="item"
        :to="{
          path: '/product/mine/detail',
          query: { name: name, id: item.id },
        }"
      >
        <div class="img">
          <img class="img" :src="base_request_url + '/file/' + item.imgSort" />
        </div>
        <div class="name">{{ item.equipmentTypeName }}</div>
      </router-link>
    </div>

    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import { base_request_url } from "@/request/http";
import _sessionStorage from "@/utils/sessionStorage";
import { getProductClassify } from "@/utils/utils";

import Header from "@/layouts/header/index.vue";

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  // 窗口大小发生改变时,调用一次
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };
});

const route = useRoute();
const name: any = ref();
name.value = route.query.name;

sessionStorage.setItem(
  "BreadcrumbItem",
  JSON.stringify([
    {
      path: "/product/mine",
      name: "矿山设备",
    },
    {
      path: "/product/mine/classify",
      query: {
        name: name.value,
      },
      name: name.value,
    },
  ])
);

const { grabContent, imgClassifyUrl, imgClassifyPhoneUrl, childList } =
  await getProductClassify("矿山设备", name.value);
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
      padding: 19px 5px 21px 10px;
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1199px) {
  .home-title-six {
    margin-top: 28px;
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
