<template>
  <!-- 矿山设备 -->
  <div v-if="cliWidth > 768" class="eci-main-content">
    <img
      :src="base_request_url + '/file/' + imgClassifyUrl"
      class="top-big-img"
    />

    <div class="home-title-six"><div>矿山设备</div></div>
    <div class="font-main" v-html="grabContent"></div>

    <div class="classify-main" v-if="childList">
      <div v-for="item in childList" :key="item.id" class="classify-every">
        <router-link
          :to="{
            path: '/product/mine/classify',
            query: { name: item.equipmentTypeName },
          }"
        >
          <img
            class="classify-img"
            :src="base_request_url + '/file/' + item.imgSort"
          />
          <div class="classify-title">
            <span>{{ item.equipmentTypeName }}</span>
            <van-icon name="arrow" color="#fff" size="18" />
          </div>
        </router-link>
      </div>
      <div class="classify-every">
        <router-link to="/product/mine/calculator">
          <img
            class="classify-img"
            src="../../../assets/imgs/common/calc.jpg"
          />
          <div class="classify-title">
            <span>矿山产量计算器</span>
            <van-icon name="arrow" color="#fff" size="18" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <img
      :src="base_request_url + '/file/' + imgClassifyPhoneUrl"
      class="top-big-img"
    />

    <div class="grab-main-content">
      <div class="grab-font-content">
        <div class="home-title-six"><div>矿山设备</div></div>
        <div class="font-main" v-html="grabContent"></div>
      </div>
    </div>

    <div class="classify-main" v-if="childList">
      <van-swipe :loop="false" :width="200" :show-indicators="false">
        <van-swipe-item v-for="item in childList" :key="item.id">
          <router-link
            :to="{
              path: '/product/mine/classify',
              query: { name: item.equipmentTypeName },
            }"
            :style="{
              background:
                'url(' +
                base_request_url +
                '/file/' +
                item.imgSort +
                ') no-repeat',
              'background-size': 'cover',
            }"
            class="classify-every"
          >
            <div class="classify-title">
              <span>{{ item.equipmentTypeName }}</span>
              <van-icon name="arrow" color="#fff" size="18" />
            </div>
          </router-link>
        </van-swipe-item>

        <van-swipe-item>
          <router-link
            to="/product/mine/calculator"
            class="classify-every calc"
          >
            <div class="classify-title">
              <span>矿山产量计算器</span>
              <van-icon name="arrow" color="#fff" size="18" />
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
import { ref, onMounted, nextTick } from "vue";
import { base_request_url } from "@/request/http";
import _sessionStorage from "@/utils/sessionStorage";
import { getProductClassify } from "@/utils/utils";

import Header from "@/layouts/header/index.vue";

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  setSize();
  // 窗口大小发生改变时,调用一次
  window.onresize = () => {
    setSize();
    cliWidth.value = document.documentElement.clientWidth;
  };
});

const bannerHeight = ref(0);
const setSize = () => {
  // 通过图片宽度计算高度
  nextTick(() => {
    if (document.body.clientWidth > 768) {
      bannerHeight.value = (document.body.clientWidth * 350) / 1410;
    }

    console.log(bannerHeight.value);
  });
};

const { grabContent, imgClassifyUrl, imgClassifyPhoneUrl, childList } =
  await getProductClassify("矿山设备");
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

  .calc {
    background: url("../../../assets/imgs/common/calc.jpg") no-repeat;
    background-size: cover;
  }
}
</style>
