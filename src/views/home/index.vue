<template>
  <!-- 首页 -->
  <div v-show="cliWidth > 990" class="pc-container">
    <el-carousel
      :interval="3000"
      arrow="always"
      :height="bannerHeight + 'px'"
      class="my-carousel"
      ref="carousel"
    >
      <el-carousel-item v-for="(item, index) of imgList" :key="index">
        <a
          :href="item.indexLink ? item.indexLink : 'javascript:void(0);'"
          :target="item.indexLink ? '_blank' : '_self'"
          ><img
            :src="base_request_url + '/file/' + item.indexImgPc"
            class="carousel-img"
        /></a>
      </el-carousel-item>
    </el-carousel>
    <div class="recommendation">
      <div class="home-title-six">
        <div>快速查找</div>
      </div>
      <div class="recommendation-classify">
        <div class="left">
          <router-link to="/product/grab">
            <div class="recomm-every left-top">
              <div class="title-position">
                <div class="title">Cat<span>®</span>(卡特)设备</div>
              </div>
            </div>
          </router-link>

          <router-link :to="{ path: '/alliance', query: { name: '山工机械' } }">
            <div class="recomm-every left-bottom">
              <div class="title-position">山工机械</div>
            </div>
          </router-link>
        </div>
        <div class="center">
          <router-link to="/lease">
            <div class="recomm-every center-top">
              <div class="title-position">租赁业务</div>
            </div>
          </router-link>
          <a href="https://www.catpeijian.cn/zh-CN/ecim" target="_blank">
            <div class="recomm-every center-bottom">
              <div class="title-position">零件</div>
            </div>
          </a>
        </div>
        <div class="right">
          <router-link to="/product/power">
            <div class="recomm-every right-top">
              <div class="title-position">动力设备</div>
            </div>
          </router-link>

          <router-link to="/secondHand/list">
            <div class="recomm-every right-center">
              <div class="title-position">二手设备</div>
            </div>
          </router-link>

          <router-link to="/support/maintain">
            <div class="recomm-every right-bottom">
              <div class="title-position">报修</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="activity">
      <div class="activity-top">
        <div class="home-title-six"><div>新闻与活动</div></div>

        <router-link
          class="btn"
          :to="{ path: '/activity/list', query: { id: activityId } }"
        >
          更多活动
        </router-link>
      </div>

      <div class="activity-main">
        <div
          class="activity-every"
          v-for="(item, index) of activityList"
          :key="index"
          @click="checkNewsDetail(item, 1)"
        >
          <img
            class="img"
            :src="base_request_url + '/file/' + item.coverPhoto"
          />
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="company-intro">
      <div class="container">
        <div class="title">公司介绍</div>
        <div class="en-title">Company Profile</div>
        <div class="content">
          易初明通集团是由泰国明通机械设备有限公司和易初工业集团投资有限公司共同创建的合资企业。
        </div>
        <router-link to="/about/company" class="btn">了解详情</router-link>
      </div>
    </div>

    <div class="customer-story">
      <div class="story-title">客户故事</div>
      <div class="story-main">
        <div
          v-for="(item, index) of customerStoryList"
          :key="item.id"
          :style="{
            'margin-top':
              index == 0 || index == 2 ? '69px' : index == 4 ? '-69px' : 0,
          }"
          class="story-every"
          @click="checkNewsDetail(item, 2)"
        >
          <div class="img">
            <img
              :src="base_request_url + '/file/' + item.coverPhoto"
              class="img"
            />
          </div>
          <div class="title">
            <div class="font">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <router-link
        :to="{ path: '/activity/list', query: { id: customerId } }"
        class="more"
        >了解更多</router-link
      >
    </div>
  </div>
  <div v-show="cliWidth > 768 && cliWidth < 991">
    <div class="pc-container">
      <el-carousel
        :interval="3000"
        arrow="always"
        :height="bannerHeight + 'px'"
        class="my-carousel"
        ref="carousel"
      >
        <el-carousel-item v-for="(item, index) of imgList" :key="index">
          <a
            :href="item.indexLink ? item.indexLink : 'javascript:void(0);'"
            :target="item.indexLink ? '_blank' : '_self'"
            ><img
              :src="base_request_url + '/file/' + item.indexImgPc"
              class="carousel-img"
          /></a>
        </el-carousel-item>
      </el-carousel>
      <div class="recommendation">
        <div class="home-title-six"><div>快速查找</div></div>
        <div class="recommendation-classify">
          <div class="left">
            <router-link to="/product/grab">
              <div class="recomm-every left-top">
                <div class="title-position">
                  <div class="title">Cat<span>®</span>(卡特)设备</div>
                </div>
              </div>
            </router-link>
            <router-link
              :to="{ path: '/alliance', query: { name: '山工机械' } }"
            >
              <div class="recomm-every left-bottom">
                <div class="title-position">山工机械</div>
              </div>
            </router-link>
          </div>
          <div class="center">
            <router-link to="/lease">
              <div class="recomm-every center-top">
                <div class="title-position">租赁业务</div>
              </div>
            </router-link>
            <a href="https://www.catpeijian.cn/zh-CN/ecim" target="_blank">
              <div class="recomm-every center-bottom">
                <div class="title-position">零件</div>
              </div>
            </a>
          </div>
          <div class="right">
            <router-link to="/product/power">
              <div class="recomm-every right-top">
                <div class="title-position">动力设备</div>
              </div>
            </router-link>

            <router-link to="/secondHand/list">
              <div class="recomm-every right-center">
                <div class="title-position">二手设备</div>
              </div>
            </router-link>

            <router-link to="/support/maintain">
              <div class="recomm-every right-bottom">
                <div class="title-position">报修</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="activity">
        <div class="activity-top">
          <div class="home-title-six"><div>新闻与活动</div></div>

          <router-link
            class="btn"
            :to="{ path: '/activity/list', query: { id: activityId } }"
          >
            更多活动
          </router-link>
        </div>

        <div class="activity-main">
          <div
            class="activity-every"
            v-for="(item, index) of activityList"
            :key="index"
            @click="checkNewsDetail(item, 1)"
          >
            <img
              class="img"
              :src="base_request_url + '/file/' + item.coverPhoto"
            />
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="company-intro">
        <div class="container">
          <div class="title">公司介绍</div>
          <div class="en-title">Company Profile</div>
          <div class="content">
            易初明通集团是由泰国明通机械设备有限公司和易初工业集团投资有限公司共同创建的合资企业。
          </div>
          <router-link to="/about/company" class="btn">了解详情</router-link>
        </div>
      </div>

      <div class="customer-story">
        <div class="story-title">客户故事</div>
        <div class="story-main">
          <div
            v-for="(item, index) of customerStoryList"
            :key="item.id"
            :style="{
              'margin-top':
                index == 0 || index == 2 ? '40px' : index == 4 ? '-40px' : 0,
            }"
            class="story-every"
            @click="checkNewsDetail(item, 2)"
          >
            <div class="img">
              <img
                :src="base_request_url + '/file/' + item.coverPhoto"
                class="img"
              />
            </div>
            <div class="title">
              <div class="font">{{ item.title }}</div>
            </div>
          </div>
        </div>
        <router-link
          :to="{ path: '/activity/list', query: { id: customerId } }"
          class="more"
          >了解更多</router-link
        >
      </div>
    </div>

    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>
  <div v-show="cliWidth < 768">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) of imgList" :key="index">
        <a
          :href="item.indexLink ? item.indexLink : 'javascript:void(0);'"
          :target="item.indexLink ? '_blank' : '_self'"
          ><img
            :src="base_request_url + '/file/' + item.indexImgMobile"
            style="width: 100%; height: auto"
        /></a>
      </van-swipe-item>
    </van-swipe>

    <div class="home-container">
      <div class="recommendation">
        <div class="home-title-six"><div>精品推荐</div></div>
        <div class="recommendation-classify">
          <div class="left">
            <router-link to="/product/grab">
              <div class="recomm-every left-top">
                <div class="title-position">
                  <div class="title">Cat<span>®</span>(卡特)设备</div>
                </div>
              </div>
            </router-link>
            <router-link
              :to="{ path: '/alliance', query: { name: '山工机械' } }"
            >
              <div class="recomm-every left-bottom">
                <div class="title-position">山工机械</div>
              </div>
            </router-link>
          </div>
          <div class="center">
            <router-link to="/lease">
              <div class="recomm-every center-top">
                <div class="title-position">租赁业务</div>
              </div>
            </router-link>
            <a href="https://www.catpeijian.cn/zh-CN/ecim" target="_blank">
              <div class="recomm-every center-bottom">
                <div class="title-position">零件</div>
              </div>
            </a>
          </div>
          <div class="right">
            <router-link to="/product/power">
              <div class="recomm-every right-top">
                <div class="title-position">动力设备</div>
              </div>
            </router-link>

            <router-link to="/secondHand/list">
              <div class="recomm-every right-center">
                <div class="title-position">二手设备</div>
              </div>
            </router-link>

            <router-link to="/support/maintain">
              <div class="recomm-every right-bottom">
                <div class="title-position">报修</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="activity">
        <div class="home-title-six"><div>新闻与活动</div></div>

        <div class="activity-main">
          <van-swipe
            class="my-home-swipe"
            :autoplay="3000"
            indicator-color="white"
          >
            <van-swipe-item v-for="(item, index) of activityList" :key="index">
              <div
                class="swipe-acti"
                :style="{
                  'background-image':
                    'url(' +
                    base_request_url +
                    '/file/' +
                    item.coverPhoto +
                    ')',
                }"
                @click="checkNewsDetail(item, 1)"
              >
                <div class="title">{{ item.title }}</div>
              </div>
            </van-swipe-item>
            <template #indicator="{ active, total }">
              <div class="custom-indicator">
                <div
                  class="line"
                  :style="{
                    'background-color':
                      active + 1 == item ? '#1a1a1a' : '#B3B3B3',
                  }"
                  v-for="item in total"
                  :key="item"
                ></div>
              </div>
            </template>
          </van-swipe>
        </div>
      </div>
      <div class="company-intro">
        <div class="container">
          <div class="title">公司介绍</div>
          <div class="en-title">Company Profile</div>
          <div class="content">
            易初明通集团是由泰国明通机械设备有限公司和易初工业集团投资有限公司共同创建的合资企业。
          </div>
          <router-link to="/about/company" class="btn">了解详情</router-link>
        </div>
      </div>

      <div class="customer-story">
        <div class="story-title">客户故事</div>
        <div class="story-main">
          <div
            v-for="(item, index) of customerStoryList"
            :key="item.id"
            class="story-every"
            :style="{
              'margin-top': index == 0 ? '40px' : index == 3 ? '-40px' : 0,
            }"
            @click="checkNewsDetail(item, 2)"
          >
            <div class="img">
              <img
                :src="base_request_url + '/file/' + item.coverPhoto"
                class="img"
              />
            </div>
            <div class="title">
              <div class="font">{{ item.title }}</div>
            </div>
          </div>
        </div>

        <router-link
          :to="{ path: '/activity/list', query: { id: customerId } }"
          class="more"
          >了解更多</router-link
        >
      </div>

      <div class="contact-us">
        <div class="home-title-six"><div>联系我们</div></div>
        <div class="contact-every" @click="codeShow = true">
          <img src="../../assets/imgs/common/official.jpg" class="qr-code" />
          <div class="line"></div>
          <div class="title-label">
            <div class="name">官方服务平台</div>
            <div class="label">扫一扫加入官方微信</div>
          </div>

          <img
            class="small-img"
            src="../../assets/imgs/phone/home/people.png"
          />
        </div>
        <van-dialog
          v-if="codeShow"
          v-model:show="codeShow"
          :show-confirm-button="false"
          :closeOnClickOverlay="true"
          title="官方服务平台"
        >
          <div class="code-img-dialog">
            <img
              src="../../assets/imgs/common/official.jpg"
              class="code-img-big"
            />
          </div>
        </van-dialog>

        <div class="contact-every" @click="downloadClick">
          <img src="../../assets/imgs/common/app.png" class="qr-code" />
          <div class="line"></div>
          <div class="title-label">
            <div class="name">点击下载</div>
            <div class="label">再多设备，一个App就够了</div>
          </div>
          <img class="small-img" src="../../assets/imgs/phone/home/down.png" />
        </div>
        <div class="contact-every" @click="openWechat">
          <img src="../../assets/imgs/common/shop.png" class="qr-code" />
          <div class="line"></div>
          <div class="title-label">
            <div class="name">点击下单</div>
            <div class="label">整机商城小程序一站式购物</div>
          </div>
          <img class="small-img" src="../../assets/imgs/phone/home/car.png" />
        </div>
        <a
          href="https://www.catpeijian.cn/zh-CN/ecim?dealer=ecim&cl_sr=owned&cl_ctnm=ecimposter&cl_source1=ecim_m"
          target="_blank"
          class="contact-every"
        >
          <img src="../../assets/imgs/common/accessories.jpg" class="qr-code" />
          <div class="line"></div>
          <div class="title-label">
            <div class="name">零件商城</div>
            <div class="label">点击进入零件商城</div>
          </div>
          <img class="small-img" src="../../assets/imgs/phone/home/car.png" />
        </a>
      </div>
    </div>

    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import { Dialog, Toast } from "vant";
