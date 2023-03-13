<template>
  <div class="comparision-container eci-main-content">
    <div class="home-title-six">
      <div>产品参数对比</div>
    </div>
    <div class="comparision-product">
      <div class="every left">
        <div v-if="productInfo">
          <div class="every-content">
            <img v-if="productInfo.imgUrl" :src="
              base_request_url + '/file/' + productInfo.imgUrl.split('|')[0]
            " />
          </div>
          <div class="content-title">
            {{ productInfo.model }}
          </div>
        </div>
        <div class="every-content" v-else>
          <van-icon name="add" color="#595959" size="24px" />
          <div class="font">添加对比型号</div>
        </div>
      </div>
      <div class="every" @click="showPicker = true">
        <div v-if="productComparisonInfo">
          <div class="every-content">
            <img v-if="productComparisonInfo.imgUrl" :src="
              base_request_url +
              '/file/' +
              productComparisonInfo.imgUrl.split('|')[0]
            " />
          </div>
          <div class="content-title">
            {{ productComparisonInfo.model }}
          </div>
        </div>
        <div class="every-content" v-else>
          <van-icon name="add" color="#595959" size="24px" />
          <div class="font">添加对比型号</div>
        </div>
      </div>
    </div>
    <div class="comparision-btn">
      <div class="btn-left" @click="openClick">
        {{ openOrClose == 0 ? "全部展开" : "全部收起" }}
      </div>
      <div class="btn-left btn-right" @click="showClick">
        {{ showAll == 0 ? "隐藏相同" : "展示全部" }}
      </div>
    </div>
    <div class="comparison-params" v-if="productInfo">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="发动机" name="1">
          <div class="engine-params">
            <div class="params-every" v-if="isShowParams('engineModel')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                发动机型号
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{ productInfo.engineModel }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo
                  ? productComparisonInfo.engineModel
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('engineNetPower')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                净功率
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{ productInfo.engineNetPower + "KW" }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo
                  ? productComparisonInfo.engineNetPower + "KW"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('enginePower')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                总功率
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{ productInfo.enginePower + "KW" }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo
                  ? productComparisonInfo.enginePower + "KW"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('engineCylinderBore')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                缸径
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.engineCylinderBore
                  ? productInfo.engineCylinderBore + "mm"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.engineCylinderBore
                  ? productComparisonInfo.engineCylinderBore + "mm"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('engineStroke')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                冲程
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.engineStroke
                  ? productInfo.engineStroke + "mm"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo && productComparisonInfo.engineStroke
                  ? productComparisonInfo.engineStroke + "mm"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('engineDisplacement')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                排量
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.engineDisplacement
                  ? productInfo.engineDisplacement + "L"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.engineDisplacement
                  ? productComparisonInfo.engineDisplacement + "L"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('engineDieselUsed')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                可使用生物柴油
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.engineDieselUsed
                  ? productInfo.engineDieselUsed
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.engineDieselUsed
                  ? productComparisonInfo.engineDieselUsed
                  : "--"
                }}
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="回转机械装置" name="2" v-if="
          productInfo.rotaryMachinerySpeed ||
          productInfo.rotaryMachineryMaxTorque
        ">
          <div class="engine-params">
            <div class="params-every" v-if="isShowParams('rotaryMachinerySpeed')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                回转速度
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.rotaryMachinerySpeed
                  ? productInfo.rotaryMachinerySpeed + "rpm"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.rotaryMachinerySpeed
                  ? productComparisonInfo.rotaryMachinerySpeed + "rpm"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('rotaryMachineryMaxTorque')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                最大回转扭矩
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.rotaryMachineryMaxTorque
                  ? productInfo.rotaryMachineryMaxTorque + "KN.m"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.rotaryMachineryMaxTorque
                  ? productComparisonInfo.rotaryMachineryMaxTorque + "KN.m"
                  : "--"
                }}
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="重量" name="3" v-if="isShowParams('weightWork')">
          <div class="engine-params">
            <div class="params-every" v-if="productComparisonInfo">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                含顶蓬的工作重量
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{ productInfo.weightWork + "kg" }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo && productComparisonInfo.weightWork
                  ? productComparisonInfo.weightWork + "kg"
                  : "--"
                }}
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="液压系统" name="4" v-if="
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
        ">
          <div class="engine-params">
            <div class="params-every" v-if="isShowParams('hydraulicArmCylinderBore')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                斗杆油缸-缸径
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.hydraulicArmCylinderBore
                  ? productInfo.hydraulicArmCylinderBore + "mm"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.hydraulicArmCylinderBore
                  ? productComparisonInfo.hydraulicArmCylinderBore + "mm"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('hydraulicArmCylinderStroke')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                斗杆油缸-冲程
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.hydraulicArmCylinderStroke
                  ? productInfo.hydraulicArmCylinderStroke + "mm"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.hydraulicArmCylinderStroke
                  ? productComparisonInfo.hydraulicArmCylinderStroke + "mm"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('hydraulicBoomCylinderBore')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                动臂油缸-缸径
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.hydraulicBoomCylinderBore
                  ? productInfo.hydraulicBoomCylinderBore + "mm"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.hydraulicBoomCylinderBore
                  ? productComparisonInfo.hydraulicBoomCylinderBore + "mm"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('hydraulicBoomCylinderStroke')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                动臂油缸-冲程
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.hydraulicBoomCylinderStroke
                  ? productInfo.hydraulicBoomCylinderStroke + "mm"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.hydraulicBoomCylinderStroke
                  ? productComparisonInfo.hydraulicBoomCylinderStroke + "mm"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('hydraulicBucketCylinderBore')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                铲斗油缸-缸径
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.hydraulicBucketCylinderBore
                  ? productInfo.hydraulicBucketCylinderBore + "mm"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.hydraulicBucketCylinderBore
                  ? productComparisonInfo.hydraulicBucketCylinderBore + "mm"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('hydraulicBucketCylinderStroke')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                铲斗油缸-冲程
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.hydraulicBucketCylinderStroke
                  ? productInfo.hydraulicBucketCylinderStroke + "mm"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.hydraulicBucketCylinderStroke
                  ? productComparisonInfo.hydraulicBucketCylinderStroke + "mm"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('hydraulicEquipmentMaxPressure')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                最大压力-设备-执行
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.hydraulicEquipmentMaxPressure
                  ? productInfo.hydraulicEquipmentMaxPressure + "kPa"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.hydraulicEquipmentMaxPressure
                  ? productComparisonInfo.hydraulicEquipmentMaxPressure +
                  "kPa"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('hydraulicMaxSystemFlow')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                最大流量-执行
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.hydraulicMaxSystemFlow
                  ? productInfo.hydraulicMaxSystemFlow
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.hydraulicMaxSystemFlow
                  ? productComparisonInfo.hydraulicMaxSystemFlow
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('hydraulicRotationMaxPressure')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                最大压力-回转
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.hydraulicRotationMaxPressure
                  ? productInfo.hydraulicRotationMaxPressure + "kPa"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.hydraulicRotationMaxPressure
                  ? productComparisonInfo.hydraulicRotationMaxPressure + "kPa"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('hydraulicSteerMaxPressure')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                最大压力-行驶
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.hydraulicSteerMaxPressure
                  ? productInfo.hydraulicSteerMaxPressure + "kPa"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.hydraulicSteerMaxPressure
                  ? productComparisonInfo.hydraulicSteerMaxPressure + "kPa"
                  : "--"
                }}
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="履带" name="5" v-if="
          productInfo.trackWidth ||
          productInfo.trackNum ||
          productInfo.trackThrustWheelNum ||
          productInfo.trackCarrierSprocketNum
        ">
          <div class="engine-params">
            <div class="params-every" v-if="isShowParams('trackWidth')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                履带板宽度
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.trackWidth ? productInfo.trackWidth + "mm" : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo && productComparisonInfo.trackWidth
                  ? productComparisonInfo.trackWidth + "mm"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('trackNum')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                履带板数量(每侧)
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{ productInfo.trackNum ? productInfo.trackNum : "--" }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo && productComparisonInfo.trackNum
                  ? productComparisonInfo.trackNum
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('trackThrustWheelNum')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                履带支重轮数量(每侧)
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.trackThrustWheelNum
                  ? productInfo.trackThrustWheelNum
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.trackThrustWheelNum
                  ? productComparisonInfo.trackThrustWheelNum
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('trackCarrierSprocketNum')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                托链轮数量(每侧)
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.trackCarrierSprocketNum
                  ? productInfo.trackCarrierSprocketNum
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.trackCarrierSprocketNum
                  ? productComparisonInfo.trackCarrierSprocketNum
                  : "--"
                }}
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="驱动" name="6" v-if="
          productInfo.driveGradient ||
          productInfo.driveMaxSpeed ||
          productInfo.driveMaxTraction
        ">
          <div class="engine-params">
            <div class="params-every" v-if="isShowParams('driveGradient')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                爬坡度
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.driveGradient ? productInfo.driveGradient : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo && productComparisonInfo.driveGradient
                  ? productComparisonInfo.driveGradient
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('driveMaxSpeed')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                最高行驶速度
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.driveMaxSpeed
                  ? productInfo.driveMaxSpeed + "km/h"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo && productComparisonInfo.driveMaxSpeed
                  ? productComparisonInfo.driveMaxSpeed + "km/h"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('driveMaxTraction')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                最大牵引力
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.driveMaxTraction
                  ? productInfo.driveMaxTraction + "kN"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.driveMaxTraction
                  ? productComparisonInfo.driveMaxTraction + "kN"
                  : "--"
                }}
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="维修加注容量" name="7" v-if="
          productInfo.capacityFuelTank ||
          productInfo.capacityCooling ||
          productInfo.capacityEngineOil ||
          productInfo.capacityRotationDrive ||
          productInfo.capacityFinalDrive ||
          productInfo.capacityHydraulicSystem ||
          productInfo.capacityHydraulicTank ||
          productInfo.bucketCapacity ||
          productInfo.maxReachRange
        ">
          <div class="engine-params">
            <div class="params-every" v-if="isShowParams('bucketCapacity')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                铲斗容量
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.bucketCapacity
                  ? productInfo.bucketCapacity + "m³"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo && productComparisonInfo.bucketCapacity
                  ? productComparisonInfo.bucketCapacity + "m³"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('maxReachRange')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                挖掘深度
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.maxReachRange
                  ? productInfo.maxReachRange + "mm"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo && productComparisonInfo.maxReachRange
                  ? productComparisonInfo.maxReachRange + "mm"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('capacityFuelTank')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                燃油箱容量
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.capacityFuelTank
                  ? productInfo.capacityFuelTank + "L"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.capacityFuelTank
                  ? productComparisonInfo.capacityFuelTank + "L"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('capacityCooling')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                冷却系统
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.capacityCooling
                  ? productInfo.capacityCooling + "L"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo && productComparisonInfo.capacityCooling
                  ? productComparisonInfo.capacityCooling + "L"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('capacityEngineOil')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                发动机机油(含滤清器)
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.capacityEngineOil
                  ? productInfo.capacityEngineOil + "L"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.capacityEngineOil
                  ? productComparisonInfo.capacityEngineOil + "L"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('capacityRotationDrive')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                回转驱动(每个)
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.capacityRotationDrive
                  ? productInfo.capacityRotationDrive + "L"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.capacityRotationDrive
                  ? productComparisonInfo.capacityRotationDrive + "L"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('capacityFinalDrive')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                终传动(每个)
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.capacityFinalDrive
                  ? productInfo.capacityFinalDrive + "L"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.capacityFinalDrive
                  ? productComparisonInfo.capacityFinalDrive + "L"
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('capacityHydraulicSystem')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                液压系统油容量(含油箱)
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.capacityHydraulicSystem
                  ? productInfo.capacityHydraulicSystem
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.capacityHydraulicSystem
                  ? productComparisonInfo.capacityHydraulicSystem
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('capacityHydraulicTank')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                液压油箱(含吸入管)
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.capacityHydraulicTank
                  ? productInfo.capacityHydraulicTank + "kN"
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.capacityHydraulicTank
                  ? productComparisonInfo.capacityHydraulicTank + "kN"
                  : "--"
                }}
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="动臂" name="8" v-if="productInfo.extendBoom || productInfo.largeVolumeBoom">
          <div class="engine-params">
            <div class="params-every" v-if="isShowParams('extendBoom')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                伸展动臂
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{ productInfo.extendBoom ? productInfo.extendBoom : "--" }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo && productComparisonInfo.extendBoom
                  ? productComparisonInfo.extendBoom
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('largeVolumeBoom')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                大斗量动臂
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.largeVolumeBoom
                  ? productInfo.largeVolumeBoom
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo && productComparisonInfo.largeVolumeBoom
                  ? productComparisonInfo.largeVolumeBoom
                  : "--"
                }}
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="斗杆" name="9" v-if="productInfo.extendStick || productInfo.largeVolumeStick">
          <div class="engine-params">
            <div class="params-every" v-if="isShowParams('extendStick')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                伸展斗杆
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{ productInfo.extendStick ? productInfo.extendStick : "--" }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo && productComparisonInfo.extendStick
                  ? productComparisonInfo.extendStick
                  : "--"
                }}
              </div>
            </div>
            <div class="params-every" v-if="isShowParams('largeVolumeStick')">
              <div class="params parameter" :style="{ color: showAll == 0 ? '#1a1a1a' : '#E6AC00' }">
                大容量型斗杆
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productInfo.largeVolumeStick
                  ? productInfo.largeVolumeStick
                  : "--"
                }}
              </div>
              <div class="params" :style="{ color: showAll == 0 ? '#4D4D4D' : '#E6AC00' }">
                {{
                  productComparisonInfo &&
                  productComparisonInfo.largeVolumeStick
                  ? productComparisonInfo.largeVolumeStick
                  : "--"
                }}
              </div>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="enquiry" @click="askPrice">立即询价</div>
    <div class="hint">
      CAT会尽力按照现时发布的最新产品信息更新本网页、本配置表内的产品信息，可能出现表内产品详情信息更新延迟的情形。具体可购机型及其配置详情请咨询所在地的授权经销商，并以授权经销商店内相关机型的最新配置表信息为准。
    </div>
  </div>

  <van-popup v-if="cliWidth > 991" v-model:show="showPicker" round position="center" :style="{ width: '800px' }">
    <div class="product-popup">
      <div class="product-top">
        <div class="title">添加对比型号</div>
        <van-icon name="cross" size="24" @click="showPicker = false" />
      </div>

      <div class="top-series">
        <div class="tab-every" :class="item == selSeries ? 'active' : ''" v-for="(item, index) of seriesList" :key="index"
          @click="selTab(item)">
          {{ item }}
        </div>
      </div>
      <div class="popup-main">
        <div class="product-every" v-for="item in compariProductList" :key="item.id" @click="selProductSure(item)">
          <div class="every-img">
            <img :src="base_request_url + '/file/' + item.imgUrl.split('|')[0]" />
          </div>
          <div class="every-main">
            <div class="title">{{ item.model }}</div>
            <div class="line"></div>
            <div class="params" v-if="item.bucketCapacity">铲斗容量：{{ item.bucketCapacity + "m³" }}</div>
            <div class="params">净功率：{{ item.engineNetPower + "KW" }}</div>
            <div class="params">工作重量：{{ item.weightWork + "kg" }}</div>
          </div>
        </div>
      </div>
    </div>
  </van-popup>

  <van-popup v-else v-model:show="showPicker" round position="bottom">
    <div class="product-popup">
      <div class="product-top">
        <div class="title">添加对比型号</div>
        <van-icon name="cross" size="24" @click="showPicker = false" />
      </div>

      <div class="top-series">
        <div class="tab-every" :class="item == selSeries ? 'active' : ''" v-for="(item, index) of seriesList" :key="index"
          @click="selTab(item)">
          {{ item }}
        </div>
      </div>
      <div class="popup-main">
        <div class="product-every" v-for="item in compariProductList" :key="item.id" @click="selProductSure(item)">
          <div class="every-img">
            <img :src="base_request_url + '/file/' + item.imgUrl.split('|')[0]" />
          </div>
          <div class="every-main">
            <div class="title">{{ item.model }}</div>
            <div class="line"></div>
            <div class="params" v-if="item.bucketCapacity">铲斗容量：{{ item.bucketCapacity + "m³" }}</div>
            <div class="params">净功率：{{ item.engineNetPower + "KW" }}</div>
            <div class="params">工作重量：{{ item.weightWork + "kg" }}</div>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { base_request_url } from "@/request/http";
