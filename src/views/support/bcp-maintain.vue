<template>
  <!-- <div>支持/BCP使用保养规范</div> -->
  <div v-if="cliWidth > 768" class="eci-main-content">
    <img :src="base_request_url + '/file/' + imgSuUrl" class="top-big-img" />
    <div class="home-title-six"><div>BCP使用保养规范</div></div>
    <div class="font-main" style="text-align: center">
      您可以从视频中详细的了解到，卡特彼勒BCP迷你挖掘机在日常维修保养中的注意事项。
    </div>

    <div class="bcp-video video-content">
      <img src="../../assets/imgs/common/imgBCP.jpg" class="video-img" />
      <img
        class="play-img"
        src="../../assets/imgs/common/play.png"
        @click.stop="showVideo"
      />
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
            :src="base_request_url + '/file/' + videoSu"
            poster="../../assets/imgs/common/imgBCP.jpg"
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
    <div v-if="childSuList.length > 0">
      <div class="tools-list-content">
        <router-link
          v-for="(item, index) in childSuList"
          :key="index"
          class="item"
          :to="{
            path: '/support/fileDetail',
            query: { title: 'BCP使用保养规范', name: item.title },
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
        <div class="home-title-six"><div>BCP使用保养规范</div></div>
        <div class="font-main">
          您可以从视频中详细的了解到，卡特彼勒BCP迷你挖掘机在日常维修保养中的注意事项。
        </div>

        <div class="bcp-video video-content">
          <img src="../../assets/imgs/common/imgBCP.jpg" class="video-img" />
          <img
            class="play-img"
            src="../../assets/imgs/common/play.png"
            @click.stop="showVideo"
          />
        </div>
      </div>

      <div v-if="childSuList.length > 0">
        <div class="support-list-content">
          <router-link
            v-for="(item, index) in childSuList"
            :key="index"
            class="item"
            :to="{
              path: '/support/fileDetail',
              query: { title: 'BCP使用保养规范', name: item.title },
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
            :src="base_request_url + '/file/' + videoSu"
            poster="../../assets/imgs/common/imgBCP.jpg"
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
import { ref } from "vue";
import Header from "@/layouts/header/index.vue";

import { base_request_url } from "@/request/http";
import { getSupportClassify } from "@/utils/utils";
import { nextTick } from "process";

sessionStorage.setItem(
  "BreadcrumbItem",
  JSON.stringify([
    {
      path: "/support",
      name: "支持",
    },
    {
      path: "/support/bcp",
      name: "BCP使用保养规范",
    },
  ])
);

const { imgSuUrl, imgSuPhoneUrl, videoSu, childSuList } =
  await getSupportClassify("支持", "BCP使用保养规范");

const cliWidth = ref(document.documentElement.clientWidth);

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

// 自定义按钮全屏播放
const videoPlay = () => {
  let iframe = document.getElementById("iframe-one");

  requestFullScreen(iframe);
};

/**
 * 进入全屏播放
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
  .bcp-video {
    margin-top: 42px;
  }
}

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

  .bcp-container {
    background-color: #f5f5f5;
  }
  .bcp-video {
    margin-top: 16px;
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

/* video::-webkit-media-controls-enclosure {
  position: fixed;
  z-index: 6;
  bottom: 0;
  left: 0;
}

video::-webkit-media-controls-panel {
} */
</style>