import "vant/es/dialog/style";
import "vant/es/toast/style";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "vue-router";

import { base_request_url } from "@/request/http";
import { IActivity } from "@/types/global";
import { articlePort, articleTypePort } from "@/request/api/activity";
import { contactMsgPort } from "@/request/api/system";

import Header from "@/layouts/header/index.vue";
import { getProductClassify } from "@/utils/utils";

const { childList } = await getProductClassify("联盟产品");
console.log(childList.value);

const VanDialog = Dialog.Component;

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  setSize();
  // 窗口大小发生改变时,调用一次
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
    setSize();
  };
});

const bannerHeight = ref(0);
const setSize = () => {
  // 通过图片宽度计算高度
  nextTick(() => {
    let width = 0;
    if (cliWidth.value > 990) {
      width = document.getElementsByClassName("pc-container")[0].clientWidth;
    } else {
      width = document.getElementsByClassName("pc-container")[3].clientWidth;
    }

    bannerHeight.value = (width * 430) / 1284;

    console.log(bannerHeight.value);
  });
};

const codeShow = ref(false);

// 查看新闻详情
const router = useRouter();
const checkNewsDetail = (item: any, val: number) => {
  if (val == 1) {
    sessionStorage.setItem(
      "BreadcrumbItem",
      JSON.stringify([
        {
          path: "/activity/list",
          query: { id: activityId.value },
          name: "新闻与活动",
        },
      ])
    );
  } else if (val == 2) {
    sessionStorage.setItem(
      "BreadcrumbItem",
      JSON.stringify([
        {
          path: "/activity/list",
          query: { id: customerId.value },
          name: "客户故事",
        },
      ])
    );
  }

  if (item.source === 0) {
    router.push({ path: "/activity/detail", query: { newsId: item.id } });
  } else {
    window.open(item.content);
  }
};

