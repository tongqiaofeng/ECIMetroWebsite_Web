<template>
  <!-- <div>支持/维修支持</div> -->
  <div v-if="cliWidth > 768" class="eci-main-content">
    <img :src="base_request_url + '/file/' + imgSuUrl" class="top-big-img" />
    <div class="home-title-six"><div>维修支持</div></div>
    <div class="font-main" v-html="supportContent"></div>

    <div class="classify-two-main">
      <div v-for="item in childSuList" :key="item.id" class="classify-every">
        <router-link v-if="item.title == '维修常识'" to="/support/commonSense">
          <img
            class="classify-img"
            :src="base_request_url + '/file/' + item.imgSort"
          />
          <div class="classify-title">
            <span>维修常识</span>
            <van-icon name="arrow" color="#fff" size="14" />
          </div>
        </router-link>
        <router-link v-if="item.title == '维修资源'" to="/support/resource">
          <img
            class="classify-img"
            :src="base_request_url + '/file/' + item.imgSort"
          />
          <div class="classify-title">
            <span>维修资源</span>
            <van-icon name="arrow" color="#fff" size="14" />
          </div>
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

      <div class="grab-font-content">
        <div class="home-title-six"><div>维修支持</div></div>
        <div class="font-main" v-html="supportContent"></div>
        <div class="classify-two-main">
          <div
            v-for="item in childSuList"
            :key="item.id"
            class="classify-every"
          >
            <router-link
              v-if="item.title == '维修常识'"
              to="/support/commonSense"
            >
              <img
                class="classify-img"
                :src="base_request_url + '/file/' + item.imgSort"
              />
              <div class="classify-title">
                <span>维修常识</span>
                <van-icon name="arrow" color="#fff" size="14" />
              </div>
            </router-link>
            <router-link v-if="item.title == '维修资源'" to="/support/resource">
              <img
                class="classify-img"
                :src="base_request_url + '/file/' + item.imgSort"
              />
              <div class="classify-title">
                <span>维修资源</span>
                <van-icon name="arrow" color="#fff" size="14" />
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="grab-nav">
        <Header :isShow="'otherPage'"></Header>
      </div>
    </div>
  </div>

  <div class="back-top-content fix-btn" @click="checkCode">
    <img class="top-img" src="../../../assets/imgs/pc/common/contact.png" />
    <div class="top-font">一键报修</div>
  </div>
  <el-dialog
    v-model="codeShow"
    class="dialog-box"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    center
    :width="cliWidth > 768 ? '543px' : '343px'"
  >
    <div class="code-container">
      <div>
        <img src="../../../assets/imgs/common/repairsCode.png" />
      </div>
      <div class="font">微信扫码获取报修服务</div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Dialog } from "vant";
import "vant/es/dialog/style";

import Header from "@/layouts/header/index.vue";

import { base_request_url } from "@/request/http";
import { getSupportClassify } from "@/utils/utils";

const { supportContent, imgSuUrl, imgSuPhoneUrl, childSuList } =
  await getSupportClassify("支持", "维修支持");

const cliWidth = ref(document.documentElement.clientWidth);

const codeShow = ref(false);
const checkCode = () => {
  Dialog.alert({
    message: "小程序正在开发中，敬请期待...",
  });

  // codeShow.value = true;
};
</script>

<style scoped lang="scss">
.fix-btn {
  position: fixed;
  right: 4px;
  bottom: 300px;
  z-index: 999;
  cursor: pointer;
}

.code-container {
  text-align: center;

  .font {
    margin-top: 8px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #dea600;
  }
}

@media screen and (min-width: 768px) {
  .code-container {
    img {
      width: 360px;
      height: 360px;
    }

    .font {
      padding-bottom: 70px;
      font-size: 36px;
    }
  }
}

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

  .code-container {
    img {
      width: 260px;
      height: 260px;
    }

    .font {
      padding-bottom: 30px;
      font-size: 24px;
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
