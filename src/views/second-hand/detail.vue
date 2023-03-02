<template>
  <!-- <div>产品详情</div> -->
  <div v-if="cliWidth > 1000" class="eci-main-content grab-detail-content">
    <div class="second-nav">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item to="/secondHand/list">二手设备</el-breadcrumb-item>
        <el-breadcrumb-item>{{ productInfo?.model }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="pc-detail-top">
      <div class="detail-top-img" v-if="imgList">
        <div class="big-img">
          <img
            v-show="imgOrVideo == 0"
            class="big-img"
            :src="base_request_url + '/file/' + bigImgUrl"
          />

          <video
            v-show="imgOrVideo == 1"
            class="big-img"
            :src="base_request_url + '/file/' + bigImgUrl"
            controls
            autoplay
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
        <div class="small-img-list">
          <!-- pc端放大镜下缩略图 -->
          <div class="carousel-buttom">
            <div
              class="arrow"
              :style="{
                display:
                  imgList.length + videoList.length > 4 ? 'block' : 'none',
              }"
            >
              <img
                src="../../assets/imgs/pc/common/left.png"
                class="left"
                @click="clickfun(1)"
              />
            </div>
            <div id="buttomitemout">
              <div class="buttomitem" id="buttomitem">
                <div
                  class="buttom-item"
                  v-for="(item, index) in imgList"
                  :key="index"
                >
                  <img
                    class="img"
                    :src="base_request_url + '/file/' + item"
                    @click="showimg(item, 0)"
                  />
                </div>

                <div
                  class="buttom-item"
                  v-for="(item, index) in videoList"
                  :key="index"
                  @click="showimg(item, 1)"
                >
                  <video
                    style="
                      width: 100%;
                      height: 100%;
                      cursor: pointer;
                      object-fit: fill;
                    "
                    :src="base_request_url + '/file/' + item"
                  ></video>
                  <img
                    class="play-img"
                    src="../../assets/imgs/common/play.png"
                  />
                </div>
              </div>
            </div>
            <div class="arrow">
              <img
                style="display: none"
                src="../../assets/imgs/pc/common/right.png"
                class="right"
                @click="clickfun(2)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="top-content">
        <div v-if="productInfo" class="product-detail-content">
          <div class="product-detail-title">
            {{ productInfo.model }}
          </div>
          <div class="product-detail-global-params">
            <div class="global-params-every">
              设备编号：{{ productInfo.recycleEquipmentNo }}
            </div>
            <div class="global-params-every">
              设备类型：{{ productInfo.recycleEquipmentType }}
            </div>
            <div class="global-params-every">
              设备吨级：{{ productInfo.recycleEquipmentTon + "T" }}
            </div>
            <div class="global-params-every">
              工作小时数：{{ productInfo.recycleWorkHours + "H" }}
            </div>
            <div class="global-params-every">
              设备报价：{{ productInfo.recyclePrice }}
            </div>
            <div class="global-params-every">
              付款方式：{{ productInfo.recyclePaymentType }}
            </div>
            <div class="global-params-every">
              出厂年限：{{ productInfo.recycleExFactoryYear }}
            </div>
            <div class="global-params-every">
              所在地：{{ productInfo.recycleArea }}
            </div>
          </div>
          <div class="product-detail-btn-buy">
            <!-- 跳转腾讯企点客服窗口 -->
            <div class="btn-price" @click="askPrice">立即询价</div>
          </div>
        </div>
      </div>
    </div>

    <div class="product-detail-main" v-if="productInfo">
      <van-tabs
        class="activity-tabs-container"
        border
        v-model:active="activeName"
        color="#F5C71B"
        background="#F5F5F5"
      >
        <van-tab title="概览" name="first">
          <div v-html="productInfo.content" class="content"></div>
        </van-tab>
        <van-tab title="产品规格" name="second">
          <div class="tab-detail-global-params">
            <div class="global-params-every">
              <span class="title">设备编号</span>
              {{ productInfo.recycleEquipmentNo }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">设备类型</span>
              {{ productInfo.recycleEquipmentType }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">设备吨级</span>
              {{ productInfo.recycleEquipmentTon + "T" }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">工作小时数</span>
              {{ productInfo.recycleWorkHours + "H" }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">设备报价</span>
              {{ productInfo.recyclePrice }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">付款方式</span>
              {{ productInfo.recyclePaymentType }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">出厂年限</span>
              {{ productInfo.recycleExFactoryYear }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">所在地</span>
              {{ productInfo.recycleArea }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 0', 'border-color': '#d1d1d1' }"
            />
          </div>
        </van-tab>
        <van-tab title="工装机具" name="third">
          <div class="tools-list-content">
            <div
              v-for="(item, index) in productInfo.toolList"
              :key="index"
              class="item"
              @click="checkTools(item)"
            >
              <div class="item-img">
                <img
                  class="img"
                  :src="base_request_url + '/file/' + item.imgUrl"
                />
              </div>
              <div class="name">{{ item.toolName }}</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
  <div v-else-if="cliWidth > 768 && cliWidth < 1001">
    <el-carousel class="my-swipe" :autoplay="false" height="50vh">
      <el-carousel-item v-for="(item, index) of imgList" :key="index">
        <img :src="base_request_url + '/file/' + item" class="swipe-img" />
      </el-carousel-item>
      <el-carousel-item v-for="(item, index) of videoList" :key="index">
        <video
          style="width: 100%; height: 100%; cursor: pointer; object-fit: cover"
          :src="base_request_url + '/file/' + item"
          controls
          preload="auto"
          webkit-playsinline="true"
          playsinline="true"
          x-webkit-airplay="allow"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portraint"
        ></video>
      </el-carousel-item>
    </el-carousel>

    <div class="pc-detail-top">
      <div class="top-content">
        <div v-if="productInfo" class="product-detail-content">
          <div class="product-detail-title">
            {{ productInfo.model }}
          </div>
          <div class="product-detail-global-params">
            <div class="global-params-every">
              设备编号：{{ productInfo.recycleEquipmentNo }}
            </div>
            <div class="global-params-every">
              设备类型：{{ productInfo.recycleEquipmentType }}
            </div>
            <div class="global-params-every">
              设备吨级：{{ productInfo.recycleEquipmentTon + "T" }}
            </div>
            <div class="global-params-every">
              工作小时数：{{ productInfo.recycleWorkHours + "H" }}
            </div>
            <div class="global-params-every">
              设备报价：{{ productInfo.recyclePrice }}
            </div>
            <div class="global-params-every">
              付款方式：{{ productInfo.recyclePaymentType }}
            </div>
            <div class="global-params-every">
              出厂年限：{{ productInfo.recycleExFactoryYear }}
            </div>
            <div class="global-params-every">
              所在地：{{ productInfo.recycleArea }}
            </div>
          </div>
          <div class="product-detail-btn-buy">
            <!-- 跳转腾讯企点客服窗口 -->
            <div class="btn-price" @click="askPrice">立即询价</div>
          </div>
        </div>
      </div>
    </div>

    <div class="product-detail-main" v-if="productInfo">
      <van-tabs
        class="activity-tabs-container"
        border
        v-model:active="activeName"
        color="#F5C71B"
        background="#F5F5F5"
      >
        <van-tab title="概览" name="first">
          <div v-html="productInfo.content" class="content"></div>
        </van-tab>
        <van-tab title="产品规格" name="second">
          <div class="tab-detail-global-params">
            <div class="global-params-every">
              <span class="title">设备编号</span>
              {{ productInfo.recycleEquipmentNo }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">设备类型</span>
              {{ productInfo.recycleEquipmentType }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">设备吨级</span>
              {{ productInfo.recycleEquipmentTon + "T" }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">工作小时数</span>
              {{ productInfo.recycleWorkHours + "H" }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">设备报价</span>
              {{ productInfo.recyclePrice }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">付款方式</span>
              {{ productInfo.recyclePaymentType }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">出厂年限</span>
              {{ productInfo.recycleExFactoryYear }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 40px', 'border-color': '#d1d1d1' }"
            />
            <div class="global-params-every">
              <span class="title">所在地</span>
              {{ productInfo.recycleArea }}
            </div>
            <van-divider
              :style="{ margin: '22px 0 0', 'border-color': '#d1d1d1' }"
            />
          </div>
        </van-tab>
        <van-tab title="工装机具" name="third">
          <div class="tools-list-content">
            <div
              v-for="(item, index) in productInfo.toolList"
              :key="index"
              class="item"
              @click="checkTools(item)"
            >
              <div class="item-img">
                <img
                  class="img"
                  :src="base_request_url + '/file/' + item.imgUrl"
                />
              </div>
              <div class="name">{{ item.toolName }}</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
  <div v-else>
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item v-for="(item, index) of imgList" :key="index">
        <img :src="base_request_url + '/file/' + item" class="swipe-img" />
      </van-swipe-item>
      <van-swipe-item v-for="(item, index) of videoList" :key="index">
        <video
          style="width: 100%; height: 50vh; cursor: pointer; object-fit: fill"
          :src="base_request_url + '/file/' + item"
          controls
          preload="auto"
          webkit-playsinline="true"
          playsinline="true"
          x-webkit-airplay="allow"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          x5-video-orientation="portraint"
        ></video>
      </van-swipe-item>
    </van-swipe>
    <div v-if="productInfo" class="product-detail-content">
      <div class="product-detail-title">
        {{ productInfo.model }}
      </div>
      <div class="product-detail-global-params">
        <div class="global-params-every">
          设备编号：{{ productInfo.recycleEquipmentNo }}
        </div>
        <div class="global-params-every">
          设备类型：{{ productInfo.recycleEquipmentType }}
        </div>
        <div class="global-params-every">
          设备吨级：{{ productInfo.recycleEquipmentTon + "T" }}
        </div>
        <div class="global-params-every">
          工作小时数：{{ productInfo.recycleWorkHours + "H" }}
        </div>
        <div class="global-params-every">
          设备报价：{{ productInfo.recyclePrice }}
        </div>
        <div class="global-params-every">
          付款方式：{{ productInfo.recyclePaymentType }}
        </div>
        <div class="global-params-every">
          出厂年限：{{ productInfo.recycleExFactoryYear }}
        </div>
        <div class="global-params-every">
          所在地：{{ productInfo.recycleArea }}
        </div>
      </div>
      <div class="product-detail-btn-buy">
        <!-- 跳转腾讯企点客服窗口 -->
        <div class="btn-price" @click="askPrice">立即询价</div>
      </div>

      <div class="product-detail-main">
        <van-tabs
          class="activity-tabs-container"
          border
          v-model:active="activeName"
          background="#F5F5F5"
          line-height="0"
        >
          <van-tab title="概览" name="first">
            <div class="content" v-html="productInfo.content"></div>
          </van-tab>
          <van-tab title="产品规格" name="second">
            <div class="tab-detail-global-params">
              <div class="global-params-every">
                <span class="title">设备编号</span>
                {{ productInfo.recycleEquipmentNo }}
              </div>
              <van-divider
                :style="{ margin: '14px 0 24px', 'border-color': '#d1d1d1' }"
              />
              <div class="global-params-every">
                <span class="title">设备类型</span>
                {{ productInfo.recycleEquipmentType }}
              </div>
              <van-divider
                :style="{ margin: '14px 0 24px', 'border-color': '#d1d1d1' }"
              />
              <div class="global-params-every">
                <span class="title">设备吨级</span>
                {{ productInfo.recycleEquipmentTon + "T" }}
              </div>
              <van-divider
                :style="{ margin: '14px 0 24px', 'border-color': '#d1d1d1' }"
              />
              <div class="global-params-every">
                <span class="title">工作小时数</span>
                {{ productInfo.recycleWorkHours + "H" }}
              </div>
              <van-divider
                :style="{ margin: '14px 0 24px', 'border-color': '#d1d1d1' }"
              />
              <div class="global-params-every">
                <span class="title">设备报价</span>
                {{ productInfo.recyclePrice }}
              </div>
              <van-divider
                :style="{ margin: '14px 0 24px', 'border-color': '#d1d1d1' }"
              />
              <div class="global-params-every">
                <span class="title">付款方式</span>
                {{ productInfo.recyclePaymentType }}
              </div>
              <van-divider
                :style="{ margin: '14px 0 24px', 'border-color': '#d1d1d1' }"
              />
              <div class="global-params-every">
                <span class="title">出厂年限</span>
                {{ productInfo.recycleExFactoryYear }}
              </div>
              <van-divider
                :style="{ margin: '14px 0 24px', 'border-color': '#d1d1d1' }"
              />
              <div class="global-params-every">
                <span class="title">所在地</span>
                {{ productInfo.recycleArea }}
              </div>
              <van-divider
                :style="{ margin: '14px 0 0', 'border-color': '#d1d1d1' }"
              />
            </div>
          </van-tab>
          <van-tab title="工装机具" name="third">
            <div class="product-list-content tools">
              <router-link
                v-for="(item, index) in productInfo.toolList"
                :key="index"
                class="item"
                :to="{
                  path: '/product/workTools',
                  query: { id: item.id },
                }"
              >
                <div class="img">
                  <img
                    class="img"
                    :src="base_request_url + '/file/' + item.imgUrl"
                  />
                </div>
                <div class="name">{{ item.toolName }}</div>
              </router-link>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { Toast } from "vant";
import "vant/es/toast/style";

import { base_request_url } from "@/request/http";
import { productInfoPort } from "@/request/api/product";
import { IProductDetail } from "@/types/global";
import _sessionStorage from "@/utils/sessionStorage";

import NativeShare from "nativeshare";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const activeName = ref("first");

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  // 窗口大小发生改变时,调用一次
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };
});

// 分享网站
const shareWebsitesite = () => {
  console.log(navigator);
  console.log(route);

  if (navigator.share) {
    console.log("分享1111");
    navigator.share({
      title: productInfo.value?.model,
      text: productInfo.value?.model,
      url: window.location.href,
    });
  } else {
    console.log("分享222");
    let nativeShare = new NativeShare();

    nativeShare.setShareData({
      title: productInfo.value?.model,
      desc: productInfo.value?.model,
      link: window.location.href,
    });

    try {
      console.log("分享333");
      nativeShare.call("default"); //
      // 如果是分享到微信则需要 nativeShare.call('wechatFriend')
      // 类似的命令有
      //  default 默认，调用起底部的分享组件，当其他命令不支持的时候也会调用该命令
      //  wechatTimeline 分享到朋友圈
      //  wechatFriend 分享给微信好友
      //  qqFriend 分享给QQ好友
      //  qZone 分享到QQ空间
      //  weibo 分享到微博
    } catch (err) {
      // 如果不支持，你可以在这里做降级处理
      Toast.fail("此浏览器不支持分享功能");
    }
  }
};

// 工装机具详情
const checkTools = (item: any) => {
  console.log(item);

  router.push({
    path: "/product/workTools",
    query: { id: item.id },
  });

  sessionStorage.setItem(
    "BreadcrumbItem",
    JSON.stringify([
      {
        path: "/secondHand/list",
        name: "二手设备",
      },
      {
        path: "/secondHand/detail",
        query: {
          productId: route.query.productId,
        },
        name: productInfo.value?.model,
      },
    ])
  );
};

// 立即询价
const askPrice = () => {
  document.getElementById("ECIM001")?.click();
};

// 获取产品详情
const imgList = ref<string[]>([]);
const videoList = ref<string[]>([]);
const bigImgUrl = ref("");
const productInfo = ref<IProductDetail | null>(null);

let id = route.query.productId;
const getProductInfo = (id: any) => {
  productInfoPort({
    id,
  }).then((res) => {
    console.log("产品详情", res);

    productInfo.value = res.data.data;
    if (productInfo.value?.imgUrl) {
      imgList.value = productInfo.value?.imgUrl.split("|");
      bigImgUrl.value = imgList.value[0];

      if (productInfo.value.videoUrl) {
        videoList.value = productInfo.value?.videoUrl.split("|");
      }

      nextTick(() => {
        console.log("轮播图组件", imgList.value);
        if (
          cliWidth.value > 768 &&
          (imgList.value.length + videoList.value.length) / 4 > 1
        ) {
          const classleft = document.getElementsByClassName(
            "left"
          )[0] as HTMLElement;
          classleft.style.display = "block";
        }
      });
    }
    if (productInfo.value?.content) {
      productInfo.value.content = productInfo.value.content.replaceAll(
        "/_file_/",
        base_request_url + "/file/"
      );
    }
  });
};
getProductInfo(id);

const num = ref(1);
const pxnum = ref(0);
const imgOrVideo = ref(0);
const showimg = (val: string, num: number) => {
  bigImgUrl.value = val;
  imgOrVideo.value = num;
};
//pc端 bottom图片 左右点击按钮切换图片
const clickfun = (val: number) => {
  // 判断div左右移动
  const getElement: any = document.getElementById("buttomitem")?.style;
  const classleft = document.getElementsByClassName("left")[0] as HTMLElement;
  const classright = document.getElementsByClassName("right")[0] as HTMLElement;
  const count = (imgList.value.length + videoList.value.length) / 4;
  if (val == 1 && count > 1 && num.value < count) {
    pxnum.value = -42 + pxnum.value;
    getElement.marginLeft = pxnum.value + "vw";
    num.value++;
    console.log("左", pxnum.value);
  } else if (val == 2 && count > 1 && num.value > 1) {
    console.log(pxnum.value);
    pxnum.value = 42 + pxnum.value;
    getElement.marginLeft = pxnum.value + "vw";
    num.value--;
    console.log("右", pxnum.value);
  }
  //左右点击事件手性判断
  if (num.value < Math.floor(count)) {
    classleft.style.display = "block";
  }
  if (num.value > 1 && count > 1) {
    classright.style.display = "block";
  }
  if (num.value == 1) {
    classright.style.display = "none";
    if (count > 1) {
      classleft.style.display = "block";
    }
  }
  if (num.value == Math.floor(count + 1)) {
    classleft.style.display = "none";
  }
};
</script>

<style scoped lang="scss">
@media screen and (min-width: 1001px) {
  .second-nav {
    margin-bottom: 50px;
  }

  .pc-detail-top {
    display: flex;

    .detail-top-img {
      width: 55%;
      margin-right: 60px;

      .big-img {
        width: 100%;
        max-width: 722px;
        height: auto;
        max-height: 540px;
        object-fit: contain;
      }
    }

    .top-content {
      width: 45%;

      .product-detail-content {
        padding-bottom: 20px;

        .product-detail-title {
          margin-bottom: 10px;
          padding-bottom: 30px;
          font-weight: bold;
          font-size: 24px;
          line-height: 20px;
          text-align: left;
          color: #1a1a1a;
          border-bottom: 1px solid #cfd0d1;
        }

        .product-detail-global-params {
          .global-params-every {
            padding-top: 20px;
            font-weight: 400;
            font-size: 16px;
            line-height: 14px;
            color: #4d4d4d;
          }
        }

        .product-detail-btn-down {
          margin-top: 30px;
          display: flex;
          flex-wrap: wrap;

          .btn-down-every {
            width: 145px;
            height: 42px;
            margin-right: 12px;
            margin-bottom: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f5f5f5;
            border: 1px solid #e6e6e6;
            box-sizing: border-box;
            font-weight: 400;
            font-size: 12px;
            color: #1a1a1a;
            cursor: pointer;

            img {
              width: 18px;
              height: 18px;
              margin-right: 8px;
            }
          }

          .two {
            width: 128px;
          }

          .three {
            width: 117px;
          }
        }

        .product-detail-btn-buy {
          margin-top: 70px;
          display: flex;
          // flex-wrap: wrap;

          .btn-price {
            display: block;
            width: 158px;
            height: 52px;
            margin-right: 12px;
            font-weight: 400;
            font-size: 18px;
            line-height: 52px;
            text-align: center;
            cursor: pointer;
            box-sizing: border-box;
            background: #fff9e6;
            border: 1px solid #f5c71b;
            color: #ebb000;
          }

          .btn-share {
            width: 105px;
            height: 52px;
            margin-bottom: 12px;
            font-weight: 400;
            font-size: 18px;
            line-height: 52px;
            text-align: center;
            color: #1a1a1a;
            border: 1px solid #1a1a1a;
            cursor: pointer;
            box-sizing: border-box;
          }
        }
      }
    }
  }

  .product-detail-main {
    margin-top: 50px;

    .content {
      margin-top: 60px;
    }

    .detail-main {
      .engine {
        display: flex;
        justify-content: space-between;

        .title {
          width: 33.33%;
          font-weight: 400;
          font-size: 20px;
          color: #1a1a1a;
        }

        .engine-params {
          width: 66.66%;

          .params-every {
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;

            .params {
              width: 50%;
              text-align: right;
              font-weight: 400;
              font-size: 16px;
              color: #595959;
            }

            .parameter {
              text-align: left;
            }
          }
        }
      }
    }
  }

  .tab-detail-global-params {
    width: 80%;
    max-width: 920px;
    margin: 60px auto 0;

    .global-params-every {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #1a1a1a;

      .title {
        font-size: 16px;
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1000px) {
  .second-nav {
    margin-bottom: 50px;
  }

  .pc-detail-top {
    padding: 0 15px;
    .top-content {
      .product-detail-content {
        margin-top: 40px;
        padding-bottom: 20px;

        .product-detail-title {
          margin-bottom: 10px;
          padding-bottom: 30px;
          font-weight: bold;
          font-size: 24px;
          line-height: 20px;
          text-align: left;
          color: #1a1a1a;
          border-bottom: 1px solid #cfd0d1;
        }

        .product-detail-global-params {
          .global-params-every {
            padding-top: 20px;
            font-weight: 400;
            font-size: 16px;
            line-height: 14px;
            color: #4d4d4d;
          }
        }

        .product-detail-btn-down {
          margin-top: 30px;
          display: flex;
          flex-wrap: wrap;

          .btn-down-every {
            width: 145px;
            height: 42px;
            margin-right: 12px;
            margin-bottom: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f5f5f5;
            border: 1px solid #e6e6e6;
            box-sizing: border-box;
            font-weight: 400;
            font-size: 12px;
            color: #1a1a1a;
            cursor: pointer;

            img {
              width: 18px;
              height: 18px;
              margin-right: 8px;
            }
          }

          .two {
            width: 128px;
          }

          .three {
            width: 117px;
          }
        }

        .product-detail-btn-buy {
          margin-top: 70px;
          display: flex;
          // flex-wrap: wrap;

          .btn-price {
            display: block;
            width: 158px;
            height: 52px;
            margin-right: 12px;
            font-weight: 400;
            font-size: 18px;
            line-height: 52px;
            text-align: center;
            cursor: pointer;
            box-sizing: border-box;
            background: #fff9e6;
            border: 1px solid #f5c71b;
            color: #ebb000;
          }

          .btn-share {
            width: 105px;
            height: 52px;
            margin-bottom: 12px;
            font-weight: 400;
            font-size: 18px;
            line-height: 52px;
            text-align: center;
            color: #1a1a1a;
            border: 1px solid #1a1a1a;
            cursor: pointer;
            box-sizing: border-box;
          }
        }
      }
    }
  }

  .product-detail-main {
    padding: 0 15px;
    margin-top: 50px;

    .content {
      margin-top: 60px;
    }

    .detail-main {
      .engine {
        display: flex;
        justify-content: space-between;

        .title {
          width: 33.33%;
          font-weight: 400;
          font-size: 20px;
          color: #1a1a1a;
        }

        .engine-params {
          width: 66.66%;

          .params-every {
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;

            .params {
              width: 50%;
              text-align: right;
              font-weight: 400;
              font-size: 16px;
              color: #595959;
            }

            .parameter {
              text-align: left;
            }
          }
        }
      }
    }
  }

  .tab-detail-global-params {
    width: 80%;
    max-width: 920px;
    margin: 60px auto 0;

    .global-params-every {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #1a1a1a;

      .title {
        font-size: 16px;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .product-detail-content {
    padding-bottom: 20px;
    .product-detail-title {
      margin: 30px 0 0 15px;
      padding-bottom: 20px;
      font-weight: 900;
      font-size: 20px;
      line-height: 20px;
      text-align: left;
      color: #1a1a1a;
      border-bottom: 1px solid #cfd0d1;
    }

    .product-detail-global-params {
      padding-top: 4px;
      padding-left: 15px;
      .global-params-every {
        margin-top: 16px;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
        color: #4d4d4d;
      }
    }
    .product-detail-btn-buy {
      margin-top: 32px;
      padding-left: 15px;
      display: flex;

      .btn-price {
        display: block;
        width: 110px;
        height: 44px;
        margin-right: 8px;
        font-weight: 700;
        font-size: 14px;
        line-height: 44px;
        text-align: center;
        box-sizing: border-box;
        background: #fff9e6;
        border: 1px solid #f5c71b;
        color: #ebb000;
      }

      .btn-share {
        width: 80px;
        height: 44px;
        font-weight: 700;
        font-size: 14px;
        line-height: 44px;
        text-align: center;
        color: #1a1a1a;
        border: 1px solid #1a1a1a;
        cursor: pointer;
        box-sizing: border-box;
      }
    }

    .product-detail-main {
      margin-top: 50px;

      .content {
        margin-top: 30px;
        padding: 0 15px;
      }

      .detail-main {
        padding: 0 15px;

        .engine {
          display: flex;
          justify-content: space-between;

          .title {
            width: 33.33%;
            font-weight: 400;
            font-size: 14px;
            color: #1a1a1a;
          }

          .engine-params {
            width: 66.66%;
            .params-every {
              margin-bottom: 24px;
              display: flex;
              justify-content: space-between;
              .params {
                width: 50%;
                text-align: right;
                font-weight: 400;
                font-size: 13px;
                color: #595959;
              }

              .parameter {
                text-align: left;
              }
            }
          }
        }
      }

      .tools {
        padding: 0 15px;
        margin-top: 40px;
      }
    }
  }

  .tab-detail-global-params {
    margin-top: 30px;
    padding: 0 15px;

    .global-params-every {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #1a1a1a;
    }
  }
}
</style>
