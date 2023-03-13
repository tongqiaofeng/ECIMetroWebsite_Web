<template>
  <!-- 机械设备 -->
  <div v-if="cliWidth > 767" class="eci-main-content">
    <img
      :src="base_request_url + '/file/' + imgClassifyUrl"
      class="top-big-img"
    />
    <div>
      <div>
        <div class="home-title-six"><div>机械设备</div></div>
        <div class="font-main" id="topContainer" v-html="grabContent"></div>
      </div>

      <van-tabs
        class="grab-tabs-pc-container"
        color="#F5C71B"
        :title-active-color="'#1a1a1a'"
        :title-inactive-color="'#6C6C6C'"
        v-model:active="activeName"
        @click-tab="handleClick"
      >
        <van-tab title="按系列查看" name="first">
          <div class="grab-tab">
            <div
              class="tab-every"
              @click="selTab('')"
              :class="!selSeries ? 'active' : ''"
            >
              全部
            </div>
            <div
              class="tab-every"
              :class="item == selSeries ? 'active' : ''"
              v-for="(item, index) of seriesList"
              :key="index"
              @click="selTab(item)"
            >
              {{ item }}
            </div>
          </div>
          <div v-if="productList.length > 0">
            <div class="product-content">
              <div
                class="product-every"
                v-for="item in productList"
                :key="item.id"
                @click="checkDetail(item)"
              >
                <div class="every-img">
                  <img
                    :src="
                      base_request_url + '/file/' + item.imgUrl.split('|')[0]
                    "
                  />
                </div>

                <div class="every-params">
                  <div class="title">
                    {{ item.model }}
                  </div>

                  <van-divider :style="{ margin: '16px 0' }" />
                  <div class="params-grab">
                    <span class="name">发动机型号：</span>
                    <span>{{ item.engineModel }}</span>
                  </div>
                  <div class="params-grab">
                    <span class="name">净功率：</span>
                    <span>{{ item.engineNetPower + " KW" }}</span>
                  </div>
                  <div class="params-grab">
                    <span class="name">工作重量：</span>
                    <span>{{ item.weightWork + " kg" }}</span>
                  </div>

                  <div class="params-btn">查看详情</div>
                </div>
              </div>
            </div>

            <van-pagination
              v-model="page"
              :total-items="total"
              :items-per-page="6"
              force-ellipses
              @change="pageChange"
            >
              <template #prev-text>
                <van-icon name="arrow-left" />
              </template>
              <template #next-text>
                <van-icon name="arrow" />
              </template>
              <template #page="{ text }">{{ text }}</template>
            </van-pagination>
          </div>
          <div v-else>
            <van-empty description="暂无数据~" />
          </div>
        </van-tab>
        <van-tab title="按需求查看" name="second">
          <!-- <h3>按需求查看</h3> -->

          <div class="grab-tab">
            <div class="check-title">应用场景</div>
            <div
              class="tab-every"
              :class="applicationSceneSel == item ? 'active' : ''"
              v-for="(item, index) of applicationSceneList"
              :key="index"
              @click="selApplicationScene(item)"
            >
              {{ item }}
            </div>
          </div>

          <div class="grab-tab">
            <div class="check-title">作业项目</div>
            <div
              class="tab-every"
              :class="workItemsSel == item ? 'active' : ''"
              v-for="(item, index) of workItemsList"
              :key="index"
              @click="selWorkItems(item)"
            >
              {{ item }}
            </div>
          </div>

          <div class="grab-tab">
            <div class="check-title">斗容需求(m³)</div>
            <div
              class="tab-every"
              :class="bucketCapacitySel == item ? 'active' : ''"
              v-for="(item, index) of bucketCapacityDemandList"
              :key="index"
              @click="selBucketCapacity(item)"
            >
              {{ item }}
            </div>
          </div>

          <div class="grab-tab">
            <div class="check-title">最大挖掘深度</div>
            <div
              class="tab-every"
              :class="maxReachRangeSel == item ? 'active' : ''"
              v-for="(item, index) of maxReachRangeList"
              :key="index"
              @click="selMaxReachRange(item)"
            >
              {{ item }}
            </div>
          </div>
          <div class="check-btn check-recommend" @click="filterProduct">
            查看推荐机型
          </div>
          <div v-if="productList.length > 0">
            <div class="product-content">
              <div
                class="product-every"
                v-for="item in productList"
                :key="item.id"
                @click="checkDetail(item)"
              >
                <div class="every-img">
                  <img
                    :src="
                      base_request_url + '/file/' + item.imgUrl.split('|')[0]
                    "
                  />
                </div>

                <div class="every-params">
                  <div class="title">
                    {{ item.model }}
                  </div>

                  <van-divider :style="{ margin: '16px 0' }" />
                  <div class="params-grab">
                    <span class="name">发动机型号：</span>
                    <span>{{ item.engineModel }}</span>
                  </div>
                  <div class="params-grab">
                    <span class="name">净功率：</span>
                    <span>{{ item.engineNetPower + " KW" }}</span>
                  </div>
                  <div class="params-grab">
                    <span class="name">工作重量：</span>
                    <span>{{ item.weightWork + " kg" }}</span>
                  </div>

                  <div class="params-btn">查看详情</div>
                </div>
              </div>
            </div>

            <van-pagination
              v-model="page"
              :total-items="total"
              :items-per-page="6"
              force-ellipses
              @change="pageChange"
            >
              <template #prev-text>
                <van-icon name="arrow-left" />
              </template>
              <template #next-text>
                <van-icon name="arrow" />
              </template>
              <template #page="{ text }">{{ text }}</template>
            </van-pagination>
          </div>
          <div v-else>
            <van-empty description="暂无数据~" />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
  <div v-else class="eci-main-content">
    <img
      :src="base_request_url + '/file/' + imgClassifyPhoneUrl"
      class="top-big-img"
    />

    <div class="product-grab-workers">
      <div class="grab-font-content">
        <div class="home-title-six">
          <div>机械设备</div>
        </div>
        <div class="font-main" v-html="grabContent"></div>
      </div>

      <van-tabs
        id="topContainer"
        class="grab-tabs-container"
        color="#F5C71B"
        :title-active-color="'#1a1a1a'"
        :title-inactive-color="'#6C6C6C'"
        v-model:active="activeName"
        @click-tab="handleClick"
      >
        <van-tab title="按系列查看" name="first">
          <div class="grab-tab">
            <div
              class="tab-every"
              @click="selTab('')"
              :class="!selSeries ? 'active' : ''"
            >
              全部
            </div>
            <div
              class="tab-every"
              :class="item == selSeries ? 'active' : ''"
              v-for="(item, index) of seriesList"
              :key="index"
              @click="selTab(item)"
            >
              {{ item }}
            </div>
          </div>
          <div v-if="productList.length > 0">
            <div class="product-content" style="padding: 0">
              <div
                class="product-every"
                v-for="item in productList"
                :key="item.id"
                @click="checkDetail(item)"
              >
                <div class="every-img">
                  <img
                    :src="
                      base_request_url + '/file/' + item.imgUrl.split('|')[0]
                    "
                  />
                </div>

                <div class="every-params">
                  <div class="title">
                    {{ item.model }}
                  </div>

                  <van-divider :style="{ margin: '10px 0' }" />
                  <div class="params-grab">
                    <span class="name">发动机型号：</span>
                    <span>{{ item.engineModel }}</span>
                  </div>
                  <div class="params-grab">
                    <span class="name">净功率：</span>
                    <span>{{ item.engineNetPower + " KW" }}</span>
                  </div>
                  <div class="params-grab">
                    <span class="name">工作重量：</span>
                    <span>{{ item.weightWork + " kg" }}</span>
                  </div>
                </div>
              </div>
            </div>

            <van-pagination
              v-model="page"
              :total-items="total"
              :items-per-page="6"
              force-ellipses
              @change="pageChange"
            >
              <template #prev-text>
                <van-icon name="arrow-left" />
              </template>
              <template #next-text>
                <van-icon name="arrow" />
              </template>
              <template #page="{ text }">{{ text }}</template>
            </van-pagination>
          </div>
          <div v-else>
            <van-empty description="敬请期待~" />
          </div>
        </van-tab>
        <van-tab title="按需求查看" name="second">
          <!-- <h3>按需求查看</h3> -->
          <div class="check-title">应用场景</div>

          <div class="grab-tab">
            <div
              class="tab-every"
              :class="applicationSceneSel == item ? 'active' : ''"
              v-for="(item, index) of applicationSceneList"
              :key="index"
              @click="selApplicationScene(item)"
            >
              {{ item }}
            </div>
          </div>
          <div class="check-title">作业项目</div>

          <div class="grab-tab">
            <div
              class="tab-every"
              :class="workItemsSel == item ? 'active' : ''"
              v-for="(item, index) of workItemsList"
              :key="index"
              @click="selWorkItems(item)"
            >
              {{ item }}
            </div>
          </div>
          <div class="check-title">斗容需求(m³)</div>

          <div class="grab-tab">
            <div
              class="tab-every"
              :class="bucketCapacitySel == item ? 'active' : ''"
              v-for="(item, index) of bucketCapacityDemandList"
              :key="index"
              @click="selBucketCapacity(item)"
            >
              {{ item }}
            </div>
          </div>
          <div class="check-title">最大挖掘深度</div>

          <div class="grab-tab">
            <div
              class="tab-every"
              :class="maxReachRangeSel == item ? 'active' : ''"
              v-for="(item, index) of maxReachRangeList"
              :key="index"
              @click="selMaxReachRange(item)"
            >
              {{ item }}
            </div>
          </div>
          <div class="check-btn check-recommend" @click="filterProduct">
            查看推荐机型
          </div>
          <div v-if="productList.length > 0">
            <div class="product-content" style="padding: 0">
              <div
                class="product-every"
                v-for="item in productList"
                :key="item.id"
                @click="checkDetail(item)"
              >
                <div class="every-img">
                  <img
                    :src="
                      base_request_url + '/file/' + item.imgUrl.split('|')[0]
                    "
                  />
                </div>

                <div class="every-params">
                  <div class="title">
                    {{ item.model }}
                  </div>

                  <van-divider :style="{ margin: '10px 0' }" />
                  <div class="params-grab">
                    <span class="name">发动机型号：</span>
                    <span>{{ item.engineModel }}</span>
                  </div>
                  <div class="params-grab">
                    <span class="name">净功率：</span>
                    <span>{{ item.engineNetPower + " KW" }}</span>
                  </div>
                  <div class="params-grab">
                    <span class="name">工作重量：</span>
                    <span>{{ item.weightWork + " kg" }}</span>
                  </div>
                </div>
              </div>
            </div>

            <van-pagination
              v-model="page"
              :total-items="total"
              :items-per-page="6"
              force-ellipses
              @change="pageChange"
            >
              <template #prev-text>
                <van-icon name="arrow-left" />
              </template>
              <template #next-text>
                <van-icon name="arrow" />
              </template>
              <template #page="{ text }">{{ text }}</template>
            </van-pagination>
          </div>
          <div v-else>
            <van-empty description="暂无数据~" />
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

