<template>
  <!-- <div>公司介绍</div> -->
  <div v-if="cliWidth > 768" class="eci-main-content">
    <div class="company-intro-container">
      <div class="company-intro">
        <div class="container">
          <div class="title">公司介绍</div>
          <div class="en-title">Company Profile</div>
          <div class="content">
            易初明通集团是由泰国明通机械设备有限公司和易初工业集团投资有限公司共同创建的合资企业。
          </div>
        </div>
      </div>
      <div class="intro-video video-content">
        <img
          src="../../../assets/imgs/common/imgCompany.jpg"
          class="video-img"
        />
        <img
          class="play-img"
          src="../../../assets/imgs/common/play.png"
          @click.stop="showVideo"
        />
      </div>

      <div class="area-container">
        <!-- <div class="title">我们的区域</div> -->
        <div class="content">
          易初明通集团是由泰国明通机械设备有限公司和易初工业集团投资有限公司共同创建的合资企业。易初明通于
          1995 年成为
          Caterpillar®（卡特彼勒）代理商，总部位于四川成都，代理区域包括四川、云南、贵州、重庆、青海、西藏、宁夏、甘肃和陕西。
        </div>
        <div class="content">
          易初明通分公司服务网点遍布八省一市，在职员工约1700名，客户合作伙伴多达2万名。如今我们已经成为卡特彼勒全线产品在中国和全球重要的分销商之一。
        </div>
        <div class="content">
          公司业务涵盖销售卡特彼勒旗下Cat
          ®品牌及联盟产品的相关机械设备、租赁和二手机、动力系统、工装机具、配件相关产品，并提供这些产品在中国的维护与支持服务，并将零件移动卡车、400呼叫中心、在线销售渠道、Cat
          ®融资服务、 Cat
          ®价值宝等作为客户解决方案，旨在为户提供诚信、专业、快速、高效的多元化及全方位的服务。
        </div>
      </div>
    </div>
    <van-overlay :show="overShow">
      <div class="overlay-container">
        <div class="overlay-close" @click="closeVideo">
          <van-icon name="close" size="45px" color="#fff" />
        </div>

        <div class="overlay-video">
          <video
            width="645"
            height="410"
            id="iframe-one"
            :src="base_request_url + '/file/' + videoUrl"
            poster="../../../assets/imgs/common/imgCompany.jpg"
            controls
            preload="auto"
            webkit-playsinline="true"
            playsinline="true"
            x-webkit-airplay="allow"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-video-orientation="portraint"
            style="object-fit: fill"
          ></video>
        </div>
      </div>
    </van-overlay>
  </div>
  <div v-else>
    <div class="company-intro-container">
      <div class="company-intro">
        <div class="container">
          <div class="title">公司介绍</div>
          <div class="en-title">Company Profile</div>
          <div class="content">
            易初明通集团是由泰国明通机械设备有限公司和易初工业集团投资有限公司共同创建的合资企业。
          </div>
        </div>
      </div>
      <div class="intro-video video-content">
        <div style="padding: 0 15px">
          <img
            src="../../../assets/imgs/common/imgCompany.jpg"
            class="video-img"
          />
        </div>

        <img
          class="play-img"
          src="../../../assets/imgs/common/play.png"
          @click.stop="showVideo"
        />
      </div>
      <div class="area-container">
        <div class="area-main">
          <!-- <div class="title">我们的区域</div> -->
          <div class="content">
            易初明通集团是由泰国明通机械设备有限公司和易初工业集团投资有限公司共同创建的合资企业。易初明通于
            1995 年成为
            Caterpillar®（卡特彼勒）代理商，总部位于四川成都，代理区域包括四川、云南、贵州、重庆、青海、西藏、宁夏、甘肃和陕西。
          </div>
          <div class="content">
            易初明通分公司服务网点遍布八省一市，在职员工约1700名，客户合作伙伴多达2万名。如今我们已经成为卡特彼勒全线产品在中国和全球重要的分销商之一。
          </div>
          <div class="content">
            公司业务涵盖销售卡特彼勒旗下Cat
            ®品牌及联盟产品的相关机械设备、租赁和二手机、动力系统、工装机具、配件相关产品，并提供这些产品在中国的维护与支持服务，并将零件移动卡车、400呼叫中心、在线销售渠道、Cat
            ®融资服务、 Cat
            ®价值宝等作为客户解决方案，旨在为户提供诚信、专业、快速、高效的多元化及全方位的服务。
          </div>
        </div>
      </div>
    </div>

    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
    <van-overlay :show="overShow">
      <div class="overlay-container">
        <div class="overlay-close" @click="closeVideo">
          <van-icon name="close" size="45px" color="#fff" />
        </div>

        <div class="overlay-video">
          <video
            width="345"
            height="210"
            id="iframe-one"
            :src="base_request_url + '/file/' + videoUrl"
            poster="../../../assets/imgs/common/imgCompany.jpg"
            controls
            preload="auto"
            webkit-playsinline="true"
            playsinline="true"
            x-webkit-airplay="allow"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-video-orientation="portraint"
            style="object-fit: fill"
          ></video>
          <div class="video-play" @click="videoPlay">全屏播放</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useUserStore } from "@/store/userStore";