// 获取APP下载地址及小程序打开链接
let downLinkMsg: any;
const getLinkMsg = () => {
  contactMsgPort().then((res) => {
    console.log("APP下载地址及小程序打开链接", res);
    downLinkMsg = res.data.data;
  });
};
getLinkMsg();

const openWechat = () => {
  if (downLinkMsg.openLink) {
    location.href = downLinkMsg.openLink;
  } else {
    Toast("小程序正在升级维护，请稍后重试~");
  }
};

// 获取logo、轮播图片等
const imgList = ref();
let system: any;
const userStore = useUserStore();
if (userStore.systemMsg) {
  system = JSON.parse(userStore.systemMsg);
  imgList.value = system.indexMsg;
}

// 下载app
const downloadClick = () => {
  Toast.loading({
    duration: 0,
    forbidClick: true,
    overlay: true,
    message: "APP后台下载中...",
  });

  setInterval(() => {
    Toast.clear();
  }, 1500);

  let userAgentInfo = navigator.userAgent;
  if (userAgentInfo.match(/(iPhone|iPod|iPad);?/i)) {
    download(downLinkMsg.iosLink);
  } else if (userAgentInfo.match(/android/i)) {
    download(downLinkMsg.androidLink);
  }
};
const download = (url: string) => {
  if (browserIsIe()) {
    //假如是ie浏览器
    let elemIF = document.createElement("iframe");
    elemIF.src = url;
    elemIF.style.display = "none";
    document.body.appendChild(elemIF);
  } else {
    const a = document.createElement("a");
    // a.setAttribute('target', '_blank');
    a.setAttribute("href", url);
    a.setAttribute("download", "易初明通");
    a.click();
  }
};
//判断是否为ie浏览器
const browserIsIe = () => {
  if (!!(window as any).ActiveXObject || "ActiveXObject" in window) return true;
  else return false;
};