import { base_request_url } from "@/request/http";
import { IProduct } from "@/types/global";
import {
  allDemandequipmentTypePort,
  seriesPort,
  productSearchPort,
} from "@/request/api/product";
import _sessionStorage from "@/utils/sessionStorage";
import { getProductClassify, formatNumberRgx } from "@/utils/utils";

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

// 了解产品详情
const router = useRouter();
const checkDetail = (item: any) => {
  let params = {
    equipmentTypeId: typeId.value,
    series: selSeries.value,
  };
  _sessionStorage.set("check_product_params", params);
  router.push({
    path: "/product/detail",
    query: { productId: item.id, type: "1" },
  });
};

// 选中系列
const selSeries = ref<string>("");
const selTab = (name: string) => {
  selSeries.value = name;

  page.value = 1;
  getProductList();
};

// 按需求查看
// 应用场景
const applicationSceneList = ref([]);
const applicationSceneSel = ref("");

const selApplicationScene = (item: string) => {
  console.log(item);

  if (applicationSceneSel.value != item) {
    applicationSceneSel.value = item;
  } else {
    applicationSceneSel.value = "";
  }
};

// 作业项目
const workItemsList = ref([]);
const workItemsSel = ref("");

const selWorkItems = (item: string) => {
  if (workItemsSel.value != item) {
    workItemsSel.value = item;
  } else {
    workItemsSel.value = "";
  }
};