import Header from "@/layouts/header/index.vue";

import { base_request_url } from "@/request/http";

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };
});

const videoUrl = ref("");
const userStore = useUserStore();
if (userStore.systemMsg) {
  let system: any = JSON.parse(userStore.systemMsg);
  videoUrl.value = system.companyMsg.companyVideo;
}

const overShow = ref(false);
// 打开视频弹窗并播放
const showVideo = () => {
  overShow.value = true;
  nextTick(() => {
    let videoplay: any = document.getElementById("iframe-one") as HTMLElement;
    console.log(videoPlay);

    if (videoplay.paused) {
      console.log("----------");

      videoplay.play();
    }
  });
};

// 关闭视频弹窗并暂停视频播放
const closeVideo = () => {
  let videoplay: any = document.getElementById("iframe-one") as HTMLElement;
  videoplay.pause();
  overShow.value = false;
};

const videoPlay = () => {
  let iframe = document.getElementById("iframe-one");

  requestFullScreen(iframe);
};

/**
 * 进入全屏
 * @param element
 */
function requestFullScreen(el: any) {
  // console.log("----------", el);

  if (el.requestFullscreen) {
    console.log("1111111111");

    el.requestFullscreen();
  } else if (el.msRequestFullscreen) {
    console.log("222");
    el.msRequestFullscreen();
  } else if (el.mozRequestFullScreen) {
    console.log("333");
    el.mozRequestFullScreen();
  } else if (el.webkitRequestFullscreen) {
    console.log("44444444");
    el.webkitRequestFullscreen();
  } else {
    console.log("没有");
  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 768px) {
  .company-intro {
    width: 100%;
    // padding-bottom: 146px;
    background: url("../../../assets/imgs/pc/about/company01.jpg") no-repeat;
    background-size: 100% 100%;

    .container {
      padding: 74px 20% 200px 10%;
      text-align: left;
      background-color: rgba($color: #000000, $alpha: 0.4);
    }

    .title {
      font-weight: 900;
      font-size: 40px;
      color: #ffffff;
    }

    .en-title {
      width: fit-content;
      margin-top: 13px;
      font-weight: 600;
      font-size: 50px;
      text-transform: uppercase;
      color: #ffffff;
      border-bottom: 1px solid #fff;
    }

    .content {
      margin-top: 28px;
      font-weight: 400;
      font-size: 18px;
      line-height: 35px;
      color: #ffffff;
    }
  }

  .intro-video {
    width: fit-content;
    margin: -150px auto 0;
  }
}

@media screen and (min-width: 1200px) {
  .area-container {
    margin-top: 70px;
    padding: 25px 105px 68px;
    background: url("../../../assets/imgs/pc/about/area.png") no-repeat;
    // background-size: 100% 100%;
    background-size: cover;

    .title {
      font-weight: 900;
      font-size: 40px;
      color: #343434;
      text-align: center;
    }

    .content {
      margin-top: 41px;
      font-weight: 400;
      font-size: 16px;
      line-height: 32px;
      color: #595959;
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1199px) {
  .equipment {
    display: flex;
    flex-direction: column;
  }

  .area-container {
    margin-top: 50px;
    padding: 25px 55px 38px;
    background: url("../../../assets/imgs/pc/about/area.png") no-repeat;
    // background-size: 100% 100%;
    background-size: cover;

    .title {
      font-weight: 900;
      font-size: 40px;
      color: #343434;
      text-align: center;
    }

    .content {
      margin-top: 21px;
      font-weight: 400;
      font-size: 16px;
      line-height: 32px;
      color: #595959;
    }
  }
}

@media screen and (max-width: 767px) {
  .company-intro {
    width: 100%;
    // padding-bottom: 146px;
    background: url("../../../assets/imgs/pc/about/company01.jpg") no-repeat;
    background-size: cover;

    .container {
      padding: 65px 70px 146px 37px;
      text-align: left;
      background-color: rgba($color: #000000, $alpha: 0.4);
    }
    .title {
      font-weight: 900;
      font-size: 24px;
      color: #ffffff;
    }

    .en-title {
      width: fit-content;
      margin-top: 11px;
      font-weight: 600;
      font-size: 26px;
      text-transform: uppercase;
      color: #ffffff;
      border-bottom: 1px solid #fff;
    }

    .content {
      margin-top: 24px;
      font-weight: 400;
      font-size: 14px;
      line-height: 25px;
      color: #ffffff;
    }
  }

  .intro-video {
    width: fit-content;
    margin: -100px auto 0;
  }

  .area-container {
    margin-top: 34px;
    padding: 0 15px;

    .area-main {
      padding: 10px 20px 23px;
      background: url("../../../assets/imgs/phone/about/area.png") no-repeat;
      background-size: 100% 100%;
      .title {
        font-weight: 900;
        font-size: 24px;
        color: #343434;
        text-align: center;
      }

      .content {
        margin-top: 17px;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #595959;
      }
    }
  }

  .grab-nav {
    margin-top: 44px;
  }
}
</style>