// 获取活动列表
const activityList = ref<IActivity[]>([]);
const customerStoryList = ref<IActivity[]>([]);
const activityId = ref();
const customerId = ref();
const getActivityList = (val: number, type: string) => {
  let num = 0;
  if (type == "新闻与活动") {
    if (cliWidth.value > 768) {
      num = 3;
    } else {
      num = 4;
    }
  } else {
    if (cliWidth.value > 768) {
      num = 6;
    } else {
      num = 4;
    }
  }

  articlePort({
    keyword: "",
    page: 1,
    pageNum: num,
    // source: 0,
    type: val,
  }).then((res) => {
    console.log("活动列表", res);

    if (type == "新闻与活动") {
      activityId.value = val;
      activityList.value = res.data.data.list;
    } else {
      customerId.value = val;
      customerStoryList.value = res.data.data.list;
    }
  });
};

// 获取活动分类
interface IType {
  id: number;
  typeName: string;
}
const typeList = ref<IType[]>([]);
const getTypeList = () => {
  articleTypePort().then((res) => {
    console.log("活动分类11111111111", res);
    typeList.value = res.data.data;

    for (const item of typeList.value) {
      if (item.typeName == "新闻与活动") {
        getActivityList(item.id, "新闻与活动");
      }

      if (item.typeName == "客户故事") {
        getActivityList(item.id, "客户故事");
      }
    }
  });
};
getTypeList();
</script>

