<template>
  <div class="pc-footer-container" @click="otherClick($event)">
    <div class="container-main">
      <div class="main-navigation">
        <div class="nav-every">
          <div class="title">
            Cat<span style="font-size: 13px">®</span>(卡特)设备
          </div>
          <div class="catalogue">
            <router-link to="/product/grab">机械设备</router-link>
          </div>
          <div class="catalogue">
            <router-link to="/product/power">动力设备</router-link>
          </div>
          <div class="catalogue">
            <router-link to="/product/mine">矿山设备</router-link>
          </div>
          <div class="catalogue">
            <router-link to="/secondHand/list">二手设备</router-link>
          </div>
          <div class="catalogue">
            <router-link to="/lease">租赁业务</router-link>
          </div>
        </div>

        <div class="nav-every" v-if="childList.length > 0">
          <div class="title">联盟产品</div>
          <div class="catalogue" v-for="item in childList" :key="item.id">
            <router-link
              :to="{
                path: '/alliance',
                query: { name: item.equipmentTypeName },
              }"
              >{{ item.equipmentTypeName }}</router-link
            >
          </div>
          <div class="nav-every" style="margin-top: 30px">
            <div class="title">在线商城</div>
            <div class="catalogue">
              <a
                href="https://246438635.cms.n.weimob.com/bos/cms/246438635/6001491069635/3594336635/design/index?productInstanceId=3594336635"
                target="_blank"
                >整机商城</a
              >
            </div>
            <div class="catalogue">
              <a
                href="https://www.catpeijian.cn/zh-CN/ecim?dealer=ecim&cl_sr=owned&cl_ctnm=ecimposter&cl_source1=ecim_m"
                target="_blank"
                >零件商城</a
              >
            </div>
          </div>
        </div>

        <div class="nav-every">
          <div class="title">支持</div>
          <div class="catalogue">
            <router-link to="/support/bcp">BCP使用保养规范</router-link>
          </div>
          <div class="catalogue">
            <router-link to="/support/excavator">新一代挖机操作</router-link>
          </div>
          <div class="catalogue">
            <router-link to="/support/maintain">维修支持</router-link>
          </div>
          <div class="catalogue">
            <router-link to="/support/map">网点地图</router-link>
          </div>
        </div>
        <div class="nav-every">
          <div class="title">关于我们</div>
          <div class="catalogue">
            <router-link to="/about/company">公司介绍</router-link>
          </div>
          <div class="catalogue">
            <router-link to="/about/culture">企业文化</router-link>
          </div>
          <div class="catalogue">
            <router-link to="/about/join">加入我们</router-link>
          </div>
        </div>
        <div class="nav-every">
          <div class="title">活动与分享</div>
          <div class="catalogue">
            <router-link :to="{ path: '/activity/list', query: { id: 1 } }"
              >新闻与活动</router-link
            >
          </div>

          <div class="catalogue">
            <router-link :to="{ path: '/activity/list', query: { id: 3 } }"
              >客户故事</router-link
            >
          </div>
        </div>
        <div class="nav-every">
          <div class="title">联系我们</div>
          <div class="contact-logo">
            <div
              class="logo-every"
              :style="{
                'background-color': showCode == 1 ? '#DEA600' : '#E0E0E0',
              }"
            >
              <div class="code-img code-img-service" v-show="showCode == 1">
                <div class="code">
                  <div class="code-right">
                    <div class="title">易初明通官方服务平台</div>
                    <img
                      class="img"
                      src="../../assets/imgs/common/official.jpg"
                    />
                  </div>
                </div>
                <div class="hint">扫一扫加入易初明通官方微信</div>
              </div>
              <img
                class="logo-img"
                src="../../assets/imgs/pc/footer/wechat.png"
                @click="showCode = 1"
              />
            </div>
            <div
              class="logo-every"
              :style="{
                'background-color': showCode == 2 ? '#DEA600' : '#E0E0E0',
              }"
            >
              <div class="code-img code-img-app" v-show="showCode == 2">
                <div class="code">
                  <div class="code-right">
                    <div class="title">易初明通官方App</div>
                    <img class="img" src="../../assets/imgs/common/app.png" />
                  </div>
                </div>
              </div>
              <img
                class="logo-img"
                src="../../assets/imgs/pc/footer/app.png"
                @click="showCode = 2"
              />
            </div>
            <div
              class="logo-every"
              :style="{
                'background-color': showCode == 3 ? '#DEA600' : '#E0E0E0',
                'margin-right': 0,
              }"
            >
              <div class="code-img code-img-store" v-show="showCode == 3">
                <div class="code">
                  <div class="code-left">
                    <div class="title">易初明通整机商城</div>
                    <img class="img" src="../../assets/imgs/common/shop.png" />
                  </div>
                  <div class="code-right">
                    <div class="title">易初明通零件商城</div>
                    <a
                      href="https://www.catpeijian.cn/zh-CN/ecim?dealer=ecim&cl_sr=owned&cl_ctnm=ecimposter&cl_source1=ecim_m"
                      target="_blank"
                      class="img"
                      ><img
                        class="img"
                        src="../../assets/imgs/common/accessories.jpg"
                      />
                    </a>
                  </div>
                </div>
                <div class="hint">扫一扫进入易初明通官方商城</div>
              </div>
              <img
                class="logo-img"
                src="../../assets/imgs/pc/footer/mini-program.png"
                @click="showCode = 3"
              />
            </div>
          </div>
        </div>

        <div class="line"></div>
        <div class="logo-phone">
          <div class="logo">
            <router-link to="/">
              <img
                v-if="system"
                class="logo"
                :src="
                  base_request_url + '/file/' + system.companyMsg.websiteLogo
                "
              />
            </router-link>
          </div>
          <div class="phone-official">
            <div class="title">易初明通官方热线：</div>
            <div class="phone">{{ system?.companyMsg.phoneNumber }}</div>
          </div>
          <div class="phone-join">
            <div class="title">招聘热线：</div>
            <div class="phone">{{ system?.companyMsg.joinPhone }}</div>
            <div class="hr">{{ system?.companyMsg.joinPhoneNote }}</div>
          </div>
        </div>
      </div>
      <van-divider :style="{ margin: '50px 0 28px' }" />
      <div class="link">
        <a href="https://work.weixin.qq.com/mail/" target="_blank">企业邮箱</a>
        <div class="line"></div>
        <a href="https://www.caterpillar.com/" target="_blank">卡特彼勒官网</a>
        <div class="line"></div>
        <a href="https://www.cat.com/global-selector.html" target="_blank"
          >Cat融资官网</a
        >
        <div class="line"></div>
        <a href="https://www.catwj.com.cn/" target="_blank">卡特挖机互动中心</a>
        <div class="line"></div>
        <router-link to="/about/join">加入人才库</router-link>
        <div class="line"></div>
        <a href="/about/statement" target="_blank">法律声明</a>
        <div class="line"></div>
        <a href="https://beian.miit.gov.cn/#/Integrated/index"
          >网站备案号：蜀ICP备13014520号</a
        >
      </div>
      <div class="link public-security">
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51011202000279"
          target="_blank"
          class="link-every"
        >
          <img src="../../assets/imgs/footer/batb.png" />
          <span>川公网安备 51011202000279号</span>
        </a>
        <div class="line"></div>
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51011202000282"
          target="_blank"
          class="link-every"
        >
          <img src="../../assets/imgs/footer/batb.png" />
          <span>川公网安备 51011202000282号</span>
        </a>
        <div class="line"></div>
        <span class="link-every"> {{ system?.companyMsg.copyright }}</span>
      </div>
    </div>
  </div>
  <div class="iphone-footer-container">
    <div class="footer-website">
      <a href="https://work.weixin.qq.com/mail/" target="_blank">企业邮箱</a>
      <div class="line"></div>
      <a href="https://www.caterpillar.com/" target="_blank">卡特彼勒官网</a>
      <div class="line"></div>
      <a href="https://www.cat.com/global-selector.html" target="_blank"
        >Cat融资官网</a
      >
      <div class="line"></div>
      <a href="https://www.catwj.com.cn/" target="_blank">卡特挖机互动中心</a>
      <div class="line"></div>
      <router-link to="/about/join">加入人才库</router-link>
      <div class="line"></div>
      <a href="/about/statement" target="_blank">法律声明</a>
    </div>
    <div class="footer-website">
      <a href="https://beian.miit.gov.cn/#/Integrated/index"
        >网站备案号：蜀ICP备13014520号</a
      >
    </div>
    <div class="footer-police">
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51011202000279"
        target="_blank"
      >
        <img src="../../assets/imgs/footer/batb.png" />
        <p>川公网安备 51011202000279号</p>
      </a>
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51011202000282"
        target="_blank"
      >
        <img src="../../assets/imgs/footer/batb.png" />
        <p>川公网安备 51011202000282号</p>
      </a>
    </div>
    <div class="footer-bottom">
      {{ system?.companyMsg.copyright }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/userStore";

import { base_request_url } from "@/request/http";
import { getProductClassify } from "@/utils/utils";

const showCode = ref(0);

// 点击其他地方关闭 二维码展示
const otherClick = (event: any) => {
  let e = event || window.event;
  let className = e.target.className;
  if (className !== "logo-img") {
    showCode.value = 0;
  }
};

const system: any = ref();
const userStore = useUserStore();
if (userStore.systemMsg) {
  system.value = JSON.parse(userStore.systemMsg);
}

const { childList } = await getProductClassify("联盟产品");
console.log(childList.value);
</script>

<style scoped lang="scss">
a {
  color: #fff;
}

// PC端
.pc-footer-container {
  width: 100%;
  padding: 50px 0 36px;
  background-color: #f5f5f5;
}

.container-main {
  .main-navigation {
    display: flex;
    justify-content: space-between;

    .nav-every {
      text-align: left;
      .title {
        margin-bottom: 25px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        font-size: 16px;
        color: #1a1a1a;
      }

      .catalogue {
        margin-bottom: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        font-size: 14px;

        a {
          color: #4d4d4d;
        }
      }

      .contact-logo {
        .logo-every {
          width: 42px;
          height: 42px;
          margin-bottom: 10px;
          position: relative;
          border-radius: 50%;
          cursor: pointer;

          .code-img {
            width: fit-content;
            padding: 24px 19px 21px;
            position: absolute;
            z-index: 9999;

            .code {
              display: flex;
              .title {
                width: 150px;
                margin-bottom: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                font-size: 14px;
                text-align: center;
                color: #4d4d4d;
              }

              .img {
                width: 120px;
                height: 120px;
                margin: 0 auto;
              }

              .code-right {
                text-align: center;
              }
              .code-left {
                margin-right: 31px;
                text-align: center;
              }
            }

            .hint {
              margin-top: 22px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              font-size: 14px;
              color: #858585;
              text-align: center;
            }
          }

          .code-img-service {
            top: -255px;
            left: -75px;
            background: url("../../assets/imgs/pc/footer/code01.png") no-repeat;
            background-size: 100% 100%;
          }

          .code-img-app {
            top: -200px;
            left: -75px;
            background: url("../../assets/imgs/pc/footer/code01.png") no-repeat;
            background-size: 100% 100%;
          }

          .code-img-store {
            top: -238px;
            left: -160px;
            background: url("../../assets/imgs/pc/footer/code02.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }

    .line {
      width: 1px;
      height: 230px;
      background-color: #dbdbdb;
    }

    .logo-phone {
      .logo {
        width: 188px;
        height: 49px;
      }
      .title {
        font-family: "Microsoft YaHei";
        font-weight: 400;
        font-size: 16px;
        color: #4d4d4d;
      }

      .phone {
        margin-top: 10px;
        font-family: "Roboto";
        font-weight: 500;
        font-size: 24px;
        color: #dea600;
      }
      .phone-official {
        margin-top: 24px;
        margin-bottom: 20px;
      }

      .phone-join {
        .hr {
          margin-top: 6px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          font-size: 16px;
          color: #dea600;
        }
      }
    }
  }

  .link {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .link-every,
    a {
      font-family: "Microsoft YaHei";
      font-weight: 400;
      font-size: 13px;
      color: #4d4d4d;
    }

    .line {
      width: 1px;
      height: 13px;
      margin: 0 15px;
      background-color: #4d4d4d;
    }
  }

  .public-security {
    margin-top: 29px;

    .link-every {
      display: flex;
      align-items: center;

      img {
        width: 19px;
        height: 20px;
        margin-right: 8px;
      }
    }
  }
}

@media screen and (min-width: 1300px) {
  .container-main {
    width: 75%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 1299px) {
  .container-main {
    width: 85%;
    margin: 0 auto;
  }
}

@media screen and (min-width: 992px) {
  .pc-footer-container {
    display: block;
  }
  .iphone-footer-container {
    display: none;
  }
}

// 移动端
@media screen and (max-width: 991px) {
  .pc-footer-container {
    display: none;
  }
  .iphone-footer-container {
    // 32px
    padding: 32px 5px 24px;
    // margin-top: 20px;
    display: block;
    background-color: #1a1a1a;
    text-align: center;

    .footer-website {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      a {
        font-size: 12px;
      }

      .line {
        width: 1px;
        height: 15px;
        margin: 0 8px;
        background-color: #565656;
      }
    }

    .footer-police {
      margin-top: 30px;

      a {
        display: block;
        margin-bottom: 5px;
        color: #565656;
        font-size: 11px;

        img {
          width: 13px;
          height: 13px;
          margin-right: 5px;
        }

        p {
          margin: 0;
          height: 13px;
          display: inline-block;
          line-height: 13px;
        }
      }
    }

    .footer-bottom {
      margin-top: 12px;
      font-size: 12px;
      color: #565656;
    }
  }
}
</style>
