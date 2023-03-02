<template>
  <div v-if="cliWidth > 768" class="calc-main-content">
    <div class="second-nav">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item to="/product/mine" replace>
          矿山设备</el-breadcrumb-item
        >
        <el-breadcrumb-item>矿山产量计算器</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="home-title-six"><div>矿山产量计算器</div></div>
    <div class="calc-pc-main">
      <div class="calc-pc-left">
        <el-form
          ref="calcFormRef"
          :model="calcFormData"
          :rules="calcFormRules"
          label-position="top"
          label-width="100px"
          style="max-width: 460px"
        >
          <el-form-item label="矿山地址" prop="addr">
            <el-input
              placeholder="请输入地址"
              size="large"
              clearable
              v-model="calcFormData.addr"
            />
          </el-form-item>
          <el-form-item label="所在海拔高度" prop="height">
            <el-input
              placeholder="请输入高度"
              size="large"
              clearable
              v-model="calcFormData.height"
            />
          </el-form-item>
          <el-form-item label="矿石类型" prop="type">
            <el-input
              placeholder="请输入类型"
              size="large"
              clearable
              v-model="calcFormData.type"
            />
          </el-form-item>
          <el-form-item label="松方物料密度" prop="density">
            <el-input
              placeholder="请输入密度"
              size="large"
              clearable
              v-model="calcFormData.density"
            >
              <template #suffix>t/m3</template>
            </el-input>
          </el-form-item>
          <el-form-item label="矿山平均运距(单程)" prop="haulDistance">
            <el-input
              placeholder="请输入运距"
              size="large"
              clearable
              v-model="calcFormData.haulDistance"
            >
              <template #suffix>m</template>
            </el-input>
          </el-form-item>
          <el-form-item label="平均坡度" prop="slope">
            <el-input
              placeholder="请输入坡度"
              size="large"
              clearable
              v-model="calcFormData.slope"
            >
              <template #suffix>%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="滚动阻力" prop="resistance">
            <el-input
              placeholder="请输入阻力"
              size="large"
              clearable
              v-model="calcFormData.resistance"
            >
              <template #suffix>%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="工作时间(年计划工作小时)" prop="workTime">
            <el-input
              placeholder="请输入时间"
              size="large"
              clearable
              v-model="calcFormData.workTime"
            >
              <template #suffix>小时</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="line-fa"><div class="line"></div></div>
      <div class="calc-pc-right">
        <div class="right-top">
          <el-form :model="calcFormData" :rules="calcFormRules" inline>
            <el-form-item prop="loadingSel">
              <el-select
                style="width: 170px"
                v-model="calcFormData.loadingSel"
                placeholder="装载设备型号"
                size="large"
                value-key="model"
                @change="loadingChange"
              >
                <el-option
                  v-for="item in loadingList"
                  :key="item.model"
                  :label="item.model"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="transSel">
              <el-select
                style="width: 170px"
                v-model="calcFormData.transSel"
                placeholder="运输设备型号"
                size="large"
                value-key="model"
                @change="transChange"
              >
                <el-option
                  v-for="item in transList"
                  :key="item.model"
                  :label="item.model"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="assistSel">
              <el-select
                style="width: 170px"
                v-model="calcFormData.assistSel"
                placeholder="辅助装载设备型号"
                size="large"
                value-key="model"
                @change="assitsChange"
              >
                <el-option
                  v-for="item in assistList"
                  :key="item.model"
                  :label="item.model"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div
          class="right-btn"
          :style="{
            color: calcFormData.addr ? '#fff' : '#858585',
            'background-color': calcFormData.addr ? '#DEA600' : '#EBEBEB',
          }"
          @click="checkRes"
        >
          查看结果
        </div>
        <div class="right-result">
          <div class="calc-res">
            <div class="res-top-title">计算结果</div>

            <div class="res-top-every">
              <div class="name">预估年产量</div>
              <div class="num">{{ formatNumberRgx(annualOutput) }}t</div>
            </div>
            <van-divider
              :style="{ borderColor: '#D1D1D1', margin: '40px 0' }"
            />

            <div class="res-top-every">
              <div class="name">需要卡车数量</div>
              <div class="num">{{ carTotalNum }}台</div>
            </div>
            <van-divider
              :style="{ borderColor: '#D1D1D1', margin: '40px 0' }"
            />
            <div class="res-top-every">
              <div class="name">设备总价</div>
              <div
                class="num"
                style="font-size: 15px"
                v-if="totalPrice == '具体价格请联系矿山部'"
              >
                {{ totalPrice }}
              </div>
              <div class="num" v-else>
                ￥{{ formatNumberRgx(totalPrice) }}万
              </div>
            </div>
            <van-divider
              :style="{ borderColor: '#D1D1D1', margin: '40px 0' }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="calc-container">
      <div class="home-title-six"><div>矿山产量计算器</div></div>
      <van-form :validate-trigger="'onSubmit'" @submit="checkRes">
        <van-cell-group inset>
          <van-field
            v-model="calcFormData.addr"
            label="矿山地址"
            placeholder="请输入矿山地址"
          />
          <van-field
            v-model="calcFormData.height"
            label="所在海拔高度(m)"
            placeholder="请输入高度"
          />
          <van-field
            v-model="calcFormData.type"
            label="矿石类型"
            placeholder="请输入类型"
          />
          <van-field
            v-model="calcFormData.density"
            label="松方物料密度(t/m³)"
            placeholder="请输入密度"
            :rules="[
              {
                required: true,
                message: '请输入密度',
                trigger: ['onBlur', 'onSubmit'],
              },
            ]"
          />
          <van-field
            v-model="calcFormData.haulDistance"
            label="矿山平均运距(单程)/m"
            placeholder="请输入运距"
            :rules="[
              {
                required: true,
                message: '请输入运距',
                trigger: ['onBlur', 'onSubmit'],
              },
            ]"
          />
          <van-field
            v-model="calcFormData.slope"
            label="平均坡度/%"
            placeholder="请输入坡度"
            :rules="[
              {
                required: true,
                message: '请输入坡度',
                trigger: ['onBlur', 'onSubmit'],
              },
            ]"
          />
          <van-field
            v-model="calcFormData.resistance"
            label="滚动阻力/%"
            placeholder="请输入阻力"
            :rules="[
              {
                required: true,
                message: '请输入阻力',
                trigger: ['onBlur', 'onSubmit'],
              },
            ]"
          />
          <van-field
            v-model="calcFormData.workTime"
            label="工作时间(年计划工作小时)/小时"
            placeholder="请输入时间"
            :rules="[
              {
                required: true,
                message: '请输入时间',
                trigger: ['onBlur', 'onSubmit'],
              },
            ]"
          />
          <van-field
            v-model="calcFormData.loadingSel.model"
            is-link
            readonly
            label="装载设备型号"
            placeholder="请选择型号"
            @click="showLoadingPicker = true"
            :rules="[
              {
                required: true,
                message: '请选择型号',
                trigger: ['onChange', 'onSubmit'],
              },
            ]"
          />
          <van-popup v-model:show="showLoadingPicker" position="bottom">
            <van-picker
              :columns="loadingList"
              :columns-field-names="loadingFieldName"
              @confirm="onLoadingConfirm"
              @cancel="showLoadingPicker = false"
            />
          </van-popup>

          <van-field
            v-model="calcFormData.transSel.model"
            is-link
            readonly
            label="运输设备型号"
            placeholder="请选择型号"
            @click="showTransPicker = true"
            :rules="[
              {
                required: true,
                message: '请选择型号',
                trigger: ['onChange', 'onSubmit'],
              },
            ]"
          />
          <van-popup v-model:show="showTransPicker" position="bottom">
            <van-picker
              :columns="transList"
              :columns-field-names="loadingFieldName"
              @confirm="onTransConfirm"
              @cancel="showTransPicker = false"
            />
          </van-popup>

          <van-field
            v-model="calcFormData.assistSel.model"
            is-link
            readonly
            label="辅助装载设备型号"
            placeholder="请选择型号"
            @click="showAssistPicker = true"
            :rules="[
              {
                required: true,
                message: '请选择型号',
                trigger: ['onChange', 'onSubmit'],
              },
            ]"
          />
          <van-popup v-model:show="showAssistPicker" position="bottom">
            <van-picker
              :columns="assistList"
              :columns-field-names="loadingFieldName"
              @confirm="onAssistConfirm"
              @cancel="showAssistPicker = false"
            />
          </van-popup>
        </van-cell-group>

        <div style="margin: 16px">
          <van-button class="check-btn" round block native-type="submit">
            查看结果
          </van-button>
        </div>
      </van-form>

      <van-overlay :show="resultShow">
        <div class="calc-overlay-container">
          <div class="calc-icon">
            <van-icon
              name="close"
              color="#fff"
              size="44px"
              @click="resultShow = false"
            />
          </div>
          <div class="calc-res">
            <div class="res-top-title">计算结果</div>
            <div class="res-top-every">
              <div class="name">预估年产量</div>
              <div class="num">{{ formatNumberRgx(annualOutput) }}t</div>
            </div>
            <van-divider
              :style="{ borderColor: '#D1D1D1', margin: '20px 0' }"
            />
            <div class="res-top-every">
              <div class="name">需要卡车数量</div>
              <div class="num">{{ carTotalNum }}台</div>
            </div>
            <van-divider
              :style="{ borderColor: '#D1D1D1', margin: '20px 0' }"
            />
            <div class="res-top-every">
              <div class="name">设备总价</div>
              <div
                class="num"
                style="font-size: 15px"
                v-if="totalPrice == '具体价格请联系矿山部'"
              >
                {{ totalPrice }}
              </div>
              <div class="num" v-else>
                ￥{{ formatNumberRgx(totalPrice) }}万
              </div>
            </div>
            <van-divider
              :style="{ borderColor: '#D1D1D1', margin: '20px 0' }"
            />
          </div>
        </div>
      </van-overlay>
    </div>

    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