// 斗容需求
const bucketCapacityDemandList = ref([]);
const bucketCapacitySel = ref("");
const selBucketCapacity = (item: string) => {
  if (bucketCapacitySel.value != item) {
    bucketCapacitySel.value = item;
  } else {
    bucketCapacitySel.value = "";
  }
};

// 最大挖掘深度
const maxReachRangeList = ref([]);

const maxReachRangeSel = ref("");
const selMaxReachRange = (item: string) => {
  if (maxReachRangeSel.value != item) {
    maxReachRangeSel.value = item;
  } else {
    maxReachRangeSel.value = "";
  }
};

// 按需求查看 获取产品列表
const filterProduct = () => {
  page.value = 1;
  selSeries.value = "";
  getProductList();
};

const { grabId, grabContent, imgClassifyUrl, imgClassifyPhoneUrl, typeId } =
  await getProductClassify("机械设备");

// 获取 按需求查看 分类列表
const getDemandList = () => {
  allDemandequipmentTypePort({
    equipmentTypeId: grabId.value,
  }).then((res) => {
    console.log("按需求查看 分类列表", res);

    applicationSceneList.value = res.data.data.applicationSceneList;
    bucketCapacityDemandList.value = res.data.data.bucketCapacityDemandList;
    maxReachRangeList.value = res.data.data.maxReachRangeList;
    workItemsList.value = res.data.data.workItemsList;
  });
};
getDemandList();

