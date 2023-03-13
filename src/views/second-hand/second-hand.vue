<template>
  <!-- 二手设备 -->
  <div v-if="cliWidth > 768" class="eci-main-content">
    <img
      :src="base_request_url + '/file/' + imgClassifyUrl"
      class="top-big-img"
    />

    <div class="grab-font-content">
      <div class="home-title-six"><div>二手设备</div></div>
      <div class="font-main" v-html="grabContent"></div>
    </div>

    <!--  // 出厂年限 工作时数 所在地 吨位 价格 类型 -->
    <div class="second-hand-sel" id="secondContainer">
      <el-form inline>
        <el-form-item label="吨位：">
          <el-select
            style="width: 140px"
            v-model="tonnage"
            placeholder="选择吨位"
            size="large"
            clearable
            @change="checkList"
          >
            <el-option
              v-for="item in tonnageList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="时数：">
          <el-select
            style="width: 140px"
            v-model="workHours"
            placeholder="选择时数"
            size="large"
            clearable
            @change="checkList"
          >
            <el-option
              v-for="item in hourList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="价格：">
          <el-select
            style="width: 140px"
            v-model="retailPrice"
            placeholder="选择价格"
            size="large"
            clearable
            @change="checkList"
          >
            <el-option
              v-for="item in priceList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="年限：">
          <el-select
            style="width: 140px"
            v-model="recycleExFactoryYear"
            placeholder="选择年限"
            size="large"
            clearable
            @change="checkList"
          >
            <el-option
              v-for="item in yearList"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
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
              :src="base_request_url + '/file/' + item.imgUrl.split('|')[0]"
            />
          </div>

          <div class="every-params">
            <div class="title">
              {{ item.model }}
            </div>
            <van-divider :style="{ margin: '16px 0' }" />
            <div class="params">
              <span class="name">出厂年份：</span>
              <span>{{ item.recycleExFactoryYear }}</span>
            </div>
            <div class="params">
              <span class="name">工作时数：</span>
              <span>{{ item.recycleWorkHours + "小时" }}</span>
            </div>
            <div class="params">
              <span class="name">价格(万)：</span>
              <span>{{ item.recyclePrice }}</span>
            </div>
            <div class="params-btn">查看详情</div>
          </div>
        </div>
      </div>
      <!--    :show-page-size="5" -->
      <van-pagination
        v-model="page"
        :total-items="total"
        :items-per-page="5"
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
  </div>
  <div v-else>
    <img
      :src="base_request_url + '/file/' + imgClassifyPhoneUrl"
      class="top-big-img"
    />

    <div class="grab-main-content">
      <div class="grab-font-content">
        <div class="home-title-six"><div>二手设备</div></div>
        <div class="font-main" v-html="grabContent"></div>
      </div>
    </div>

    <!--  // 出厂年限 工作时数 所在地 吨位 价格 类型 -->
    <div class="second-hand-sel" id="secondContainer">
      <van-field
        v-model="tonnage"
        is-link
        readonly
        label="吨位"
        placeholder="选择吨位"
        @click="showTonnagePicker = true"
      />
      <van-field
        v-model="workHours"
        is-link
        readonly
        label="工作时数"
        placeholder="选择时数"
        @click="showHoursPicker = true"
      />
      <van-field
        v-model="retailPrice"
        is-link
        readonly
        label="价格"
        placeholder="选择价格"
        @click="showPricePicker = true"
      />
      <van-field
        v-model="recycleExFactoryYear"
        is-link
        readonly
        label="出厂年限"
        placeholder="选择年限"
        @click="showYearPicker = true"
      />
    </div>
    <!-- 年限 -->
    <van-popup v-model:show="showYearPicker" round position="bottom">
      <van-picker
        :columns="yearList"
        @cancel="showYearPicker = false"
        @confirm="sellYearConfirm"
      />
    </van-popup>
    <!-- 时数 -->
    <van-popup v-model:show="showHoursPicker" round position="bottom">
      <van-picker
        :columns="hourList"
        @cancel="showHoursPicker = false"
        @confirm="sellHourConfirm"
      />
    </van-popup>
    <!-- 吨位 -->
    <van-popup v-model:show="showTonnagePicker" round position="bottom">
      <van-picker
        :columns="tonnageList"
        @cancel="showTonnagePicker = false"
        @confirm="sellTonnageConfirm"
      />
    </van-popup>
    <!-- 价格 -->
    <van-popup v-model:show="showPricePicker" round position="bottom">
      <van-picker
        :columns="priceList"
        @cancel="showPricePicker = false"
        @confirm="sellPriceConfirm"
      />
    </van-popup>

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
              :src="base_request_url + '/file/' + item.imgUrl.split('|')[0]"
            />
          </div>

          <div class="every-params">
            <div class="title">
              {{ item.model }}
            </div>
            <van-divider :style="{ margin: '10px 0' }" />
            <div class="params">
              <span class="name">出厂年份：</span>
              <span>{{ item.recycleExFactoryYear }}</span>
            </div>
            <div class="params">
              <span class="name">工作时数：</span>
              <span>{{ item.recycleWorkHours + "小时" }}</span>
            </div>
            <div class="params">
              <span class="name">价格(万)：</span>
              <span>{{ item.recyclePrice }}</span>
            </div>
          </div>
        </div>
      </div>
      <!--    :show-page-size="5" -->
      <van-pagination
        v-model="page"
        :total-items="total"
        :items-per-page="5"
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

    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { base_request_url } from "@/request/http";