import Header from "@/layouts/header/index.vue";

import { modelListPort } from "@/request/api/product";
import { formatNumberRgx } from "@/utils/utils";

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };
});

const calcFormData = reactive({
  addr: "",
  height: "",
  type: "",
  density: "",
  haulDistance: "",
  slope: "",
  resistance: "",
  workTime: "",
  loadingSel: {
    model: "",
    dipperCapacity: 0,
    power: 0,
    time: 0,
    price: "",
  },
  transSel: {
    model: "",
    load: 0,
    totalPower: 0,
    netPower: 0,
    carWeight: 0,
    workWeight: 0,
    price: 0,
    assist: "",
    bulldozer: "",
    landLeveller: "",
  },
  assistSel: {
    model: "",
    dipperCapacity: 0,
    power: 0,
    time: 0,
    price: "",
  },
});
const calcFormRules = reactive({
  density: [
    {
      required: true,
      message: "请输入密度",
      trigger: "blur",
    },
  ],
  haulDistance: [
    {
      required: true,
      message: "请输入运距",
      trigger: "blur",
    },
  ],
  slope: [
    {
      required: true,
      message: "请输入坡度",
      trigger: "blur",
    },
  ],
  resistance: [
    {
      required: true,
      message: "请输入阻力",
      trigger: "blur",
    },
  ],
  workTime: [
    {
      required: true,
      message: "请输入工作时间",
      trigger: "blur",
    },
  ],
  loadingSel: [
    {
      required: true,
      message: "请选择型号",
      trigger: "change",
    },
  ],
  transSel: [
    {
      required: true,
      message: "请选择型号",
      trigger: "change",
    },
  ],
  assistSel: [
    {
      required: true,
      message: "请选择型号",
      trigger: "change",
    },
  ],
});