const activeName = ref("first");
const handleClick = () => {
  selSeries.value = "";
  page.value = 1;
  applicationSceneSel.value = "";
  bucketCapacitySel.value = "";
  maxReachRangeSel.value = "";
  workItemsSel.value = "";

  if (activeName.value == "first") {
    getProductList();
  } else {
    productList.value = [];
  }
};

// 获取产品列表
const productList = ref<IProduct[]>([]);
const page = ref(1);
const total = ref(0);

const getProductList = () => {
  productSearchPort({
    applicationScene: applicationSceneSel.value,
    bucketCapacityDemand: bucketCapacitySel.value,
    equipmentTypeId: typeId.value,
    maxReach: maxReachRangeSel.value,
    page: page.value,
    pageNum: 6,
    series: selSeries.value,
    workItems: workItemsSel.value,
  }).then((res) => {
    console.log("产品列表", res);

    productList.value = res.data.data.list;
    total.value = res.data.data.total;
  });
};
getProductList();

// 分页
const pageChange = () => {
  getProductList();
  (document.getElementById("topContainer") as HTMLElement).scrollIntoView({
    behavior: "smooth",
  });
};

// 获取 系列 列表
const seriesList = ref<string[]>([]);
const getSeriesList = () => {
  seriesPort({
    equipmentTypeId: grabId.value,
  }).then((res) => {
    console.log("系列列表", res);
    seriesList.value = res.data.data;
  });
};
getSeriesList();
</script>

<style scoped lang="scss">
.home-title-six {
  background: url("../../../assets/imgs/pc/common/titleBack6.png") no-repeat;
  background-size: 100% 100%;
}

// PC端
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
    margin-top: 43px;
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
}
</style>
<style lang="scss">
.grab-tabs-container {
  .van-tabs {
    border-top: none;
  }

  .van-hairline--top-bottom {
    border-top: none !important;
  }
}
</style>
