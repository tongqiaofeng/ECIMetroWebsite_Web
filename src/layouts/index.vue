<template>
  <div class="pc-layputs" v-if="cliWidth > 768">
    <el-container>
      <el-header>
        <Header :isShow="true"></Header>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
  <div class="phone-layouts" v-else>
    <van-sticky>
      <div class="phone-header">
        <router-link to="/"
          ><img
            src="../assets/imgs/home/logn.png"
            style="height: 50px; max-width: 100%"
        /></router-link>
        <van-icon name="wap-nav" size="24" @click="popupShow = true" />
      </div>
    </van-sticky>

    <van-popup
      v-model:show="popupShow"
      position="right"
      :style="{ width: '100%', height: '100vh' }"
    >
      <div class="poup-container">
        <div class="poup-header">
          <router-link to="/"
            ><img
              src="../assets/imgs/home/logn.png"
              style="height: 50px; max-width: 100%"
          /></router-link>
          <van-icon
            name="cross"
            size="18"
            color="#fff"
            @click="popupShow = false"
          />
        </div>
        <Header :isShow="false" @menuClose="menuClose"></Header>
      </div>
    </van-popup>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from "@/layouts/header/index.vue";
import Footer from "@/layouts/footer/index.vue";

import { ref } from "vue";

const popupShow = ref(false);
const cliWidth = ref(document.documentElement.clientWidth);

// header组件路由跳转关闭 导航栏
const menuClose = () => {
  popupShow.value = false;
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 991px) {
  .pc-layputs {
  }

  .phone-layouts {
  }
}

@media screen and (max-width: 992px) {
  .pc-layputs {
  }

  .phone-layouts {
    .phone-header {
      height: 60px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-bottom: 1px solid #000;
    }

    .poup-container {
      height: 100%;
      overflow: scroll;
      padding: 0 20px;
      background-color: #c3c3c3;
      color: #fff;

      .poup-header {
        padding: 10px 10px 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>

<style scoped>
.el-header {
  padding: 0 !important;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
}

.el-menu {
  border-right: none;
}
</style>