// 设备标准斗容
let equipmentDipperCapacity = 0;
let equipmentPrice: any = 0;
// 设备额定载荷
let equipmentLoad = 0;
let loadPrice: any = 0;
// 设备工作重量
let equipmentWeight = 0;
let weightPrice: any = 0;
// 推土板宽度
let mouldboardWidth = 0;
let widthPrice: any = 0;
// 辅助设备标准斗容
let assitsDipperCapacity = 0;
let assetsPrice: any = 0;

// 装载设备型号
const showLoadingPicker = ref(false);
const loadingList = ref([
  {
    model: "374",
    dipperCapacity: 4.6,
    power: 382,
    time: 0.4,
    price: "",
  },
  {
    model: "390",
    dipperCapacity: 5.24,
    power: 412,
    time: 0.5,
    price: "",
  },
  {
    model: "6015",
    dipperCapacity: 7,
    power: 522,
    time: 0.45,
    price: 1150,
  },
  {
    model: "6018",
    dipperCapacity: 10,
    power: 858,
    time: 0.46,
    price: 2550,
  },
  {
    model: "6030",
    dipperCapacity: 16.5,
    power: 1140,
    time: 0.47,
    price: 3550,
  },
  {
    model: "6040",
    dipperCapacity: 22,
    power: 1516,
    time: 0.48,
    price: 4800,
  },
  {
    model: "6050",
    dipperCapacity: 26,
    power: 1880,
    time: 0.49,
    price: "具体价格请联系矿山部",
  },
  {
    model: "6060",
    dipperCapacity: 34,
    power: 2240,
    time: 0.5,
    price: "具体价格请联系矿山部",
  },
  {
    model: "6090",
    dipperCapacity: 52,
    power: 3360,
    time: 0.52,
    price: "具体价格请联系矿山部",
  },
  {
    model: "7295",
    dipperCapacity: 25,
    power: 2152,
    time: 0.55,
    price: "具体价格请联系矿山部",
  },
  {
    model: "7395",
    dipperCapacity: 35,
    power: 3106,
    time: 0.57,
    price: "具体价格请联系矿山部",
  },
  {
    model: "7495HD",
    dipperCapacity: 46,
    power: 3330,
    time: 0.59,
    price: "具体价格请联系矿山部",
  },
  {
    model: "7495",
    dipperCapacity: 62,
    power: 3737,
    time: 0.61,
    price: "具体价格请联系矿山部",
  },
  {
    model: "7495HF",
    dipperCapacity: 62,
    power: 3737,
    time: 0.63,
    price: "具体价格请联系矿山部",
  },
  {
    model: "988K",
    dipperCapacity: 6.4,
    power: "",
    time: 0.6,
    price: 780,
  },
  {
    model: "990H",
    dipperCapacity: 8.6,
    power: "",
    time: 0.62,
    price: 1100,
  },
  {
    model: "992K",
    dipperCapacity: 10.7,
    power: "",
    time: 0.64,
    price: "具体价格请联系矿山部",
  },
  {
    model: "993K",
    dipperCapacity: 13,
    power: "",
    time: 0.66,
    price: "具体价格请联系矿山部",
  },
  {
    model: "994H",
    dipperCapacity: 19,
    power: "",
    time: 0.68,
    price: "具体价格请联系矿山部",
  },
]);
const loadingFieldName = {
  text: "model",
};