import { IProduct } from "@/types/global";
import { productSearchPort } from "@/request/api/product";
import _sessionStorage from "@/utils/sessionStorage";
import { getProductClassify } from "@/utils/utils";

import Header from "@/layouts/header/index.vue";

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  // 窗口大小发生改变时,调用一次
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };
});

// 了解产品详情
const router = useRouter();
const checkDetail = (item: any) => {
  router.push({
    path: "/secondHand/detail",
    query: { productId: item.id },
  });
};

const checkList = () => {
  page.value = 1;
  getProductList();
};

// 筛选条件
// 年限
const recycleExFactoryYear = ref("");
const showYearPicker = ref(false);
const sellYearConfirm = (val: any) => {
  console.log(val);
  recycleExFactoryYear.value = val;
  showYearPicker.value = false;
  page.value = 1;

  getProductList();
};
// 时数
const hourList = ref<string[]>([
  "全部",
  "小于1000小时",
  "1000-2000小时",
  "2000-3000小时",
  "3000-4000小时",
  "4000-5000小时",
  "5000小时以上",
]);
const workHours = ref("");
const showHoursPicker = ref(false);
const sellHourConfirm = (val: any) => {
  console.log(val);
  workHours.value = val;
  showHoursPicker.value = false;
  page.value = 1;

  getProductList();
};
// 吨位
const tonnageList = ref<string[]>([
  "全部",
  "10吨以下",
  "10-20吨",
  "20-30吨",
  "30吨以上",
]);
const showTonnagePicker = ref(false);
const tonnage = ref("");
const sellTonnageConfirm = (val: any) => {
  console.log(val);
  tonnage.value = val;
  showTonnagePicker.value = false;
  page.value = 1;

  getProductList();
};
// 价格
const priceList = ref<string[]>([
  "全部",
  "面议",
  "30万以下",
  "30-50万",
  "50-80万",
  "80-100万",
  "100-200万",
  "200万以上",
  "面议",
]);
const retailPrice = ref("");
const showPricePicker = ref(false);
const sellPriceConfirm = (val: any) => {
  console.log(val);
  retailPrice.value = val;
  showPricePicker.value = false;
  page.value = 1;

  getProductList();
};

// 获取年份列表
const yearList = ref<string[]>(["全部", "2000年以前"]);
let curYear = new Date().getFullYear();
for (let i = 2000; i <= curYear; i++) {
  yearList.value.push(i + "");
}

// 获取产品列表
const productList = ref<IProduct[]>([]);
const page = ref(1);
const total = ref(0);

const { grabContent, imgClassifyUrl, imgClassifyPhoneUrl, typeId } =
  await getProductClassify("二手设备");