<style lang="scss" scoped>
.home-title-six {
  background: url("../../assets/imgs/pc/common/titleBack4.png") no-repeat 100%;
  background-size: 100% 100%;
}

// PC端
@media screen and (min-width: 1300px) {
  .pc-container {
    width: 75%;
    max-width: 1284px;
    margin: 0 auto;
    margin-bottom: 120px;
  }
}

@media screen and (max-width: 1299px) {
  .pc-container {
    width: 85%;
    margin: 0 auto;
    margin-bottom: 120px;
  }
}

@media screen and (min-width: 1200px) {
  .home-title-six {
    margin-top: 63px;
    margin-bottom: 27px;

    div {
      padding: 16px 4px 19px 10px;
    }
  }
  .recommendation {
    .recommendation-classify {
      .left {
        .left-top {
          height: 440px;
        }

        .left-bottom {
          height: 367px;
        }
      }

      .center {
        .center-top {
          height: 367px;
        }

        .center-bottom {
          height: 440px;
        }
      }

      .right {
        .right-top {
          height: 260px;
        }

        .right-center {
          height: 260px;
        }

        .right-bottom {
          height: 260px;
        }
      }
    }
  }

  .company-intro {
    .container {
      padding: 101px 0 70px 134px;
    }
  }

  .customer-story {
    padding: 82px 81px 80px;
    .story-every {
      height: 270px;

      .font {
        padding-left: 22px;
        padding-right: 34px;
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1199px) {
  .home-title-six {
    margin-top: 43px;
    margin-bottom: 17px;

    div {
      padding: 12px 4px 15px 8px;
    }
  }

  .recommendation {
    .recommendation-classify {
      .left {
        .left-top {
          height: 320px;
        }

        .left-bottom {
          height: 267px;
        }
      }

      .center {
        .center-top {
          height: 257px;
        }

        .center-bottom {
          height: 330px;
        }
      }

      .right {
        .right-top {
          height: 190px;
        }

        .right-center {
          height: 185px;
        }

        .right-bottom {
          height: 185px;
        }
      }
    }
  }

  .company-intro {
    .container {
      padding: 101px 0 70px 80px;
    }
  }

  .customer-story {
    padding: 42px 41px 40px;
    .story-every {
      height: 180px;

      .font {
        padding-left: 12px;
        padding-right: 14px;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .recommendation {
    .recommendation-classify {
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(auto-fill, 32%);

      .recomm-every {
        // width: 109px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        .title-position {
          width: 100%;
          height: 150px;
          padding-left: 32px;
          padding-bottom: 35px;
          font-weight: bold;
          font-size: 24px;
          color: #ffffff;
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          background: linear-gradient(
            0deg,
            rgba(26, 26, 26, 0.8) 0%,
            rgba(26, 26, 26, 0) 100%
          );

          .title {
            display: flex;
            align-items: flex-start;

            span {
              font-size: 16px;
            }
          }
        }
      }
    }
  }

  .activity {
    .activity-top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .btn {
        width: 90px;
        height: 40px;
        margin-top: 43px;
        line-height: 40px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        font-size: 14px;
        color: #1a1a1a;
        border: 1px solid #1a1a1a;
        text-align: center;
      }
    }

    .activity-main {
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(auto-fill, 31%);
      // grid-gap: 26px;

      .activity-every {
        display: block;
        position: relative;
        cursor: pointer;

        .img {
          width: 100%;
          height: auto;
        }

        .title {
          height: 50%;
          padding-left: 23px;
          padding-bottom: 24px;
          display: flex;
          align-items: flex-end;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            0deg,
            rgba(26, 26, 26, 0.8) 0%,
            rgba(26, 26, 26, 0) 100%
          );
          font-family: "Microsoft YaHei";
          font-weight: 700;
          font-size: 20px;
          color: #ffffff;
        }
      }
    }
  }

  .company-intro {
    width: 100%;
    margin: 70px auto 0;
    background: url("../../assets/imgs/pc/about/company01.jpg") no-repeat;
    background-size: 100% 100%;

    .container {
      text-align: left;
      background-color: rgba($color: #000000, $alpha: 0.4);
    }
    .title {
      font-family: "Microsoft YaHei";
      font-weight: 400;
      font-size: 39.8382px;
      color: #ffffff;
    }

    .en-title {
      width: fit-content;
      margin-top: 26px;
      padding-bottom: 7px;
      font-family: "Roboto";
      font-weight: 600;
      font-size: 48.36px;
      line-height: 37px;
      text-transform: uppercase;
      color: #ffffff;
      border-bottom: 1px solid #fff;
    }

    .content {
      width: 522px;
      margin-top: 32px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      font-size: 18px;
      line-height: 36px;
      color: #ffffff;
    }

    .btn {
      width: 80px;
      height: 30px;
      margin-top: 40px;
      text-align: center;
      line-height: 30px;
      display: block;
      font-weight: 400;
      font-size: 11px;
      color: #ffffff;
      border: 1px solid #fff;
    }
  }

  .customer-story {
    margin-top: 70px;
    background: url("../../assets/imgs/pc/home/story.png") no-repeat;
    background-size: cover;

    .story-title {
      margin-bottom: 111px;
      font-family: "Microsoft YaHei";
      font-weight: 700;
      font-size: 40px;
      color: #ffffff;
    }

    .story-main {
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(auto-fill, 31%);
      .story-every {
        margin-bottom: 28px;
        display: block;
        position: relative;
        cursor: pointer;

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .title {
          height: 50%;
          padding-bottom: 24px;
          display: flex;
          align-items: flex-end;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            0deg,
            rgba(26, 26, 26, 0.8) 0%,
            rgba(26, 26, 26, 0) 100%
          );
          font-family: "Microsoft YaHei";
          font-weight: 700;
          font-size: 18px;
          color: #ffffff;

          .font {
            width: 100%;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }

    .more {
      width: 120px;
      height: 30px;
      margin: 30px auto 0;
      text-align: center;
      line-height: 30px;
      display: block;
      font-weight: 400;
      font-size: 11px;
      color: #ffffff;
      border: 1px solid #fff;
    }
  }
}

// 移动端
@media screen and (max-width: 767px) {
  .home-title-six {
    margin-top: 20px;
    margin-bottom: 8px;

    div {
      padding: 9px 2px 11px 5px;
    }
  }

  .recommendation {
    .recommendation-classify {
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(auto-fill, 32%);
      // grid-gap: 9px;

      .recomm-every {
        // width: 109px;
        display: flex;
        justify-content: center;
        align-items: flex-end;

        .title-position {
          width: 100%;
          height: 50px;
          padding-bottom: 14px;
          font-weight: 900;
          font-size: 14px;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          background: linear-gradient(
            0deg,
            rgba(26, 26, 26, 0.8) 0%,
            rgba(26, 26, 26, 0) 100%
          );

          .title {
            display: flex;
            align-items: flex-start;

            span {
              font-size: 12px;
            }
          }
        }
      }

      .left {
        .left-top {
          height: 137px;
        }

        .left-bottom {
          height: 114px;
          margin-top: 7.8px;
        }
      }

      .center {
        .center-top {
          height: 118px;
        }

        .center-bottom {
          height: 135px;
          margin-top: 7.8px;
        }
      }

      .right {
        .right-top {
          height: 85px;
        }

        .right-center {
          height: 80px;
          margin-top: 7.8px;
        }

        .right-bottom {
          height: 80px;
          margin-top: 7.8px;
        }
      }
    }
  }

  .company-intro {
    margin: 50px auto 0;
    background: url("../../assets/imgs/pc/about/company01.jpg") no-repeat;
    background-size: cover;

    .container {
      padding: 50px 30px 70px;
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

    .btn {
      width: 80px;
      height: 30px;
      margin-top: 30px;
      text-align: center;
      line-height: 30px;
      display: block;
      font-weight: 400;
      font-size: 11px;
      color: #ffffff;
      border: 1px solid #fff;
    }
  }

  .customer-story {
    margin-top: 50px;
    padding: 33px 14px 30px;
    background: url("../../assets/imgs/phone/home/story-back.png") no-repeat;

    .story-title {
      margin-bottom: 48px;
      font-weight: 900;
      font-size: 24px;
      color: #ffffff;
    }

    .story-main {
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(auto-fill, 48%);
      .story-every {
        height: 114px;
        margin-bottom: 13px;
        display: block;
        position: relative;

        .img {
          // width: 152px;
          width: 100%;
          height: 114px;
          object-fit: cover;
        }

        .title {
          height: 50%;
          padding: 0 11px 11px;
          display: flex;
          align-items: flex-end;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            0deg,
            rgba(26, 26, 26, 0.8) 0%,
            rgba(26, 26, 26, 0) 100%
          );
          font-family: "Microsoft YaHei";
          font-weight: 700;
          font-size: 13px;
          color: #ffffff;

          .font {
            width: 100%;
            line-height: 17px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }

    .more {
      width: 120px;
      height: 34px;
      margin: 30px auto 0;
      text-align: center;
      line-height: 34px;
      display: block;
      font-weight: 400;
      font-size: 11px;
      color: #ffffff;
      border: 1px solid #fff;
    }
  }

  .contact-us {
    overflow: hidden;

    .contact-every {
      width: 285px;
      height: 50px;
      padding: 3px 15px;
      margin: 0 auto 18px;
      display: flex;
      align-items: center;
      background: #ffffff;
      border-radius: 6px;
      border-bottom: 3px solid #e97e1f;

      .qr-code {
        width: 50px;
        height: 50px;
      }

      .line {
        width: 1px;
        height: 23.68px;
        margin-left: 12.5px;
        margin-right: 20px;
        background-color: #4d4d4d;
      }

      .title-label {
        width: 145px;
        margin-right: 26px;
        text-align: center;

        .name {
          font-family: "YouSheBiaoTiHei";
          font-weight: 900;
          font-size: 18px;
          color: #595959;
        }

        .label {
          margin-top: 5px;
          font-weight: 400;
          font-size: 10px;
          color: #6c6c6c;
        }
      }

      .small-img {
        width: 26px;
        height: 26px;
      }
    }

    .code-img-dialog {
      margin-top: 10px;
      padding-bottom: 10px;
      text-align: center;
      .code-img-big {
        width: 150px;
        height: 150px;
      }
    }
  }

  .home-container {
    padding: 0 15px 76px;
  }

  .custom-indicator {
    margin-top: 22px;
    display: flex;
    justify-content: center;

    .line {
      width: 50px;
      height: 1.5px;
      background-color: #b3b3b3;
    }
  }

  .grab-nav {
    margin: 0 !important;
    background-color: #f5f5f5;
  }
}

.left {
  .left-top {
    background: url("../../assets/imgs/common/search01.JPG") no-repeat;
    background-size: cover;
  }

  .left-bottom {
    margin-top: 27px;
    background: url("../../assets/imgs/common/search02.jpg") no-repeat;
    background-size: cover;
  }
}

.center {
  .center-top {
    background: url("../../assets/imgs/common/search05.JPG") no-repeat;
    background-size: cover;
  }

  .center-bottom {
    margin-top: 27px;
    background: url("../../assets/imgs/common/search04.png") no-repeat;
    background-size: cover;
  }
}

.right {
  .right-top {
    background: url("../../assets/imgs/common/search03.JPG") no-repeat;
    background-size: cover;
  }

  .right-center {
    margin-top: 27px;
    background: url("../../assets/imgs/common/search06.jpg") no-repeat;
    background-size: cover;
  }

  .right-bottom {
    margin-top: 27px;
    background: url("../../assets/imgs/common/search07.jpg") no-repeat;
    background-size: cover;
  }
}
</style>
