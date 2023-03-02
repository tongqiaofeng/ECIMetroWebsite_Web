<template>
  <!-- <div>产品详情</div> -->
  <div v-if="cliWidth > 1000" class="eci-main-content grab-detail-content">
    <div class="second-nav">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-if="typeVal == 1" :to="{ path: '/product/grab' }"
          >机械设备</el-breadcrumb-item
        >
        <el-breadcrumb-item
          v-if="typeVal == 2"
          :to="{ path: '/alliance', query: { name: pageNameVal } }"
          >{{ pageNameVal }}</el-breadcrumb-item
        >
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
              发动机型号：{{ productInfo.engineModel }}
            </div>
            <div class="global-params-every">
              净功率：{{ productInfo.engineNetPower + " KW" }}
            </div>
            <div class="global-params-every">
              工作重量：{{ productInfo.weightWork + " kg" }}
            </div>
            <div class="global-params-every">
              铲斗容量：{{ productInfo.bucketCapacity + " m³" }}
            </div>
            <div class="global-params-every" v-if="productInfo.maxReachRange">
              挖掘深度：{{ productInfo.maxReachRange + " mm" }}
            </div>
          </div>
          <div class="product-detail-btn-down">
            <div class="btn-down-every" @click="askPrice">
              <img src="../../assets/imgs/pc/detail/down.png" />
              下载产品手册
            </div>
            <div
              @click="go720Address(productInfo && productInfo.overallViewUrl)"
              class="btn-down-every two"
            >
              <img src="../../assets/imgs/pc/detail/look.png" />720度看机
            </div>
            <router-link
              :to="{
                path: '/product/comparison',
                query: { productId: productInfo.id },
              }"
              class="btn-down-every three"
              ><img
                src="../../assets/imgs/pc/detail/compair.png"
              />产品对比</router-link
            >
          </div>
          <div class="product-detail-btn-buy">
            <!-- 跳转微盟 -->
            <a
              v-if="productInfo.h5Url"
              :href="productInfo.h5Url"
              target="_blank"
              class="btn-buy"
              >立刻购买</a
            >
            <div v-else class="btn-buy-gray">立刻购买</div>

            <!-- 跳转腾讯企点客服窗口 -->
            <div class="btn-price" @click="askPrice">立即询价</div>
            <div class="btn-lease" @click="leaseClick()">一键租赁</div>
          </div>

          <el-dialog
            v-if="leaseShow"
            title="一键租赁"
            v-model="leaseShow"
            class="dialog-box"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            center
            width="520px"
          >
            <div>
              <el-form
                ref="leaseForm"
                :model="leaseFormData"
                :rules="leaseFormRules"
                label-width="82px"
              >
                <el-form-item label="手机号：" prop="phoneNumber">
                  <el-input
                    type="tel"
                    size="large"
                    clearable
                    placeholder="请输入手机号"
                    v-model="leaseFormData.phoneNumber"
                  ></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="fullName">
                  <el-input
                    type="text"
                    size="large"
                    clearable
                    placeholder="请输入姓名"
                    v-model="leaseFormData.fullName"
                  ></el-input>
                </el-form-item>
                <el-form-item label="地址：" prop="addressList">
                  <el-cascader
                    :props="{ value: 'label' }"
                    placeholder="请选择地址"
                    :popper-append-to-body="false"
                    size="large"
                    v-model="leaseFormData.addressList"
                    :options="cityList"
                  />
                </el-form-item>
                <el-form-item label="租赁日期：" prop="leaseTime">
                  <el-date-picker
                    size="large"
                    v-model="leaseFormData.leaseTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="备注：" prop="note">
                  <el-input
                    type="textarea"
                    placeholder="请输入备注"
                    v-model="leaseFormData.note"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button size="large" @click="leaseShow = false"
                  >取 消</el-button
                >
                <el-button
                  type="primary"
                  size="large"
                  v-preventClick
                  @click="leaseSure"
                  >提 交</el-button
                >
              </span>
            </template>
          </el-dialog>
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
          <div class="detail-main">
            <van-divider />
            <div>
              <div class="engine">
                <div class="title">发动机</div>
                <div class="engine-params">
                  <div class="params-every">
                    <div class="params parameter">发动机型号</div>
                    <div class="params">
                      {{ productInfo.engineModel }}
                    </div>
                  </div>
                  <div class="params-every">
                    <div class="params parameter">净功率</div>
                    <div class="params">
                      {{ productInfo.engineNetPower + "KW" }}
                    </div>
                  </div>
                  <div class="params-every">
                    <div class="params parameter">总功率</div>
                    <div class="params">
                      {{ productInfo.enginePower + "KW" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.engineCylinderBore"
                  >
                    <div class="params parameter">缸径</div>
                    <div class="params">
                      {{ productInfo.engineCylinderBore + "mm" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.engineStroke">
                    <div class="params parameter">冲程</div>
                    <div class="params">
                      {{ productInfo.engineStroke + "mm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.engineDisplacement"
                  >
                    <div class="params parameter">排量</div>
                    <div class="params">
                      {{ productInfo.engineDisplacement + "L" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.engineDieselUsed">
                    <div class="params parameter">可使用生物柴油</div>
                    <div class="params">
                      {{ productInfo.engineDieselUsed }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="
                productInfo.rotaryMachinerySpeed ||
                productInfo.rotaryMachineryMaxTorque
              "
            />
            <div
              v-if="
                productInfo.rotaryMachinerySpeed ||
                productInfo.rotaryMachineryMaxTorque
              "
            >
              <div class="engine">
                <div class="title">回转机械装置</div>
                <div class="engine-params">
                  <div
                    class="params-every"
                    v-if="productInfo.rotaryMachinerySpeed"
                  >
                    <div class="params parameter">回转速度</div>
                    <div class="params">
                      {{ productInfo.rotaryMachinerySpeed + "rpm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.rotaryMachineryMaxTorque"
                  >
                    <div class="params parameter">最大回转扭矩</div>
                    <div class="params">
                      {{ productInfo.rotaryMachineryMaxTorque + "KN.m" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider />
            <div>
              <div class="engine">
                <div class="title">重量</div>
                <div class="engine-params">
                  <div class="params-every">
                    <div class="params parameter">含顶蓬的工作重量</div>
                    <div class="params">
                      {{ productInfo.weightWork + "kg" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="
                productInfo.hydraulicArmCylinderBore ||
                productInfo.hydraulicArmCylinderStroke ||
                productInfo.hydraulicBoomCylinderBore ||
                productInfo.hydraulicBoomCylinderStroke ||
                productInfo.hydraulicBucketCylinderBore ||
                productInfo.hydraulicBucketCylinderStroke ||
                productInfo.hydraulicEquipmentMaxPressure ||
                productInfo.hydraulicMaxSystemFlow ||
                productInfo.hydraulicRotationMaxPressure ||
                productInfo.hydraulicSteerMaxPressure
              "
            />
            <div
              v-if="
                productInfo.hydraulicArmCylinderBore ||
                productInfo.hydraulicArmCylinderStroke ||
                productInfo.hydraulicBoomCylinderBore ||
                productInfo.hydraulicBoomCylinderStroke ||
                productInfo.hydraulicBucketCylinderBore ||
                productInfo.hydraulicBucketCylinderStroke ||
                productInfo.hydraulicEquipmentMaxPressure ||
                productInfo.hydraulicMaxSystemFlow ||
                productInfo.hydraulicRotationMaxPressure ||
                productInfo.hydraulicSteerMaxPressure
              "
            >
              <div class="engine">
                <div class="title">液压系统</div>
                <div class="engine-params">
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicArmCylinderBore"
                  >
                    <div class="params parameter">斗杆油缸-缸径</div>
                    <div class="params">
                      {{ productInfo.hydraulicArmCylinderBore + "mm" }}
                    </div>
                  </div>

                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicArmCylinderStroke"
                  >
                    <div class="params parameter">斗杆油缸-冲程</div>
                    <div class="params">
                      {{ productInfo.hydraulicArmCylinderStroke + "mm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicBoomCylinderBore"
                  >
                    <div class="params parameter">动臂油缸-缸径</div>
                    <div class="params">
                      {{ productInfo.hydraulicBoomCylinderBore + "mm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicBoomCylinderStroke"
                  >
                    <div class="params parameter">动臂油缸-冲程</div>
                    <div class="params">
                      {{ productInfo.hydraulicBoomCylinderStroke + "mm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicBucketCylinderBore"
                  >
                    <div class="params parameter">铲斗油缸-缸径</div>
                    <div class="params">
                      {{ productInfo.hydraulicBucketCylinderBore + "mm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicBucketCylinderStroke"
                  >
                    <div class="params parameter">铲斗油缸-冲程</div>
                    <div class="params">
                      {{ productInfo.hydraulicBucketCylinderStroke + "mm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicEquipmentMaxPressure"
                  >
                    <div class="params parameter">最大压力-设备-执行</div>
                    <div class="params">
                      {{ productInfo.hydraulicEquipmentMaxPressure + "kPa" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicMaxSystemFlow"
                  >
                    <div class="params parameter">最大流量-执行</div>
                    <div class="params">
                      {{ productInfo.hydraulicMaxSystemFlow }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicRotationMaxPressure"
                  >
                    <div class="params parameter">最大压力-回转</div>
                    <div class="params">
                      {{ productInfo.hydraulicRotationMaxPressure + "kPa" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicSteerMaxPressure"
                  >
                    <div class="params parameter">最大压力-行驶</div>
                    <div class="params">
                      {{ productInfo.hydraulicSteerMaxPressure + "kPa" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="
                productInfo.trackWidth ||
                productInfo.trackNum ||
                productInfo.trackThrustWheelNum ||
                productInfo.trackCarrierSprocketNum
              "
            />
            <div
              v-if="
                productInfo.trackWidth ||
                productInfo.trackNum ||
                productInfo.trackThrustWheelNum ||
                productInfo.trackCarrierSprocketNum
              "
            >
              <div class="engine">
                <div class="title">履带</div>
                <div class="engine-params">
                  <div class="params-every" v-if="productInfo.trackWidth">
                    <div class="params parameter">履带板宽度</div>
                    <div class="params">
                      {{ productInfo.trackWidth + "mm" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.trackNum">
                    <div class="params parameter">履带板数量(每侧)</div>
                    <div class="params">
                      {{ productInfo.trackNum }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.trackThrustWheelNum"
                  >
                    <div class="params parameter">履带支重轮数量(每侧)</div>
                    <div class="params">
                      {{ productInfo.trackThrustWheelNum }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.trackCarrierSprocketNum"
                  >
                    <div class="params parameter">托链轮数量(每侧)</div>
                    <div class="params">
                      {{ productInfo.trackCarrierSprocketNum }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="
                productInfo.driveGradient ||
                productInfo.driveMaxSpeed ||
                productInfo.driveMaxTraction
              "
            />
            <div
              v-if="
                productInfo.driveGradient ||
                productInfo.driveMaxSpeed ||
                productInfo.driveMaxTraction
              "
            >
              <div class="engine">
                <div class="title">驱动</div>
                <div class="engine-params">
                  <div class="params-every" v-if="productInfo.driveGradient">
                    <div class="params parameter">爬坡度</div>
                    <div class="params">
                      {{ productInfo.driveGradient }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.driveMaxSpeed">
                    <div class="params parameter">最高行驶速度</div>
                    <div class="params">
                      {{ productInfo.driveMaxSpeed + "km/h" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.driveMaxTraction">
                    <div class="params parameter">最大牵引力</div>
                    <div class="params">
                      {{ productInfo.driveMaxTraction + "kN" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="
                productInfo.capacityFuelTank ||
                productInfo.capacityCooling ||
                productInfo.capacityEngineOil ||
                productInfo.capacityRotationDrive ||
                productInfo.capacityFinalDrive ||
                productInfo.capacityHydraulicSystem ||
                productInfo.capacityHydraulicTank ||
                productInfo.bucketCapacity ||
                productInfo.maxReachRange
              "
            />
            <div
              v-if="
                productInfo.capacityFuelTank ||
                productInfo.capacityCooling ||
                productInfo.capacityEngineOil ||
                productInfo.capacityRotationDrive ||
                productInfo.capacityFinalDrive ||
                productInfo.capacityHydraulicSystem ||
                productInfo.capacityHydraulicTank ||
                productInfo.bucketCapacity ||
                productInfo.maxReachRange
              "
            >
              <div class="engine">
                <div class="title">维修加注容量</div>
                <div class="engine-params">
                  <div class="params-every" v-if="productInfo.bucketCapacity">
                    <div class="params parameter">铲斗容量</div>
                    <div class="params">
                      {{ productInfo.bucketCapacity + "m³" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.maxReachRange">
                    <div class="params parameter">挖掘深度</div>
                    <div class="params">
                      {{ productInfo.maxReachRange + "mm" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.capacityFuelTank">
                    <div class="params parameter">燃油箱容量</div>
                    <div class="params">
                      {{ productInfo.capacityFuelTank + "L" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.capacityCooling">
                    <div class="params parameter">冷却系统</div>
                    <div class="params">
                      {{ productInfo.capacityCooling + "L" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.capacityEngineOil"
                  >
                    <div class="params parameter">发动机机油(含滤清器)</div>
                    <div class="params">
                      {{ productInfo.capacityEngineOil + "L" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.capacityRotationDrive"
                  >
                    <div class="params parameter">回转驱动(每个)</div>
                    <div class="params">
                      {{ productInfo.capacityRotationDrive + "L" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.capacityFinalDrive"
                  >
                    <div class="params parameter">终传动(每个)</div>
                    <div class="params">
                      {{ productInfo.capacityFinalDrive + "L" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.capacityHydraulicSystem"
                  >
                    <div class="params parameter">液压系统油容量(含油箱)</div>
                    <div class="params">
                      {{ productInfo.capacityHydraulicSystem }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.capacityHydraulicTank"
                  >
                    <div class="params parameter">液压油箱(含吸入管)</div>
                    <div class="params">
                      {{ productInfo.capacityHydraulicTank }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="productInfo.extendBoom || productInfo.largeVolumeBoom"
            />
            <div v-if="productInfo.extendBoom || productInfo.largeVolumeBoom">
              <div class="engine">
                <div class="title">动臂</div>
                <div class="engine-params">
                  <div class="params-every" v-if="productInfo.extendBoom">
                    <div class="params parameter">伸展动臂</div>
                    <div class="params">
                      {{ productInfo.extendBoom }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.largeVolumeBoom">
                    <div class="params parameter">大斗量动臂</div>
                    <div class="params">
                      {{ productInfo.largeVolumeBoom }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="productInfo.extendStick || productInfo.largeVolumeStick"
            />
            <div v-if="productInfo.extendStick || productInfo.largeVolumeStick">
              <div class="engine">
                <div class="title">斗杆</div>
                <div class="engine-params">
                  <div class="params-every" v-if="productInfo.extendStick">
                    <div class="params parameter">伸展斗杆</div>
                    <div class="params">
                      {{ productInfo.extendStick }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.largeVolumeStick">
                    <div class="params parameter">大容量型斗杆</div>
                    <div class="params">
                      {{ productInfo.largeVolumeStick }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

    <div
      v-if="productInfo && productInfo.recycleList.length > 0"
      class="second-container grab-tabs-pc-container"
    >
      <div class="home-title-six">
        <div>相关二手机推荐</div>
      </div>
      <div class="product-list-content">
        <div
          v-for="(item, index) in productInfo.recycleList"
          :key="index"
          class="item"
          @click="checkDetail(item)"
        >
          <div class="item-img">
            <img class="img" :src="base_request_url + '/file/' + item.imgUrl" />
          </div>
          <div class="title">{{ item.model }}</div>
          <div class="btn">了解详情</div>
        </div>
      </div>
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
              发动机型号：{{ productInfo.engineModel }}
            </div>
            <div class="global-params-every">
              净功率：{{ productInfo.engineNetPower + " KW" }}
            </div>
            <div class="global-params-every">
              工作重量：{{ productInfo.weightWork + " kg" }}
            </div>
            <div class="global-params-every">
              铲斗容量：{{ productInfo.bucketCapacity + " m³" }}
            </div>
            <div class="global-params-every" v-if="productInfo.maxReachRange">
              挖掘深度：{{ productInfo.maxReachRange + " mm" }}
            </div>
          </div>
          <div class="product-detail-btn-down">
            <div class="btn-down-every" @click="askPrice">
              <img src="../../assets/imgs/pc/detail/down.png" />
              下载产品手册
            </div>
            <div
              @click="go720Address(productInfo && productInfo.overallViewUrl)"
              class="btn-down-every two"
            >
              <img src="../../assets/imgs/pc/detail/look.png" />720度看机
            </div>
            <router-link
              :to="{
                path: '/product/comparison',
                query: { productId: productInfo.id },
              }"
              class="btn-down-every three"
              ><img
                src="../../assets/imgs/pc/detail/compair.png"
              />产品对比</router-link
            >
          </div>
          <div class="product-detail-btn-buy">
            <!-- 跳转微盟 -->
            <a
              v-if="productInfo.h5Url"
              :href="productInfo.h5Url"
              target="_blank"
              class="btn-buy"
              >立刻购买</a
            >
            <div v-else class="btn-buy-gray">立刻购买</div>

            <!-- 跳转腾讯企点客服窗口 -->
            <div class="btn-price" @click="askPrice">立即询价</div>
            <div class="btn-lease" @click="leaseClick()">一键租赁</div>
          </div>

          <el-dialog
            v-if="leaseShow"
            title="一键租赁"
            v-model="leaseShow"
            class="dialog-box"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            center
            width="520px"
          >
            <div>
              <el-form
                ref="leaseForm"
                :model="leaseFormData"
                :rules="leaseFormRules"
                label-width="82px"
              >
                <el-form-item label="手机号：" prop="phoneNumber">
                  <el-input
                    type="tel"
                    size="large"
                    clearable
                    placeholder="请输入手机号"
                    v-model="leaseFormData.phoneNumber"
                  ></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="fullName">
                  <el-input
                    type="text"
                    size="large"
                    clearable
                    placeholder="请输入姓名"
                    v-model="leaseFormData.fullName"
                  ></el-input>
                </el-form-item>
                <el-form-item label="地址：" prop="addressList">
                  <el-cascader
                    :props="{ value: 'label' }"
                    placeholder="请选择地址"
                    :popper-append-to-body="false"
                    size="large"
                    v-model="leaseFormData.addressList"
                    :options="cityList"
                  />
                </el-form-item>
                <el-form-item label="租赁日期：" prop="leaseTime">
                  <el-date-picker
                    size="large"
                    v-model="leaseFormData.leaseTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="备注：" prop="note">
                  <el-input
                    type="textarea"
                    placeholder="请输入备注"
                    v-model="leaseFormData.note"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button size="large" @click="leaseShow = false"
                  >取 消</el-button
                >
                <el-button
                  type="primary"
                  size="large"
                  v-preventClick
                  @click="leaseSure"
                  >提 交</el-button
                >
              </span>
            </template>
          </el-dialog>
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
          <div class="detail-main">
            <van-divider />
            <div>
              <div class="engine">
                <div class="title">发动机</div>
                <div class="engine-params">
                  <div class="params-every">
                    <div class="params parameter">发动机型号</div>
                    <div class="params">
                      {{ productInfo.engineModel }}
                    </div>
                  </div>
                  <div class="params-every">
                    <div class="params parameter">净功率</div>
                    <div class="params">
                      {{ productInfo.engineNetPower + "KW" }}
                    </div>
                  </div>
                  <div class="params-every">
                    <div class="params parameter">总功率</div>
                    <div class="params">
                      {{ productInfo.enginePower + "KW" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.engineCylinderBore"
                  >
                    <div class="params parameter">缸径</div>
                    <div class="params">
                      {{ productInfo.engineCylinderBore + "mm" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.engineStroke">
                    <div class="params parameter">冲程</div>
                    <div class="params">
                      {{ productInfo.engineStroke + "mm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.engineDisplacement"
                  >
                    <div class="params parameter">排量</div>
                    <div class="params">
                      {{ productInfo.engineDisplacement + "L" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.engineDieselUsed">
                    <div class="params parameter">可使用生物柴油</div>
                    <div class="params">
                      {{ productInfo.engineDieselUsed }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="
                productInfo.rotaryMachinerySpeed ||
                productInfo.rotaryMachineryMaxTorque
              "
            />
            <div
              v-if="
                productInfo.rotaryMachinerySpeed ||
                productInfo.rotaryMachineryMaxTorque
              "
            >
              <div class="engine">
                <div class="title">回转机械装置</div>
                <div class="engine-params">
                  <div
                    class="params-every"
                    v-if="productInfo.rotaryMachinerySpeed"
                  >
                    <div class="params parameter">回转速度</div>
                    <div class="params">
                      {{ productInfo.rotaryMachinerySpeed + "rpm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.rotaryMachineryMaxTorque"
                  >
                    <div class="params parameter">最大回转扭矩</div>
                    <div class="params">
                      {{ productInfo.rotaryMachineryMaxTorque + "KN.m" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider />
            <div>
              <div class="engine">
                <div class="title">重量</div>
                <div class="engine-params">
                  <div class="params-every">
                    <div class="params parameter">含顶蓬的工作重量</div>
                    <div class="params">
                      {{ productInfo.weightWork + "kg" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="
                productInfo.hydraulicArmCylinderBore ||
                productInfo.hydraulicArmCylinderStroke ||
                productInfo.hydraulicBoomCylinderBore ||
                productInfo.hydraulicBoomCylinderStroke ||
                productInfo.hydraulicBucketCylinderBore ||
                productInfo.hydraulicBucketCylinderStroke ||
                productInfo.hydraulicEquipmentMaxPressure ||
                productInfo.hydraulicMaxSystemFlow ||
                productInfo.hydraulicRotationMaxPressure ||
                productInfo.hydraulicSteerMaxPressure
              "
            />
            <div
              v-if="
                productInfo.hydraulicArmCylinderBore ||
                productInfo.hydraulicArmCylinderStroke ||
                productInfo.hydraulicBoomCylinderBore ||
                productInfo.hydraulicBoomCylinderStroke ||
                productInfo.hydraulicBucketCylinderBore ||
                productInfo.hydraulicBucketCylinderStroke ||
                productInfo.hydraulicEquipmentMaxPressure ||
                productInfo.hydraulicMaxSystemFlow ||
                productInfo.hydraulicRotationMaxPressure ||
                productInfo.hydraulicSteerMaxPressure
              "
            >
              <div class="engine">
                <div class="title">液压系统</div>
                <div class="engine-params">
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicArmCylinderBore"
                  >
                    <div class="params parameter">斗杆油缸-缸径</div>
                    <div class="params">
                      {{ productInfo.hydraulicArmCylinderBore + "mm" }}
                    </div>
                  </div>

                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicArmCylinderStroke"
                  >
                    <div class="params parameter">斗杆油缸-冲程</div>
                    <div class="params">
                      {{ productInfo.hydraulicArmCylinderStroke + "mm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicBoomCylinderBore"
                  >
                    <div class="params parameter">动臂油缸-缸径</div>
                    <div class="params">
                      {{ productInfo.hydraulicBoomCylinderBore + "mm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicBoomCylinderStroke"
                  >
                    <div class="params parameter">动臂油缸-冲程</div>
                    <div class="params">
                      {{ productInfo.hydraulicBoomCylinderStroke + "mm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicBucketCylinderBore"
                  >
                    <div class="params parameter">铲斗油缸-缸径</div>
                    <div class="params">
                      {{ productInfo.hydraulicBucketCylinderBore + "mm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicBucketCylinderStroke"
                  >
                    <div class="params parameter">铲斗油缸-冲程</div>
                    <div class="params">
                      {{ productInfo.hydraulicBucketCylinderStroke + "mm" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicEquipmentMaxPressure"
                  >
                    <div class="params parameter">最大压力-设备-执行</div>
                    <div class="params">
                      {{ productInfo.hydraulicEquipmentMaxPressure + "kPa" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicMaxSystemFlow"
                  >
                    <div class="params parameter">最大流量-执行</div>
                    <div class="params">
                      {{ productInfo.hydraulicMaxSystemFlow }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicRotationMaxPressure"
                  >
                    <div class="params parameter">最大压力-回转</div>
                    <div class="params">
                      {{ productInfo.hydraulicRotationMaxPressure + "kPa" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.hydraulicSteerMaxPressure"
                  >
                    <div class="params parameter">最大压力-行驶</div>
                    <div class="params">
                      {{ productInfo.hydraulicSteerMaxPressure + "kPa" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="
                productInfo.trackWidth ||
                productInfo.trackNum ||
                productInfo.trackThrustWheelNum ||
                productInfo.trackCarrierSprocketNum
              "
            />
            <div
              v-if="
                productInfo.trackWidth ||
                productInfo.trackNum ||
                productInfo.trackThrustWheelNum ||
                productInfo.trackCarrierSprocketNum
              "
            >
              <div class="engine">
                <div class="title">履带</div>
                <div class="engine-params">
                  <div class="params-every" v-if="productInfo.trackWidth">
                    <div class="params parameter">履带板宽度</div>
                    <div class="params">
                      {{ productInfo.trackWidth + "mm" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.trackNum">
                    <div class="params parameter">履带板数量(每侧)</div>
                    <div class="params">
                      {{ productInfo.trackNum }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.trackThrustWheelNum"
                  >
                    <div class="params parameter">履带支重轮数量(每侧)</div>
                    <div class="params">
                      {{ productInfo.trackThrustWheelNum }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.trackCarrierSprocketNum"
                  >
                    <div class="params parameter">托链轮数量(每侧)</div>
                    <div class="params">
                      {{ productInfo.trackCarrierSprocketNum }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="
                productInfo.driveGradient ||
                productInfo.driveMaxSpeed ||
                productInfo.driveMaxTraction
              "
            />
            <div
              v-if="
                productInfo.driveGradient ||
                productInfo.driveMaxSpeed ||
                productInfo.driveMaxTraction
              "
            >
              <div class="engine">
                <div class="title">驱动</div>
                <div class="engine-params">
                  <div class="params-every" v-if="productInfo.driveGradient">
                    <div class="params parameter">爬坡度</div>
                    <div class="params">
                      {{ productInfo.driveGradient }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.driveMaxSpeed">
                    <div class="params parameter">最高行驶速度</div>
                    <div class="params">
                      {{ productInfo.driveMaxSpeed + "km/h" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.driveMaxTraction">
                    <div class="params parameter">最大牵引力</div>
                    <div class="params">
                      {{ productInfo.driveMaxTraction + "kN" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="
                productInfo.capacityFuelTank ||
                productInfo.capacityCooling ||
                productInfo.capacityEngineOil ||
                productInfo.capacityRotationDrive ||
                productInfo.capacityFinalDrive ||
                productInfo.capacityHydraulicSystem ||
                productInfo.capacityHydraulicTank ||
                productInfo.bucketCapacity ||
                productInfo.maxReachRange
              "
            />
            <div
              v-if="
                productInfo.capacityFuelTank ||
                productInfo.capacityCooling ||
                productInfo.capacityEngineOil ||
                productInfo.capacityRotationDrive ||
                productInfo.capacityFinalDrive ||
                productInfo.capacityHydraulicSystem ||
                productInfo.capacityHydraulicTank ||
                productInfo.bucketCapacity ||
                productInfo.maxReachRange
              "
            >
              <div class="engine">
                <div class="title">维修加注容量</div>
                <div class="engine-params">
                  <div class="params-every" v-if="productInfo.bucketCapacity">
                    <div class="params parameter">铲斗容量</div>
                    <div class="params">
                      {{ productInfo.bucketCapacity + "m³" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.maxReachRange">
                    <div class="params parameter">挖掘深度</div>
                    <div class="params">
                      {{ productInfo.maxReachRange + "mm" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.capacityFuelTank">
                    <div class="params parameter">燃油箱容量</div>
                    <div class="params">
                      {{ productInfo.capacityFuelTank + "L" }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.capacityCooling">
                    <div class="params parameter">冷却系统</div>
                    <div class="params">
                      {{ productInfo.capacityCooling + "L" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.capacityEngineOil"
                  >
                    <div class="params parameter">发动机机油(含滤清器)</div>
                    <div class="params">
                      {{ productInfo.capacityEngineOil + "L" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.capacityRotationDrive"
                  >
                    <div class="params parameter">回转驱动(每个)</div>
                    <div class="params">
                      {{ productInfo.capacityRotationDrive + "L" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.capacityFinalDrive"
                  >
                    <div class="params parameter">终传动(每个)</div>
                    <div class="params">
                      {{ productInfo.capacityFinalDrive + "L" }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.capacityHydraulicSystem"
                  >
                    <div class="params parameter">液压系统油容量(含油箱)</div>
                    <div class="params">
                      {{ productInfo.capacityHydraulicSystem }}
                    </div>
                  </div>
                  <div
                    class="params-every"
                    v-if="productInfo.capacityHydraulicTank"
                  >
                    <div class="params parameter">液压油箱(含吸入管)</div>
                    <div class="params">
                      {{ productInfo.capacityHydraulicTank }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="productInfo.extendBoom || productInfo.largeVolumeBoom"
            />
            <div v-if="productInfo.extendBoom || productInfo.largeVolumeBoom">
              <div class="engine">
                <div class="title">动臂</div>
                <div class="engine-params">
                  <div class="params-every" v-if="productInfo.extendBoom">
                    <div class="params parameter">伸展动臂</div>
                    <div class="params">
                      {{ productInfo.extendBoom }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.largeVolumeBoom">
                    <div class="params parameter">大斗量动臂</div>
                    <div class="params">
                      {{ productInfo.largeVolumeBoom }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <van-divider
              v-if="productInfo.extendStick || productInfo.largeVolumeStick"
            />
            <div v-if="productInfo.extendStick || productInfo.largeVolumeStick">
              <div class="engine">
                <div class="title">斗杆</div>
                <div class="engine-params">
                  <div class="params-every" v-if="productInfo.extendStick">
                    <div class="params parameter">伸展斗杆</div>
                    <div class="params">
                      {{ productInfo.extendStick }}
                    </div>
                  </div>
                  <div class="params-every" v-if="productInfo.largeVolumeStick">
                    <div class="params parameter">大容量型斗杆</div>
                    <div class="params">
                      {{ productInfo.largeVolumeStick }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

    <div
      v-if="productInfo && productInfo.recycleList.length > 0"
      class="second-container grab-tabs-pc-container"
    >
      <div class="home-title-six">
        <div>相关二手机推荐</div>
      </div>
      <div class="product-list-content">
        <div
          v-for="(item, index) in productInfo.recycleList"
          :key="index"
          class="item"
          @click="checkDetail(item)"
        >
          <div class="item-img">
            <img class="img" :src="base_request_url + '/file/' + item.imgUrl" />
          </div>
          <div class="title">{{ item.model }}</div>
          <div class="btn">了解详情</div>
        </div>
      </div>
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
          发动机型号：{{ productInfo.engineModel }}
        </div>
        <div class="global-params-every">
          净功率：{{ productInfo.engineNetPower + " KW" }}
        </div>
        <div class="global-params-every">
          工作重量：{{ productInfo.weightWork + " kg" }}
        </div>
        <div class="global-params-every">
          铲斗容量：{{ productInfo.bucketCapacity + " m³" }}
        </div>
        <div class="global-params-every" v-if="productInfo.maxReachRange">
          挖掘深度：{{ productInfo.maxReachRange + " mm" }}
        </div>
      </div>
      <div class="product-detail-btn-down">
        <div class="btn-down-every" @click="askPrice">
          <img src="../../assets/imgs/pc/detail/down.png" />
          下载产品手册
        </div>
        <div
          @click="go720Address(productInfo && productInfo.overallViewUrl)"
          target="_blank"
          class="btn-down-every two"
        >
          <img src="../../assets/imgs/pc/detail/look.png" />720度看机
        </div>
        <router-link
          :to="{
            path: '/product/comparison',
            query: { productId: productInfo.id },
          }"
          class="btn-down-every three"
          ><img
            src="../../assets/imgs/pc/detail/compair.png"
          />产品对比</router-link
        >
      </div>
      <div class="product-detail-btn-buy">
        <!-- 跳转微盟 -->
        <a
          v-if="productInfo.h5Url"
          :href="productInfo.h5Url"
          target="_blank"
          class="btn-buy"
          >立刻购买</a
        >
        <div v-else class="btn-buy-gray">立刻购买</div>
        <!-- 跳转腾讯企点客服窗口 -->
        <div class="btn-price" @click="askPrice">立即询价</div>
        <div class="btn-lease" @click="leaseClick()">一键租赁</div>
      </div>

      <van-dialog
        v-if="leaseShow"
        v-model:show="leaseShow"
        :show-confirm-button="false"
        title="一键租赁"
      >
        <div style="margin-top: 10px">
          <van-form
            ref="vanLeaseForm"
            :validate-trigger="'onSubmit'"
            @submit="leaseSure"
          >
            <van-cell-group inset>
              <van-field
                v-model="leaseFormData.phoneNumber"
                type="tel"
                label="手机号"
                placeholder="请输入手机号"
                :rules="[
                  {
                    required: true,
                    message: '请填写手机号',
                    trigger: ['onBlur', 'onSubmit'],
                  },
                ]"
              />
              <van-field
                v-model="leaseFormData.fullName"
                label="姓名"
                placeholder="请输入姓名"
                :rules="[
                  {
                    required: true,
                    message: '请填写姓名',
                    trigger: ['onBlur', 'onSubmit'],
                  },
                ]"
              />
              <van-field
                v-model="leaseFormData.address"
                label="地址"
                placeholder="请输入地址"
                :rules="[
                  {
                    required: true,
                    message: '请填写地址',
                    trigger: ['onBlur', 'onSubmit'],
                  },
                ]"
                @click="showAddrPicker = true"
              />
              <van-field
                v-model="leaseFormData.startDate"
                is-link
                readonly
                label="开始日期"
                placeholder="点击选择日期"
                @click="showStartDatePicker = true"
              />
              <van-field
                v-model="leaseFormData.endDate"
                is-link
                readonly
                label="结束日期"
                placeholder="点击选择日期"
                @click="showEndDatePicker = true"
              />
              <van-field
                v-model="leaseFormData.note"
                rows="1"
                autosize
                label="备注"
                type="textarea"
                placeholder="请输入备注"
              />
            </van-cell-group>
            <div style="margin: 16px; display: flex">
              <van-button
                round
                block
                style="margin-right: 10px"
                @click="leaseShow = false"
              >
                取消
              </van-button>
              <van-button round block type="primary" native-type="submit">
                提交
              </van-button>
            </div>
          </van-form>
        </div>
      </van-dialog>
      <!-- 地址 -->
      <van-popup v-model:show="showAddrPicker" round position="bottom">
        <van-area
          v-model="leaseFormData.address"
          :area-list="areaList"
          @cancel="showAddrPicker = false"
          @confirm="sellAddrConfirm"
        />
      </van-popup>
      <!-- 开始日期 -->
      <van-popup v-model:show="showStartDatePicker" position="bottom">
        <van-datetime-picker
          v-model="startDateSel"
          type="date"
          title="选择租赁日期"
          @cancel="showStartDatePicker = false"
          @confirm="onStartTimeConfirm"
        />
      </van-popup>
      <!-- 结束日期 -->
      <van-popup v-model:show="showEndDatePicker" position="bottom">
        <van-datetime-picker
          v-model="endDateSel"
          type="date"
          title="选择租赁日期"
          @cancel="showEndDatePicker = false"
          @confirm="onEndTimeConfirm"
        />
      </van-popup>

      <div class="product-detail-main">
        <!-- line-height="0" -->
        <van-tabs
          class="activity-tabs-container"
          border
          v-model:active="activeName"
          color="#F5C71B "
          background="#F5F5F5"
        >
          <van-tab title="概览" name="first">
            <div v-html="productInfo.content" class="content"></div>
          </van-tab>
          <van-tab title="产品规格" name="second">
            <div class="detail-main">
              <van-divider />
              <div>
                <div class="engine">
                  <div class="title">发动机</div>
                  <div class="engine-params">
                    <div class="params-every">
                      <div class="params parameter">发动机型号</div>
                      <div class="params">
                        {{ productInfo.engineModel }}
                      </div>
                    </div>
                    <div class="params-every">
                      <div class="params parameter">净功率</div>
                      <div class="params">
                        {{ productInfo.engineNetPower + "KW" }}
                      </div>
                    </div>
                    <div class="params-every">
                      <div class="params parameter">总功率</div>
                      <div class="params">
                        {{ productInfo.enginePower + "KW" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.engineCylinderBore"
                    >
                      <div class="params parameter">缸径</div>
                      <div class="params">
                        {{ productInfo.engineCylinderBore + "mm" }}
                      </div>
                    </div>
                    <div class="params-every" v-if="productInfo.engineStroke">
                      <div class="params parameter">冲程</div>
                      <div class="params">
                        {{ productInfo.engineStroke + "mm" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.engineDisplacement"
                    >
                      <div class="params parameter">排量</div>
                      <div class="params">
                        {{ productInfo.engineDisplacement + "L" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.engineDieselUsed"
                    >
                      <div class="params parameter">可使用生物柴油</div>
                      <div class="params">
                        {{ productInfo.engineDieselUsed }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <van-divider
                v-if="
                  productInfo.rotaryMachinerySpeed ||
                  productInfo.rotaryMachineryMaxTorque
                "
              />
              <div
                v-if="
                  productInfo.rotaryMachinerySpeed ||
                  productInfo.rotaryMachineryMaxTorque
                "
              >
                <div class="engine">
                  <div class="title">回转机械装置</div>
                  <div class="engine-params">
                    <div
                      class="params-every"
                      v-if="productInfo.rotaryMachinerySpeed"
                    >
                      <div class="params parameter">回转速度</div>
                      <div class="params">
                        {{ productInfo.rotaryMachinerySpeed + "rpm" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.rotaryMachineryMaxTorque"
                    >
                      <div class="params parameter">最大回转扭矩</div>
                      <div class="params">
                        {{ productInfo.rotaryMachineryMaxTorque + "KN.m" }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <van-divider />
              <div>
                <div class="engine">
                  <div class="title">重量</div>
                  <div class="engine-params">
                    <div class="params-every">
                      <div class="params parameter">含顶蓬的工作重量</div>
                      <div class="params">
                        {{ productInfo.weightWork + "kg" }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <van-divider
                v-if="
                  productInfo.hydraulicArmCylinderBore ||
                  productInfo.hydraulicArmCylinderStroke ||
                  productInfo.hydraulicBoomCylinderBore ||
                  productInfo.hydraulicBoomCylinderStroke ||
                  productInfo.hydraulicBucketCylinderBore ||
                  productInfo.hydraulicBucketCylinderStroke ||
                  productInfo.hydraulicEquipmentMaxPressure ||
                  productInfo.hydraulicMaxSystemFlow ||
                  productInfo.hydraulicRotationMaxPressure ||
                  productInfo.hydraulicSteerMaxPressure
                "
              />
              <div
                v-if="
                  productInfo.hydraulicArmCylinderBore ||
                  productInfo.hydraulicArmCylinderStroke ||
                  productInfo.hydraulicBoomCylinderBore ||
                  productInfo.hydraulicBoomCylinderStroke ||
                  productInfo.hydraulicBucketCylinderBore ||
                  productInfo.hydraulicBucketCylinderStroke ||
                  productInfo.hydraulicEquipmentMaxPressure ||
                  productInfo.hydraulicMaxSystemFlow ||
                  productInfo.hydraulicRotationMaxPressure ||
                  productInfo.hydraulicSteerMaxPressure
                "
              >
                <div class="engine">
                  <div class="title">液压系统</div>
                  <div class="engine-params">
                    <div
                      class="params-every"
                      v-if="productInfo.hydraulicArmCylinderBore"
                    >
                      <div class="params parameter">斗杆油缸-缸径</div>
                      <div class="params">
                        {{ productInfo.hydraulicArmCylinderBore + "mm" }}
                      </div>
                    </div>

                    <div
                      class="params-every"
                      v-if="productInfo.hydraulicArmCylinderStroke"
                    >
                      <div class="params parameter">斗杆油缸-冲程</div>
                      <div class="params">
                        {{ productInfo.hydraulicArmCylinderStroke + "mm" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.hydraulicBoomCylinderBore"
                    >
                      <div class="params parameter">动臂油缸-缸径</div>
                      <div class="params">
                        {{ productInfo.hydraulicBoomCylinderBore + "mm" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.hydraulicBoomCylinderStroke"
                    >
                      <div class="params parameter">动臂油缸-冲程</div>
                      <div class="params">
                        {{ productInfo.hydraulicBoomCylinderStroke + "mm" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.hydraulicBucketCylinderBore"
                    >
                      <div class="params parameter">铲斗油缸-缸径</div>
                      <div class="params">
                        {{ productInfo.hydraulicBucketCylinderBore + "mm" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.hydraulicBucketCylinderStroke"
                    >
                      <div class="params parameter">铲斗油缸-冲程</div>
                      <div class="params">
                        {{ productInfo.hydraulicBucketCylinderStroke + "mm" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.hydraulicEquipmentMaxPressure"
                    >
                      <div class="params parameter">最大压力-设备-执行</div>
                      <div class="params">
                        {{ productInfo.hydraulicEquipmentMaxPressure + "kPa" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.hydraulicMaxSystemFlow"
                    >
                      <div class="params parameter">最大流量-执行</div>
                      <div class="params">
                        {{ productInfo.hydraulicMaxSystemFlow }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.hydraulicRotationMaxPressure"
                    >
                      <div class="params parameter">最大压力-回转</div>
                      <div class="params">
                        {{ productInfo.hydraulicRotationMaxPressure + "kPa" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.hydraulicSteerMaxPressure"
                    >
                      <div class="params parameter">最大压力-行驶</div>
                      <div class="params">
                        {{ productInfo.hydraulicSteerMaxPressure + "kPa" }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <van-divider
                v-if="
                  productInfo.trackWidth ||
                  productInfo.trackNum ||
                  productInfo.trackThrustWheelNum ||
                  productInfo.trackCarrierSprocketNum
                "
              />
              <div
                v-if="
                  productInfo.trackWidth ||
                  productInfo.trackNum ||
                  productInfo.trackThrustWheelNum ||
                  productInfo.trackCarrierSprocketNum
                "
              >
                <div class="engine">
                  <div class="title">履带</div>
                  <div class="engine-params">
                    <div class="params-every" v-if="productInfo.trackWidth">
                      <div class="params parameter">履带板宽度</div>
                      <div class="params">
                        {{ productInfo.trackWidth + "mm" }}
                      </div>
                    </div>
                    <div class="params-every" v-if="productInfo.trackNum">
                      <div class="params parameter">履带板数量(每侧)</div>
                      <div class="params">
                        {{ productInfo.trackNum }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.trackThrustWheelNum"
                    >
                      <div class="params parameter">履带支重轮数量(每侧)</div>
                      <div class="params">
                        {{ productInfo.trackThrustWheelNum }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.trackCarrierSprocketNum"
                    >
                      <div class="params parameter">托链轮数量(每侧)</div>
                      <div class="params">
                        {{ productInfo.trackCarrierSprocketNum }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <van-divider
                v-if="
                  productInfo.driveGradient ||
                  productInfo.driveMaxSpeed ||
                  productInfo.driveMaxTraction
                "
              />
              <div
                v-if="
                  productInfo.driveGradient ||
                  productInfo.driveMaxSpeed ||
                  productInfo.driveMaxTraction
                "
              >
                <div class="engine">
                  <div class="title">驱动</div>
                  <div class="engine-params">
                    <div class="params-every" v-if="productInfo.driveGradient">
                      <div class="params parameter">爬坡度</div>
                      <div class="params">
                        {{ productInfo.driveGradient }}
                      </div>
                    </div>
                    <div class="params-every" v-if="productInfo.driveMaxSpeed">
                      <div class="params parameter">最高行驶速度</div>
                      <div class="params">
                        {{ productInfo.driveMaxSpeed + "km/h" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.driveMaxTraction"
                    >
                      <div class="params parameter">最大牵引力</div>
                      <div class="params">
                        {{ productInfo.driveMaxTraction + "kN" }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <van-divider
                v-if="
                  productInfo.capacityFuelTank ||
                  productInfo.capacityCooling ||
                  productInfo.capacityEngineOil ||
                  productInfo.capacityRotationDrive ||
                  productInfo.capacityFinalDrive ||
                  productInfo.capacityHydraulicSystem ||
                  productInfo.capacityHydraulicTank ||
                  productInfo.bucketCapacity ||
                  productInfo.maxReachRange
                "
              />
              <div
                v-if="
                  productInfo.capacityFuelTank ||
                  productInfo.capacityCooling ||
                  productInfo.capacityEngineOil ||
                  productInfo.capacityRotationDrive ||
                  productInfo.capacityFinalDrive ||
                  productInfo.capacityHydraulicSystem ||
                  productInfo.capacityHydraulicTank ||
                  productInfo.bucketCapacity ||
                  productInfo.maxReachRange
                "
              >
                <div class="engine">
                  <div class="title">维修加注容量</div>
                  <div class="engine-params">
                    <div class="params-every" v-if="productInfo.bucketCapacity">
                      <div class="params parameter">铲斗容量</div>
                      <div class="params">
                        {{ productInfo.bucketCapacity + "m³" }}
                      </div>
                    </div>
                    <div class="params-every" v-if="productInfo.maxReachRange">
                      <div class="params parameter">挖掘深度</div>
                      <div class="params">
                        {{ productInfo.maxReachRange + "mm" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.capacityFuelTank"
                    >
                      <div class="params parameter">燃油箱容量</div>
                      <div class="params">
                        {{ productInfo.capacityFuelTank + "L" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.capacityCooling"
                    >
                      <div class="params parameter">冷却系统</div>
                      <div class="params">
                        {{ productInfo.capacityCooling + "L" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.capacityEngineOil"
                    >
                      <div class="params parameter">发动机机油(含滤清器)</div>
                      <div class="params">
                        {{ productInfo.capacityEngineOil + "L" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.capacityRotationDrive"
                    >
                      <div class="params parameter">回转驱动(每个)</div>
                      <div class="params">
                        {{ productInfo.capacityRotationDrive + "L" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.capacityFinalDrive"
                    >
                      <div class="params parameter">终传动(每个)</div>
                      <div class="params">
                        {{ productInfo.capacityFinalDrive + "L" }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.capacityHydraulicSystem"
                    >
                      <div class="params parameter">液压系统油容量(含油箱)</div>
                      <div class="params">
                        {{ productInfo.capacityHydraulicSystem }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.capacityHydraulicTank"
                    >
                      <div class="params parameter">液压油箱(含吸入管)</div>
                      <div class="params">
                        {{ productInfo.capacityHydraulicTank }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <van-divider
                v-if="productInfo.extendBoom || productInfo.largeVolumeBoom"
              />
              <div v-if="productInfo.extendBoom || productInfo.largeVolumeBoom">
                <div class="engine">
                  <div class="title">动臂</div>
                  <div class="engine-params">
                    <div class="params-every" v-if="productInfo.extendBoom">
                      <div class="params parameter">伸展动臂</div>
                      <div class="params">
                        {{ productInfo.extendBoom }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.largeVolumeBoom"
                    >
                      <div class="params parameter">大斗量动臂</div>
                      <div class="params">
                        {{ productInfo.largeVolumeBoom }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <van-divider
                v-if="productInfo.extendStick || productInfo.largeVolumeStick"
              />
              <div
                v-if="productInfo.extendStick || productInfo.largeVolumeStick"
              >
                <div class="engine">
                  <div class="title">斗杆</div>
                  <div class="engine-params">
                    <div class="params-every" v-if="productInfo.extendStick">
                      <div class="params parameter">伸展斗杆</div>
                      <div class="params">
                        {{ productInfo.extendStick }}
                      </div>
                    </div>
                    <div
                      class="params-every"
                      v-if="productInfo.largeVolumeStick"
                    >
                      <div class="params parameter">大容量型斗杆</div>
                      <div class="params">
                        {{ productInfo.largeVolumeStick }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

      <div v-if="productInfo.recycleList.length > 0" class="second-container">
        <div class="home-title-six">
          <div>相关二手机推荐</div>
        </div>
        <div class="product-list-content">
          <div
            v-for="(item, index) in productInfo.recycleList"
            :key="index"
            class="item"
            @click="checkDetail(item)"
          >
            <div class="img">
              <img
                class="img"
                :src="base_request_url + '/file/' + item.imgUrl"
              />
            </div>
            <div class="title">{{ item.model }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { Dialog, Toast } from "vant";
import "vant/es/dialog/style";
import "vant/es/toast/style";

import NativeShare from "nativeshare";

import { useRoute, useRouter } from "vue-router";

import { base_request_url } from "@/request/http";
import { productInfoPort, leaseAddPort } from "@/request/api/product";
import { IProductDetail } from "@/types/global";
import _sessionStorage from "@/utils/sessionStorage";
import { getDateNow } from "@/utils/utils";
import { areaList } from "@vant/area-data";
import cityList from "@/utils/pca-code.json";

console.log("城市", areaList);

const route = useRoute();
const router = useRouter();

const VanDialog = Dialog.Component;

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
  router.push({
    path: "/product/workTools",
    query: { id: item.id },
  });
  if (typeVal.value == 1) {
    sessionStorage.setItem(
      "BreadcrumbItem",
      JSON.stringify([
        {
          path: "/product/grab",
          name: "机械设备",
        },
        {
          path: "/product/detail",
          query: {
            productId: route.query.productId,
            type: 1,
          },
          name: productInfo.value?.model,
        },
      ])
    );
  } else if (typeVal.value == 2) {
    sessionStorage.setItem(
      "BreadcrumbItem",
      JSON.stringify([
        {
          path: "/alliance",
          query: {
            name: pageNameVal.value,
          },
          name: pageNameVal.value,
        },
        {
          path: "/product/detail",
          query: {
            name: pageNameVal.value,
            productId: route.query.productId,
            type: 2,
          },
          name: productInfo.value?.model,
        },
      ])
    );
  }
};

const activeName = ref("first");

// 立即询价
const askPrice = () => {
  document.getElementById("ECIM001")?.click();
};

// 一键租赁
const leaseFormData = reactive({
  phoneNumber: "",
  fullName: "",
  leaseTime: "",
  startDate: "",
  endDate: "",
  address: "",
  addressList: [],
  note: "",
});
const leaseFormRules = reactive({
  phoneNumber: [
    {
      required: true,
      message: "请填写手机号",
      trigger: "blur",
    },
  ],
  fullName: [
    {
      required: true,
      message: "请填写姓名",
      trigger: "blur",
    },
  ],
  addressList: [
    {
      required: true,
      message: "请选择地址",
      trigger: "change",
    },
  ],
});
const leaseShow = ref(false);

const leaseClick = () => {
  leaseFormData.phoneNumber = "";
  leaseFormData.fullName = "";
  leaseFormData.address = "";
  leaseFormData.addressList = [];
  leaseFormData.leaseTime = "";
  leaseFormData.startDate = "";
  leaseFormData.endDate = "";
  leaseFormData.note = "";

  startDateSel.value = new Date();
  endDateSel.value = new Date();
  leaseShow.value = true;
};
// 开始日期
const showStartDatePicker = ref(false);
const startDateSel = ref(new Date());
const onStartTimeConfirm = (val: any) => {
  console.log(val);
  leaseFormData.startDate = getDateNow(val);
  showStartDatePicker.value = false;
};
// 结束日期
const showEndDatePicker = ref(false);
const endDateSel = ref(new Date());
const onEndTimeConfirm = (val: any) => {
  console.log(val);
  leaseFormData.endDate = getDateNow(val);
  showEndDatePicker.value = false;
};

// 提交信息
const leaseForm = ref();
const vanLeaseForm = ref();
const leaseSure = (val: any) => {
  if (cliWidth.value > 768) {
    leaseForm.value.validate((valid: any, fields: any) => {
      if (valid) {
        leaseAddPort({
          phoneNumber: leaseFormData.phoneNumber, // 手机号
          fullName: leaseFormData.fullName, // 姓名
          address: leaseFormData.addressList.join(""), // 设备施工地址
          startDate: leaseFormData.startDate, // 租赁起始日期
          endDate: leaseFormData.endDate, // 租赁结束日期
          model: productInfo.value?.model, // 需要租赁型号
          note: leaseFormData.note, // 备注-其他要求
        }).then((res) => {
          console.log("一键租赁", res);
          if (res.data.code === 200) {
            ElMessage.success("信息提交成功");
          } else {
            ElMessage.error(res.data.data);
          }
        });
        leaseShow.value = false;
      } else {
        console.log("error submit!", fields);
      }
    });
  } else {
    console.log("验证", val);

    leaseAddPort({
      phoneNumber: leaseFormData.phoneNumber, // 手机号
      fullName: leaseFormData.fullName, // 姓名
      address: leaseFormData.address, // 设备施工地址
      startDate: leaseFormData.startDate, // 租赁起始日期
      endDate: leaseFormData.endDate, // 租赁结束日期
      model: productInfo.value?.model, // 需要租赁型号
      note: leaseFormData.note, // 备注-其他要求
    }).then((res) => {
      console.log("一键租赁", res);
      if (res.data.code === 200) {
        Toast.success("信息提交成功");
      } else {
        Toast.fail(res.data.data);
      }
    });
    leaseShow.value = false;
  }
};
// 地址
const showAddrPicker = ref(false);
const sellAddrConfirm = (val: any) => {
  console.log(val);
  leaseFormData.address = val[0].name + val[1].name + val[2].name;
  showAddrPicker.value = false;
};

// 推荐二手设备详情
const checkDetail = (item: any) => {
  console.log(item);

  router.push({
    path: "/secondHand/detail",
    query: { productId: item.id },
  });
};

// 获取产品详情
const imgList = ref<string[]>([]);
const videoList = ref<string[]>([]);
const bigImgUrl = ref("");
const productInfo = ref<IProductDetail | null>(null);
const typeVal: any = ref("1");
const pageNameVal = ref();
if (route.query.type) {
  typeVal.value = route.query.type;
  pageNameVal.value = route.query.name;
}
let id = route.query.productId;
const getProductInfo = (id: any) => {
  productInfoPort({
    id,
  }).then((res) => {
    console.log("产品详情", res);

    productInfo.value = res.data.data;
    if (productInfo.value?.imgUrl) {
      imgList.value = productInfo.value?.imgUrl.split("|");

      if (productInfo.value.videoUrl) {
        videoList.value = productInfo.value?.videoUrl.split("|");
      }

      bigImgUrl.value = imgList.value[0];

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
    if (productInfo.value?.dataUrl) {
      productInfo.value.dataUrl = productInfo.value.dataUrl.replaceAll(
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
  console.log(val, count, num.value);

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

// 720看机地址
const go720Address = (url: any) => {
  if (url) {
    sessionStorage.setItem("lookUrl", url);
    router.push({
      path: "/product/720URL",
    });
  }
};

const test = () => {
  console.log("test");
};
</script>

<style scoped lang="scss">
.home-title-six {
  background: url("../../assets/imgs/pc/common/titleBack7.png") no-repeat;
  background-size: 100% 100%;
}

.tools-list-content {
  .name {
    text-align: center !important;
  }
}

.tools {
  .name {
    text-align: center !important;
  }
}

@media screen and (min-width: 1200px) {
  .home-title-six {
    margin-top: 82px;
    margin-bottom: 23px;

    div {
      padding: 20px 7px 24px 11px;
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1199px) {
  .home-title-six {
    margin-top: 42px;
    margin-bottom: 13px;

    div {
      padding: 12px 4px 15px 8px;
    }
  }
}

@media screen and (min-width: 1001px) {
  .second-nav {
    margin-bottom: 50px;
  }

  .pc-detail-top {
    display: flex;

    .detail-top-img {
      width: 65%;
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
      width: 35%;

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
            line-height: 42px;
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
              object-fit: contain;
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

          .btn-buy,
          .btn-buy-gray,
          .btn-price,
          .btn-lease {
            display: block;
            width: 158px;
            height: 52px;
            margin-bottom: 12px;
            font-weight: 400;
            font-size: 18px;
            line-height: 52px;
            text-align: center;
            cursor: pointer;
          }

          .btn-buy {
            margin-right: 12px;
            background: #f5c71b;
            color: #282828;
          }

          .btn-buy-gray {
            margin-right: 12px;
            background: #f5f5f5;
            color: #282828;
            cursor: default;
          }

          .btn-price {
            margin-right: 12px;
            box-sizing: border-box;
            background: #fff9e6;
            border: 1px solid #f5c71b;
            color: #ebb000;
          }

          .btn-lease {
            margin-right: 12px;
            background: #fff;
            color: #dea600;
            box-sizing: border-box;
            border: 1px solid #dea600;
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

  .second-container {
    .product-list-content {
      margin-top: 0 !important;
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
            line-height: 42px;
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
              object-fit: contain;
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

          .btn-buy,
          .btn-buy-gray,
          .btn-price,
          .btn-lease {
            display: block;
            width: 158px;
            height: 52px;
            margin-bottom: 12px;
            font-weight: 400;
            font-size: 18px;
            line-height: 52px;
            text-align: center;
            cursor: pointer;
          }

          .btn-buy {
            margin-right: 12px;
            background: #f5c71b;
            color: #282828;
          }

          .btn-buy-gray {
            margin-right: 12px;
            background: #f5f5f5;
            color: #282828;
            cursor: default;
          }

          .btn-price {
            margin-right: 12px;
            box-sizing: border-box;
            background: #fff9e6;
            border: 1px solid #f5c71b;
            color: #ebb000;
          }

          .btn-lease {
            margin-right: 12px;
            background: #fff;
            color: #dea600;
            box-sizing: border-box;
            border: 1px solid #dea600;
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

  .second-container {
    padding: 0 15px;
    .product-list-content {
      margin-top: 0 !important;
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

    .product-detail-btn-down {
      padding-left: 15px;
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;

      .btn-down-every {
        width: 116px;
        height: 36px;
        margin-right: 8px;
        margin-bottom: 13px;
        line-height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
        border: 1px solid #e6e6e6;
        box-sizing: border-box;
        font-weight: 400;
        font-size: 12px;
        color: #1a1a1a;

        img {
          width: 16px;
          height: 16px;
          margin-right: 4px;
          object-fit: contain;
        }
      }

      .two {
        width: 102px;
      }

      .three {
        width: 92px;
      }
    }

    .product-detail-btn-buy {
      margin-top: 32px;
      padding-left: 15px;
      display: flex;

      .btn-buy,
      .btn-buy-gray,
      .btn-price,
      .btn-lease {
        display: block;
        width: 110px;
        height: 44px;
        font-weight: 700;
        font-size: 14px;
        line-height: 44px;
        text-align: center;
      }

      .btn-buy {
        margin-right: 8px;
        background: #f5c71b;
        color: #282828;
      }

      .btn-buy-gray {
        margin-right: 8px;
        background: #f5f5f5;
        color: #282828;
      }

      .btn-price {
        margin-right: 8px;
        box-sizing: border-box;
        background: #fff9e6;
        border: 1px solid #f5c71b;
        color: #ebb000;
      }

      .btn-lease {
        margin-right: 8px;
        background: #fff;
        color: #dea600;
        box-sizing: border-box;
        border: 1px solid #dea600;
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
    }

    .second-container {
      padding: 15px;

      .home-title-six {
        margin-top: 4px;
        margin-bottom: 5px;

        div {
          padding: 13px 3px 13px 7px;
        }
      }
    }
  }

  .product-list-content {
    margin-bottom: 0 !important;
  }
}
</style>
