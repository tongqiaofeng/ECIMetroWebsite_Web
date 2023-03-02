<template>
  <!-- <h3>工装机具</h3> -->
  <div v-if="cliWidth > 1199" class="eci-main-content">
    <div class="second-nav">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="(item, index) of breadList"
          :key="index"
          :to="{ path: item.path, query: item.query }"
          replace
        >
          <router-link to=""></router-link>
          {{ item.name }}</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ toolInfo?.toolName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div v-if="toolInfo" class="tools-pc-content">
      <div class="tools-pc-img">
        <el-carousel
          :interval="3000"
          :indicator-position="'none'"
          arrow="always"
          height="410px"
        >
          <el-carousel-item v-for="(item, index) of imgList" :key="index">
            <img
              :src="base_request_url + '/file/' + item"
              class="carousel-img"
            />
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="tool-main">
        <div class="tool-name">
          {{ toolInfo.toolName }}
        </div>
        <div class="line"></div>
        <div class="content" v-html="toolInfo.content"></div>
      </div>
    </div>
  </div>
  <div v-else-if="cliWidth > 767" class="eci-main-content">
    <div class="second-nav">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="(item, index) of breadList"
          :key="index"
          :to="{ path: item.path, query: item.query }"
          replace
        >
          <router-link to=""></router-link>
          {{ item.name }}</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ toolInfo?.toolName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-if="toolInfo">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) of imgList" :key="index">
          <img :src="base_request_url + '/file/' + item" class="swipe-img" />
        </van-swipe-item>
      </van-swipe>
      <div class="tool-main">
        <div class="tool-name">
          {{ toolInfo.toolName }}
        </div>
        <div class="line"></div>
        <div class="content" v-html="toolInfo.content"></div>
      </div>
    </div>
  </div>
  <div v-else class="eci-main-content">
    <div v-if="toolInfo">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) of imgList" :key="index">
          <img :src="base_request_url + '/file/' + item" class="swipe-img" />
        </van-swipe-item>
      </van-swipe>
      <div class="tool-main">
        <div class="tool-name">
          {{ toolInfo.toolName }}
        </div>
        <div class="line"></div>
        <div class="content" v-html="toolInfo.content"></div>
      </div>
    </div>
    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";

import { base_request_url } from "@/request/http";
import { toolInfoPort } from "@/request/api/product";
import { ITools } from "@/types/global";

import Header from "@/layouts/header/index.vue";

const route = useRoute();

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  // 窗口大小发生改变时,调用一次
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };
});

const breadList = ref();
if (sessionStorage.getItem("BreadcrumbItem")) {
  breadList.value = JSON.parse(
    sessionStorage.getItem("BreadcrumbItem") as string
  );
  console.log(breadList.value);
}

// 获取工装机具详情
let id = route.query.id;
console.log(id);
const toolInfo = ref<ITools>();
const imgList = ref<string[]>([]);
const getToolsDetail = () => {
  toolInfoPort({ id }).then((res) => {
    console.log("工装机具详情", res);

    toolInfo.value = res.data.data;
    if (toolInfo.value?.imgUrl) {
      imgList.value = toolInfo.value?.imgUrl.split("|");
    }
    if (toolInfo.value?.content) {
      toolInfo.value.content = toolInfo.value.content.replaceAll(
        "/_file_/",
        base_request_url + "/file/"
      );
    }
  });
};
getToolsDetail();
</script>

<style scoped lang="scss">
@media screen and (min-width: 1200px) {
  .second-nav {
    margin-bottom: 50px;
  }

  .tools-pc-content {
    display: flex;
    align-items: center;
    padding: 57px 59px;
    background-color: #f5f5f5;

    .carousel-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .tool-main {
      margin-left: 42px;

      .tool-name {
        font-weight: bold;
        font-size: 30px;
        color: #1a1a1a;
      }

      .line {
        width: 70px;
        height: 4px;
        margin-top: 16px;
        background: #f5c71b;
      }

      .content {
        margin-top: 32px;
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1199px) {
  .tool-main {
    padding: 40px 15px 65px;

    .tool-name {
      font-weight: 900;
      font-size: 24px;
      color: #1a1a1a;
    }

    .line {
      width: 50px;
      height: 3px;
      margin-top: 12px;
      background: #f5c71b;
    }

    .content {
      margin-top: 25px;
    }
  }

  .my-swipe .van-swipe-item {
    text-align: center;

    .swipe-img {
      width: 70%;
      height: auto;
      object-fit: cover;
    }
  }
}

@media screen and (max-width: 767px) {
  .tool-main {
    padding: 40px 15px 65px;

    .tool-name {
      font-weight: 900;
      font-size: 24px;
      color: #1a1a1a;
    }

    .line {
      width: 50px;
      height: 3px;
      margin-top: 12px;
      background: #f5c71b;
    }

    .content {
      margin-top: 25px;
    }
  }
}
</style>
<style lang="scss">
.tools-pc-img {
  .el-carousel__container {
    width: 30vw;
  }
}
</style>