import {
  productInfoPort,
  productSearchPort,
  seriesPort,
} from "@/request/api/product";
import { IProductDetail, IProduct } from "@/types/global";
import _sessionStorage from "@/utils/sessionStorage";

import { useRoute } from "vue-router";
const route = useRoute();

let params: any = _sessionStorage.get("check_product_params");
console.log("参数", typeof params);

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };
});

// 立即询价
const askPrice = () => {
  document.getElementById("ECIM001")?.click();
};

// 选中系列
const selSeries = ref<string>("");
const selTab = (name: string) => {
  selSeries.value = name;
  params.series = selSeries.value;

  getProductList();
};

// 选择对比产品
const showPicker = ref(false);
const activeNames = ref<string[]>([]);
const selProductSure = (selectedValues: any) => {
  showPicker.value = false;

  getProductInfo(selectedValues.id, 1);
};

const openOrClose = ref(0);
const showAll = ref(0);
const openClick = () => {
  if (openOrClose.value == 0) {
    openOrClose.value = 1;
    activeNames.value = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  } else if (openOrClose.value == 1) {
    openOrClose.value = 0;
    activeNames.value = [];
  }
};
const showClick = () => {
  if (showAll.value == 0) {
    showAll.value = 1;
  } else if (showAll.value == 1) {
    showAll.value = 0;
  }
};
const isShowParams = (val: keyof IProductDetail) => {
  if (productInfo.value && productComparisonInfo.value) {
    if (showAll.value == 1) {
      if (productInfo.value[val] || productComparisonInfo.value[val]) {
        if (productInfo.value[val] == productComparisonInfo.value[val]) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      if (productInfo.value[val] || productComparisonInfo.value[val]) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true;
  }
};

// 获取产品详情
const productInfo = ref<IProductDetail | null>(null);
const productComparisonInfo = ref<IProductDetail | null>(null);
let id = route.query.productId;

const getProductInfo = (param: any, pro: number) => {
  productInfoPort({
    id: param,
  }).then((res) => {
    console.log("产品详情", res);
    if (pro == 0) {
      productInfo.value = res.data.data;
      if (productInfo.value) {
        selSeries.value = productInfo.value.series;
        params.series = selSeries.value;
        getProductList();
      }
    } else {
      productComparisonInfo.value = res.data.data;
    }

    getSeriesList();
  });
};
getProductInfo(id, 0);

// 获取可选的 对比产品
const compariProductList = ref<IProduct[]>([]);
const getProductList = () => {
  productSearchPort(params).then((res) => {
    compariProductList.value = res.data.data.list;
    compariProductList.value = compariProductList.value.filter((item) => {
      if (productInfo.value) {
        return item.id != productInfo.value.id;
      }
    });
    console.log("产品列表", compariProductList.value);
  });
};

// 获取 系列 列表
const seriesList = ref<string[]>([]);
const getSeriesList = () => {
  seriesPort({
    equipmentTypeId: productInfo.value?.equipmentTypeId,
  }).then((res) => {
    console.log("系列列表", res);
    seriesList.value = res.data.data;
  });
};
</script>

<style scoped lang="scss">
.home-title-six {
  background: url("../../assets/imgs/pc/common/titleBack6.png") no-repeat;
  background-size: 100% 100%;
}

// PC端
@media screen and (min-width: 992px) {
  .comparision-container {
    width: 870px;
    margin: 0 auto;
    margin-bottom: 93px;

    .comparision-product {
      display: flex;
      justify-content: space-between;

      .every {
        width: 420px;
        cursor: pointer;

        .every-content {
          width: 100%;
          height: 315px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid #f5f5f5;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .font {
            margin-top: 15px;
            font-weight: 700;
            font-size: 14px;
            color: #595959;
          }
        }

        .content-title {
          margin-top: 15px;
          font-weight: 400;
          font-size: 13px;
          text-align: center;
          color: #858585;
        }
      }

      .left {
        cursor: default;
      }
    }

    .comparision-btn {
      margin-top: 40px;
      display: flex;
      justify-content: flex-end;

      .btn-left {
        width: 84px;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f7f2df;
        border-radius: 44px;
        font-weight: 400;
        font-size: 14px;
        color: #e6ac00;
        cursor: pointer;
      }

      .btn-right {
        margin-left: 12px;
      }
    }

    .comparison-params {
      margin-top: 16px;

      .engine-params {
        border: 1px solid #ebebeb;
        border-bottom: none;
        border-right: none;

        .params-every {
          // margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ebebeb;

          .params {
            width: 33.33%;
            height: 66px;
            padding: 0 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-weight: 400;
            font-size: 16px;
            color: #4d4d4d;
            border-right: 1px solid #ebebeb;
          }

          .parameter {
            font-weight: 400;
            font-size: 16px;
            color: #1a1a1a;
            background-color: #f8f8f8;
          }
        }
      }
    }

    .enquiry {
      width: 200px;
      height: 52px;
      margin: 60px auto;
      line-height: 52px;
      text-align: center;
      background: #f5c71b;
      border-radius: 57px;
      font-weight: 700;
      font-size: 16px;
      color: #1a1a1a;
      cursor: pointer;
    }

    .hint {
      font-weight: 400;
      font-size: 16px;
      line-height: 32px;
      color: #6c6c6c;
      text-align: left;
    }
  }

  .product-popup {
    height: 70vh;
    position: relative;

    .product-top {
      width: -webkit-fill-available;
      padding: 20px 15px;
      position: fixed;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;

      .title {
        flex: 1;
        text-align: center;
        font-weight: 700;
        font-size: 16px;
        color: #1a1a1a;
      }

      i {
        cursor: pointer;
      }
    }

    .top-series {
      padding: 65px 15px 0;
      display: flex;
      flex-wrap: wrap;

      .tab-every {
        padding: 12px;
        margin: 0 10px 10px 0;
        display: flex;
        align-items: flex-end;
        box-sizing: border-box;
        font-weight: 400;
        font-size: 13px;
        color: #1a1a1a;
        background: #edeff0;
        border: 1px solid #edeff0;
        cursor: pointer;
      }

      .active {
        color: #e6ac00;
        background: #f7f2df;
        border: 1px solid #f5c71b;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .popup-main {
    padding: 20px 15px 20px;
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 48%);
    // grid-gap: 27px;

    .product-every {
      padding-right: 19px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      background: #f5f5f5;
      cursor: pointer;

      .every-img {
        width: 153px;
        height: 116px;
        margin-right: 13px;

        img {
          width: 153px;
          height: 116px;
        }
      }

      .every-main {
        .title {
          max-width: 200px;
          font-weight: 900;
          font-size: 14px;
          color: #1a1a1a;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .line {
          width: 100%;
          height: 1px;
          margin: 10px 0;
          background-color: #e6e6e6;
        }

        .params {
          margin-top: 8px;
          font-weight: 400;
          font-size: 12px;
          color: #4d4d4d;
        }
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .home-title-six {
    margin-top: 60px;
    margin-bottom: 41px;

    div {
      padding: 18px 7px 23px 10px;
    }
  }
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
  .home-title-six {
    margin-top: 43px;
    margin-bottom: 17px;

    div {
      padding: 12px 4px 15px 8px;
    }
  }
}

@media screen and (max-width: 991px) {
  .home-title-six {
    margin-top: 23px;
    margin-bottom: 17px;

    div {
      padding: 12px 1px 14px 8px;
    }
  }

  .comparision-container {
    padding: 0 15px 42px;

    .comparision-product {
      display: flex;
      justify-content: space-between;

      .every {
        width: 48%;
        cursor: pointer;

        .every-content {
          width: 100%;
          height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid #f5f5f5;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .font {
            margin-top: 15px;
            font-weight: 700;
            font-size: 14px;
            color: #595959;
          }
        }

        .content-title {
          margin-top: 15px;
          font-weight: 400;
          font-size: 13px;
          text-align: center;
          color: #858585;
        }
      }

      .left {
        cursor: default;
      }
    }

    .comparision-btn {
      margin-top: 40px;
      display: flex;
      justify-content: flex-end;

      .btn-left {
        width: 68px;
        height: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f7f2df;
        border-radius: 44px;
        font-weight: 400;
        font-size: 12px;
        color: #e6ac00;
      }

      .btn-right {
        margin-left: 10px;
      }
    }

    .comparison-params {
      margin-top: 16px;

      .engine-params {
        border: 1px solid #ebebeb;
        border-bottom: none;
        border-right: none;

        .params-every {
          // margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ebebeb;

          .params {
            width: 33.33%;
            height: 66px;
            padding: 0 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-weight: 400;
            font-size: 13px;
            color: #595959;
            border-right: 1px solid #ebebeb;
          }

          .parameter {
            font-weight: 700;
            font-size: 13px;
            color: #1a1a1a;
            background-color: #f8f8f8;
          }
        }
      }
    }

    .enquiry {
      width: 150px;
      height: 40px;
      margin: 40px auto;
      line-height: 40px;
      text-align: center;
      background: #f5c71b;
      border-radius: 57px;
      font-weight: 700;
      font-size: 14px;
      color: #1a1a1a;
      cursor: pointer;
    }

    .hint {
      font-weight: 400;
      font-size: 12px;
      line-height: 21px;
      color: #6c6c6c;
      text-align: left;
    }
  }

  .product-popup {
    height: 70vh;
    position: relative;

    .product-top {
      width: -webkit-fill-available;
      padding: 20px 15px;
      position: fixed;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;

      .title {
        flex: 1;
        text-align: center;
        font-weight: 700;
        font-size: 16px;
        color: #1a1a1a;
      }
    }

    .top-series {
      padding: 65px 15px 0;
      display: flex;
      flex-wrap: wrap;

      .tab-every {
        padding: 12px;
        margin: 0 10px 10px 0;
        display: flex;
        align-items: flex-end;
        box-sizing: border-box;
        font-weight: 400;
        font-size: 13px;
        color: #1a1a1a;
        background: #edeff0;
        border: 1px solid #edeff0;
      }

      .active {
        color: #e6ac00;
        background: #f7f2df;
        border: 1px solid #f5c71b;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .popup-main {
    padding: 20px 15px 20px;

    .product-every {
      padding-right: 19px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      background: #f5f5f5;

      .every-img {
        width: 153px;
        height: 116px;
        margin-right: 13px;

        img {
          width: 153px;
          height: 116px;
        }
      }

      .every-main {
        .title {
          max-width: 160px;
          font-weight: 900;
          font-size: 14px;
          color: #1a1a1a;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .line {
          width: 100%;
          height: 1px;
          margin: 10px 0;
          background-color: #e6e6e6;
        }

        .params {
          margin-top: 8px;
          font-weight: 400;
          font-size: 12px;
          color: #4d4d4d;
        }
      }
    }
  }
}
</style>
<style lang="scss">
@media screen and (min-width: 992px) {
  .comparison-params {
    .van-cell {
      color: #1a1a1a !important;
      font-size: 20px !important;
      font-weight: 900 !important;
    }
  }
}

@media screen and (max-width: 991px) {
  .comparison-params {
    .van-cell {
      color: #1a1a1a !important;
      font-size: 18px !important;
      font-weight: 900 !important;
    }
  }
}
</style>
