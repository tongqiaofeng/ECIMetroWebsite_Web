<template>
  <!-- <div>支持/维修支持/维修资源</div> -->
  <div v-if="cliWidth > 768" class="eci-main-content">
    <img :src="base_request_url + '/file/' + imgSuUrl" class="top-big-img" />
    <div class="home-title-six"><div>维修资源</div></div>
    <div class="font-main" v-html="supportContent"></div>
    <div class="bcp-video video-content">
      <img
        src="../../../assets/imgs/common/imgResource.jpg"
        class="video-img"
      />
      <img
        class="play-img"
        src="../../../assets/imgs/common/play.png"
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
            poster="../../../assets/imgs/common/imgResource.jpg"
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
    <div class="classify-two-main">
      <div v-for="item in childSuList" :key="item.id" class="classify-every">
        <router-link
          :to="{
            path: '/support/fileDetail',
            query: {
              title: '维修支持',
              name: '维修资源',
              headline: '维修顾问介绍',
            },
          }"
        >
          <img
            class="classify-img"
            :src="base_request_url + '/file/' + item.imgSort"
          />
          <div class="classify-title">
            <span>维修顾问介绍</span>
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
        <div class="home-title-six"><div>维修资源</div></div>
        <div class="font-main" v-html="supportContent"></div>

        <div class="bcp-video video-content">
          <img
            src="../../../assets/imgs/common/imgResource.jpg"
            class="video-img"
          />
          <img
            class="play-img"
            src="../../../assets/imgs/common/play.png"
            @click.stop="showVideo"
          />
        </div>

        <div class="classify-two-main">
          <div
            v-for="item in childSuList"
            :key="item.id"
            class="classify-every"
          >
            <router-link
              :to="{
                path: '/support/fileDetail',
                query: {
                  title: '维修支持',
                  name: '维修资源',
                  headline: '维修顾问介绍',
                },
              }"
            >
              <img
                class="classify-img"
                :src="base_request_url + '/file/' + item.imgSort"
              />
              <div class="title">
                <span>维修顾问介绍</span>
              </div>
            </router-link>
          </div>
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
            poster="../../../assets/imgs/common/imgResource.jpg"
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
import { ref, nextTick } from "vue";
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
      path: "/support/resource",
      name: "维修资源",
    },
  ])
);

const { supportContent, imgSuUrl, imgSuPhoneUrl, videoSu, childSuList } =
  await getSupportClassify("支持", "维修支持", "维修资源");

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

  .classify-two-main {
    justify-content: center !important;
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

  .classify-two-main {
    justify-content: center !important;
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

  .classify-every {
    .title {
      margin-top: 14px;
      color: #1a1a1a;
      font-weight: bold;
      text-align: center;
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