const getProductList = () => {
  let max = null;
  let min = null;
  if (workHours.value && workHours.value != "全部") {
    if (workHours.value == "小于1000小时") {
      max = 1000;
      min = null;
    } else if (workHours.value == "5000小时以上") {
      min = 5000;
      max = null;
    } else {
      min = workHours.value.split("-")[0];
      max = workHours.value.split("-")[1].slice(0, 4);
    }
  }
  console.log(max, min);

  let maxT = null;
  let minT = null;
  if (tonnage.value && tonnage.value != "全部") {
    if (tonnage.value == "10吨以下") {
      maxT = 10;
      minT = null;
    } else if (tonnage.value == "30吨以上") {
      minT = 30;
      maxT = null;
    } else {
      minT = tonnage.value.split("-")[0];
      maxT = tonnage.value.split("-")[1].slice(0, 2);
    }
  }
  console.log(maxT, minT);

  let maxP = null;
  let minP = null;
  if (retailPrice.value && retailPrice.value != "全部") {
    if (retailPrice.value == "30万以下") {
      maxP = 30;
      minP = null;
    } else if (retailPrice.value == "200万以上") {
      minP = 200;
      maxP = null;
    } else if (retailPrice.value == "面议") {
      minP = "面议";
      maxP = "面议";
    } else {
      minP = retailPrice.value.split("-")[0];
      maxP = retailPrice.value.split("-")[1].replace(/万/, "");
    }
  }
  console.log(maxP, minP);

  productSearchPort({
    recycleEquipmentTonMax: maxT, // 二手设备-设备吨级最大；单位T
    recycleEquipmentTonMin: minT, // 二手设备-设备吨级最小；单位T
    recycleExFactoryYear:
      recycleExFactoryYear.value == "全部" || !recycleExFactoryYear.value
        ? null
        : recycleExFactoryYear.value, // 二手设备-出厂年份
    recycleWorkHoursMax: max, // 二手设备-工作小时数最大；单位H
    recycleWorkHoursMin: min, // 二手设备-工作小时数最小；单位H
    recyclePriceMax: maxP, // 二手设备-价格最大；单位H
    recyclePriceMin: minP, // 二手设备-价格最小；单位H
    equipmentTypeId: typeId.value,
    recycleSellState: 0,
    page: page.value,
    pageNum: 5,
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
  (document.getElementById("secondContainer") as HTMLElement).scrollIntoView({
    behavior: "smooth",
  });
};
</script>

<style scoped lang="scss">
.home-title-six {
  background: url("../../assets/imgs/pc/common/titleBack6.png") no-repeat;
  background-size: 100% 100%;
}

@media screen and (min-width: 768px) {
  .second-hand-sel {
    margin-top: 60px;
  }

  .check-btn {
    width: 122px;
    height: 40px;
    font-weight: 700;
    font-size: 14px;
    line-height: 40px;
    color: #ffffff;
    background: #1a1a1a;
    text-align: center;
  }

  .check-all {
    margin: 40px auto 0;
  }

  .check-recommend {
    margin-top: 40px;
  }
}
@media screen and (min-width: 1200px) {
  .home-title-six {
    margin-top: 63px;
    margin-bottom: 17px;

    div {
      padding: 16px 10px 19px 10px;
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

  .second-hand-sel {
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .check-btn {
    width: 122px;
    height: 40px;
    font-weight: 700;
    font-size: 14px;
    line-height: 40px;
    color: #ffffff;
    background: #1a1a1a;
    text-align: center;
  }

  .check-all {
    margin: 40px auto 0;
  }

  .check-recommend {
    margin-top: 40px;
  }
}
</style>
<style lang="scss">
.second-hand-sel {
  .van-cell {
    width: 48% !important;
    padding: 9px 10px !important;
    margin-bottom: 13px !important;
    line-height: 14px !important;
    background: #f5f5f5 !important;
    font-size: 12px !important;
  }

  .van-field__label {
    width: 4em !important;
    color: #595959 !important;
  }

  .van-cell__left-icon,
  .van-cell__right-icon {
    height: 14px !important;
    line-height: 14px !important;
    font-size: 12px !important;
  }
}
</style>