const onLoadingConfirm = (val: any) => {
  console.log(val);
  calcFormData.loadingSel = val;
  loadingChange();
  showLoadingPicker.value = false;
};
const loadingChange = () => {
  equipmentDipperCapacity = calcFormData.loadingSel.dipperCapacity;
  equipmentPrice = calcFormData.loadingSel.price;
  cyclingTime = calcFormData.loadingSel.time;
};

// 运输设备型号
const showTransPicker = ref(false);
const transList = ref([
  {
    model: "772G",
    load: 47.2,
    totalPower: 446,
    netPower: 415,
    carWeight: 34.9,
    workWeight: 82.1,
    price: 2100,
    assist: "988K",
    bulldozer: "D9T",
    landLeveller: "14M",
  },
  {
    model: "773E",
    load: 55.5,
    totalPower: 530,
    netPower: 501,
    carWeight: 43.8,
    workWeight: 99.3,
    price: 2940,
    assist: "990H",
    bulldozer: "D9T",
    landLeveller: "16M",
  },
  {
    model: "777D",
    load: 90.4,
    totalPower: 746,
    netPower: 699,
    carWeight: 73,
    workWeight: 163.4,
    price: 4900,
    assist: "992K",
    bulldozer: "D9T",
    landLeveller: "16M",
  },
  {
    model: "785D",
    load: 133.9,
    totalPower: 1082,
    netPower: 979,
    carWeight: 115.5,
    workWeight: 249.4,
    price: 13300,
    assist: "993K",
    bulldozer: "D10T2",
    landLeveller: "24M",
  },
  {
    model: "789D",
    load: 185,
    totalPower: 1566,
    netPower: 1468,
    carWeight: 139.5,
    workWeight: 324.5,
    price: 16800,
    assist: "994H",
    bulldozer: "D10T2",
    landLeveller: "24M",
  },
  {
    model: "793D",
    load: 226.3,
    totalPower: 1801,
    netPower: 1694,
    carWeight: 157.4,
    workWeight: 383.7,
    price: 25900,
    assist: "",
    bulldozer: "D11T",
    landLeveller: "24M",
  },
  {
    model: "795F AC",
    load: 315,
    totalPower: 2535,
    netPower: 2375,
    carWeight: 257.3,
    workWeight: 572.3,
    price: "具体价格请联系矿山部",
    assist: "",
    bulldozer: "D11T",
    landLeveller: "24M",
  },
  {
    model: "797F",
    load: 363,
    totalPower: 2983,
    netPower: 2830,
    carWeight: 273.6,
    workWeight: 636.6,
    price: "具体价格请联系矿山部",
    assist: "",
    bulldozer: "D11T",
    landLeveller: "24M",
  },
  {
    model: "MT5300D AC",
    load: 291,
    totalPower: 2500,
    netPower: 2338,
    carWeight: 215.5,
    workWeight: 506.5,
    price: "具体价格请联系矿山部",
    assist: "",
    bulldozer: "D11T",
    landLeveller: "24M",
  },
  {
    model: "MT4400D AC",
    load: 221,
    totalPower: 1864,
    netPower: 1746,
    carWeight: 171.7,
    workWeight: 392.7,
    price: "具体价格请联系矿山部",
    assist: "",
    bulldozer: "D11T",
    landLeveller: "24M",
  },
]);

