<template>
  <div class="pc-layouts">
    <el-container>
      <el-header>
        <Suspense>
          <Header :isShow="'pcPage'"></Header>
        </Suspense>
      </el-header>

      <el-main>
        <Suspense>
          <router-view :key="route.fullPath" />
        </Suspense>
      </el-main>
      <el-footer>
        <Suspense>
          <Footer></Footer>
        </Suspense>
      </el-footer>
    </el-container>
  </div>
  <div class="phone-layouts">
    <van-sticky>
      <div
        class="phone-header"
        :style="{
          'background-color': route.path == '/' ? '#f5f5f5' : '#1a1a1a',
        }"
      >
        <router-link to="/"
          ><img
            v-if="system"
            :src="base_request_url + '/file/' + system.companyMsg.websiteLogo"
            style="height: 32px; max-width: 100%"
        /></router-link>

        <div class="search-phone-img">
          <router-link class="search" to="/search"
            ><img
              v-if="route.path == '/'"
              src="../assets/imgs/common/search.png"
            />
            <img v-else src="../assets/imgs/common/search-white.png" />
          </router-link>

          <van-icon
            name="wap-nav"
            size="24"
            :color="route.path == '/' ? '#1a1a1a' : '#fff'"
            class="iconCursor"
            @click="popupShow = true"
          />
        </div>
      </div>
    </van-sticky>

    <van-popup
      class="van-popup-style"
      v-model:show="popupShow"
      position="top"
      :style="{
        width: '100%',
        height: '100vh',
      }"
    >
      <div
        class="poup-container"
        :style="{
          'background-color': route.path == '/' ? '#fff' : '#1a1a1a',
        }"
      >
        <div
          class="poup-header"
          :style="{
            'background-color': route.path == '/' ? '#f5f5f5' : '#1a1a1a',
          }"
        >
          <img
            v-if="system"
            :src="base_request_url + '/file/' + system.companyMsg.websiteLogo"
            style="height: 50px; max-width: 100%"
          />

          <van-icon
            name="cross"
            size="26px"
            :color="route.path == '/' ? '#1a1a1a' : '#fff'"
            class="iconCursor"
            @click="popupShow = false"
          />
        </div>
        <Suspense>
          <Header :isShow="'phonePage'" @menuClose="menuClose"></Header>
        </Suspense>
      </div>
    </van-popup>
    <Suspense>
      <router-view :key="route.fullPath" />
    </Suspense>

    <Suspense>
      <Footer></Footer>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/userStore";

import Header from "@/layouts/header/index.vue";
import Footer from "@/layouts/footer/index.vue";

import { base_request_url } from "@/request/http";

const route = useRoute();

const popupShow = ref(false);

// header组件路由跳转关闭 导航栏
const menuClose = () => {
  popupShow.value = false;
};

const userStore = useUserStore();
const system: any = ref();

if (userStore.systemMsg) {
  system.value = JSON.parse(userStore.systemMsg);
}
</script>

<style lang="scss" scoped>
.search-phone-img {
  display: flex;
  align-items: center;

  .search {
    display: flex;
    align-items: center;

    img {
      width: 26px;
      height: 26px;
      margin-right: 16px;
    }
  }
}

@media screen and (min-width: 1101px) {
  .pc-layouts {
    display: block;
  }
  .phone-layouts {
    display: none;
  }
}

@media screen and (max-width: 1100px) {
  .pc-layouts {
    display: none;
  }
  .phone-layouts {
    display: block;
    .phone-header {
      padding: 13px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f5f5f5;
    }

    .poup-container {
      // height: 100%;
      // overflow: scroll;
      padding-bottom: 15px;
      color: #fff;

      .poup-header {
        padding: 13px 15px;
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>

<style lang="scss">
.el-header {
  padding: 0 !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  background-color: #f5f5f5;
}

.el-footer {
  padding: 0;
}

.van-popup-style {
  background: rgba($color: #000000, $alpha: 0.1) !important;
}

.poup-container {
  .el-menu-item {
    height: 44px !important;
  }

  .el-sub-menu__title {
    height: 44px !important;
  }
}

.el-sub-menu {
  .el-popper {
    border-radius: 0;
  }

  .el-popper.is-light {
    width: 100%;
    border: none;
    position: fixed !important;
    inset: 58px auto auto 0 !important;
    background: #ebebeb !important;
  }
}
</style>