const onTransConfirm = (val: any) => {
  console.log(val);
  calcFormData.transSel = val;
  transChange();
  showTransPicker.value = false;
};
const transChange = () => {
  equipmentLoad = calcFormData.transSel.load;
  loadPrice = calcFormData.transSel.price;

  for (const item of bulldozerList.value) {
    if (item.model == calcFormData.transSel.bulldozer) {
      equipmentWeight = item.weight;
      weightPrice = item.price;
    }
  }

  for (const item of landLevellerList.value) {
    if (item.model == calcFormData.transSel.landLeveller) {
      mouldboardWidth = item.width;
      widthPrice = item.price;
    }
  }
};

// 辅助装载设备型号
const showAssistPicker = ref(false);
const assistList = ref([
  {
    model: "988K",
    dipperCapacity: 6.4,
    power: "",
    time: 0.6,
    price: 780,
  },
  {
    model: "990H",
    dipperCapacity: 8.6,
    power: "",
    time: 0.62,
    price: 1100,
  },
  {
    model: "992K",
    dipperCapacity: 10.7,
    power: "",
    time: 0.64,
    price: "具体价格请联系矿山部",
  },
  {
    model: "993K",
    dipperCapacity: 13,
    power: "",
    time: 0.66,
    price: "具体价格请联系矿山部",
  },
  {
    model: "994H",
    dipperCapacity: 19,
    power: "",
    time: 0.68,
    price: "具体价格请联系矿山部",
  },
]);

const onAssistConfirm = (val: any) => {
  console.log(val);
  calcFormData.assistSel = val;
  assitsChange();
  showAssistPicker.value = false;
};
const assitsChange = () => {
  assitsDipperCapacity = calcFormData.assistSel.dipperCapacity;
  assetsPrice = calcFormData.assistSel.price;
};

// 辅助-推土机
const bulldozerList = ref([
  {
    model: "D9T",
    weight: 50098,
    price: 630,
  },
  {
    model: "D10T2",
    weight: 70171,
    price: 1100,
  },
  {
    model: "D11T",
    weight: 104257,
    price: 1700,
  },
]);
// 辅助-平地机
const landLevellerList = ref([
  {
    model: "14M",
    width: 4.3,
    price: 600,
  },
  {
    model: "16M",
    width: 4.9,
    price: 900,
  },
  {
    model: "24M",
    width: 7.3,
    price: 1200,
  },
]);

let numberTimes = 0;
let cyclingTime = 0;
let coefficient = 0;
let actualStowed = 0;

let time1 = 0;
let time2 = 0;
let carNumber1 = 0;
let carNumber2 = 0;

const totalPrice: any = ref(0);
const carTotalNum = ref(0);
const annualOutput = ref(0);

// 查看结果
const resultShow = ref(false);
const calcFormRef = ref();

const checkRes = () => {
  if (cliWidth.value > 768) {
    calcFormRef.value.validate((valid: any, fields: any) => {
      if (valid) {
        console.log("success submit!!!");

        if (
          !calcFormData.loadingSel.model ||
          !calcFormData.transSel.model ||
          !calcFormData.assistSel.model
        ) {
          ElMessage.error("请选择设备型号");
        } else {
          calcResult();
        }
      } else {
        console.log("error submit!", fields);
      }
    });
  } else {
    calcResult();
  }
};

const calcResult = () => {
  numberTimes = Number(
    (
      Number(equipmentLoad) /
      Number(equipmentDipperCapacity) /
      Number(calcFormData.density) /
      0.95
    ).toFixed(0)
  );
  console.log(numberTimes);

  coefficient =
    (numberTimes *
      Number(calcFormData.density) *
      Number(equipmentDipperCapacity) *
      0.95) /
    Number(equipmentLoad);
  actualStowed =
    numberTimes *
    Number(equipmentDipperCapacity) *
    Number(calcFormData.density) *
    0.95;
  time1 = cyclingTime * (numberTimes - 1) + 0.75;

  let f3 = 0,
    k3 = 0,
    m3 = 0;
  f3 = Number(calcFormData.haulDistance) * 0.75;

  let sSum =
    Number(calcFormData.resistance) / 100 + Number(calcFormData.slope) / 100;
  console.log(sSum);

  let res1 =
    Math.abs(
      ((calcFormData.transSel.netPower * 0.98) /
        calcFormData.transSel.workWeight /
        sSum /
        9.8) *
        3.6
    ) - 1;
  if (res1 < 60.4) {
    k3 = res1;
  } else {
    k3 = 60.4;
  }
  if (k3 < 40) {
    m3 = k3;
  } else {
    m3 = 40;
  }
  let resultEnd1 = Number(((f3 / m3 / 1000) * 60).toFixed(2));

  let f4 = 0;
  f4 = Number(calcFormData.haulDistance) * 0.25;

  let resultEnd2 = Number(((f4 / m3 / 1000) * 60).toFixed(2));
  console.log(resultEnd1, resultEnd2);

  time2 = resultEnd1 * 2 + resultEnd2 * 2 + 0.2 + 0.2 + 1.3 + 1;

  carNumber1 = (time2 + time1) / time1;
  carTotalNum.value = Number(carNumber1.toFixed(0));
  if (carNumber1 < carTotalNum.value) {
    carNumber2 =
      ((Number(calcFormData.workTime) * 60) / (time2 + time1)) * carNumber1;
  } else {
    carNumber2 =
      ((Number(calcFormData.workTime) * 60) / (time2 + time1)) *
      carTotalNum.value;
  }

  annualOutput.value = Number(
    (carNumber2 * actualStowed * 0.81 * 0.83).toFixed(0)
  );

  console.log(
    "总价",
    equipmentPrice,
    loadPrice,
    weightPrice,
    widthPrice,
    assetsPrice
  );

  if (
    equipmentPrice == "具体价格请联系矿山部" ||
    loadPrice == "具体价格请联系矿山部" ||
    weightPrice == "具体价格请联系矿山部" ||
    widthPrice == "具体价格请联系矿山部" ||
    assetsPrice == "具体价格请联系矿山部"
  ) {
    totalPrice.value = "具体价格请联系矿山部";
  } else {
    totalPrice.value =
      Number(equipmentPrice) +
      Number(loadPrice) +
      Number(weightPrice) +
      Number(widthPrice) +
      Number(assetsPrice);
  }

  resultShow.value = true;
};

// 获取型号列表
const getList = () => {
  modelListPort().then((res) => {
    console.log("型号列表", res);
  });
};
getList();
</script>

<style scoped lang="scss">
@media screen and (min-width: 768px) {
  .calc-main-content {
    width: fit-content;
    max-width: 85%;
    margin: 0 auto 130px;
  }
  .second-nav {
    margin-bottom: 0;
  }

  .calc-pc-main {
    display: flex;

    .line-fa {
      display: flex;
      align-items: flex-end;

      .line {
        width: 1px;
        height: 789px;
        margin: 0 5vw;
        background-color: #e6e6e6;
      }
    }

    .right-btn {
      width: 200px;
      height: 52px;
      margin: 32px auto 0;
      line-height: 52px;
      text-align: center;
      border-radius: 155px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    .right-result {
      .calc-res {
        width: -webkit-fill-available;
        margin-top: 40px;
        padding: 50px 50px 35px;
        background: #f5f5f5;

        .res-top-title {
          padding-bottom: 50px;
          font-weight: 700;
          font-size: 24px;
          color: #1a1a1a;
        }

        .res-top-every {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .name {
            font-weight: 400;
            font-size: 18px;
            color: #4d4d4d;
          }

          .num {
            font-family: "Roboto";
            font-weight: 600;
            font-size: 34px;
            color: #dea600;
          }
        }
      }
    }
  }
}

.home-title-six {
  background: url("../../../assets/imgs/pc/common/titleBack6.png") no-repeat;
  background-size: 100% 100%;
}

@media screen and (min-width: 1200px) {
  .home-title-six {
    margin-top: 38px;
    margin-bottom: 39px;

    div {
      padding: 20px 8px 24px 10px;
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

  .calc-container {
    padding: 0 15px;

    .check-btn {
      width: 150px;
      height: 40px;
      margin: 40px auto 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 14px;
      color: #1a1a1a;
      background: #f5c71b;
      border-radius: 57px;
    }
  }

  .calc-overlay-container {
    width: -webkit-fill-available;
    height: 100vh;
    padding: 15vh 15px 0;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;

    .calc-icon {
      width: 100%;
      text-align: right;
    }
    .calc-res {
      width: -webkit-fill-available;
      margin-top: 30px;
      padding: 26px 20px 6px;
      background: #f5f5f5;

      .res-top-title {
        padding-bottom: 30px;
        font-weight: 700;
        font-size: 18px;
        color: #1a1a1a;
      }

      .res-top-every {
        .name {
          font-weight: 400;
          font-size: 14px;
          color: #4d4d4d;
        }

        .num {
          margin-top: 10px;
          font-family: "Roboto";
          font-weight: 600;
          font-size: 24px;
          color: #dea600;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.calc-container {
  .van-cell-group--inset {
    margin: 0;
  }

  .van-cell {
    padding: 20px 0 16px;
    justify-content: space-between;
  }

  .van-field__label {
    width: fit-content;
    color: #1a1a1a;
  }

  .van-field__control {
    text-align: right;
  }

  .van-cell:after {
    right: 0;
    left: 0;
    border-bottom: 1px solid #e6e6e6;
  }

  .van-field__error-message {
    text-align: right;
  }

  // .van-cell__right-icon {
  //   margin-top: 16px;
  //   margin-bottom: 10px;
  //   vertical-align: middle;
  //   float: right;
  // }
}
</style>
