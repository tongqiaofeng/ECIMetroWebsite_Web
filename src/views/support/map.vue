<template>
  <div v-if="cliWidth > 768" class="pc-map-container">
    <el-scrollbar :height="cliHeight + 'px'" class="pc-job-content">
      <div class="company-addr">
        <div
          v-for="item in companyList"
          :key="item.id"
          class="addr-every"
          @click="changeCenter(item)"
        >
          <div class="every-content">
            <div class="title">{{ item.companyName }}</div>
            <div class="addr">{{ item.address }}</div>
            <div class="addr">{{ item.phoneNumber }}</div>
          </div>
          <div class="every-img">
            <van-icon name="arrow" color="#F5C71B" size="20px" />
          </div>
        </div>
      </div>
    </el-scrollbar>

    <div
      :style="{
        width: '100%',
        height: cliHeight + 'px',
      }"
      id="amp-container"
      ref="ampContainer"
    ></div>
  </div>
  <div v-else>
    <div class="padding-left-right">
      <div class="home-title-six"><div>网点地图</div></div>
    </div>

    <div
      :style="{
        width: '100%',
        height: cliWidth > 992 ? '600px' : '350px',
        margin: '0 auto',
      }"
      id="amp-container"
      ref="ampContainer"
    ></div>

    <div class="company-addr">
      <div v-for="item in companyList" :key="item.id" class="addr-every">
        <div class="every-content">
          <div class="top-title">
            <div class="title">{{ item.companyName }}</div>
            <div class="btn" @click="openMapApp(item)">导航</div>
          </div>

          <div class="addr">{{ item.address }}</div>
          <div class="addr">{{ item.phoneNumber }}</div>
        </div>
      </div>
    </div>

    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useUserStore } from "@/store/userStore";

import Header from "@/layouts/header/index.vue";

import { IJob } from "@/types/global";

const cliWidth = ref(document.documentElement.clientWidth);
const cliHeight = ref(document.documentElement.clientHeight - 132);

const companyList = ref<IJob[]>([]);
const dataMap = {
  map: <any>null,
  markerLayer: null,
  latitude: 31.197646, //纬度
  lngitude: 121.59996, //经度
  address: "",
};
const TMap = (window as any).TMap;
console.log(TMap);
const markerList: any = [];

const userStore = useUserStore();
if (userStore.systemMsg) {
  let system: any = JSON.parse(userStore.systemMsg);
  companyList.value = system.nodeMsg;
  console.log("职位列表", companyList.value);

  for (const index in companyList.value) {
    markerList.push({
      id: index + "",
      styleId: "marker",
      position: new TMap.LatLng(
        companyList.value[index].lat,
        companyList.value[index].lng
      ),
      content: companyList.value[index].companyName,
      properties: {
        title: companyList.value[index].address,
        phone: companyList.value[index].phoneNumber,
      },
    });
  }
}

onMounted(() => {
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
    cliHeight.value = document.documentElement.clientHeight - 132;
  };

  nextTick(() => {
    initMap(30.54089, 104.200943);
  });
});

//初始化地图
const ampContainer = ref(null);
const initMap = (lat: number, lng: number) => {
  let center = new TMap.LatLng(lat, lng);

  dataMap.map = new TMap.Map(ampContainer.value, {
    center: center, //设置地图中心点坐标
    zoom: 11, //设置地图缩放级别
  });

  markerLayerMap(); // 标记地图
};

//标记地图
const markerLayerMap = () => {
  const markerLayer = new TMap.MultiMarker({
    map: dataMap.map, //指定地图容器
    // 样式自定义
    // styles: {
    //   //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
    //   myStyle: new TMap.MarkerStyle({
    //     width: 25, // 点标记样式宽度（像素）
    //     height: 35, // 点标记样式高度（像素）
    //     // src: "../img/marker.png", //图片路径
    //     //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
    //     anchor: { x: 16, y: 32 },
    //   }),
    // },
    //点标记数据数组
    geometries: markerList,
  });

  console.log(markerLayer);

  //初始化infoWindow
  let infoWindow = new TMap.InfoWindow({
    map: dataMap.map,
    position: new TMap.LatLng(30.54089, 104.200943),
    offset: { x: 0, y: -32 }, //设置信息窗相对position偏移像素，为了使其显示在Marker的上方
  });
  infoWindow.close();

  // for (const item of markerList) {
  //   infoWindow.open(); //打开信息窗

  //   //设置infoWindow
  //   infoWindow.setPosition(item.position); //设置信息窗位置
  //   infoWindow.setContent(`<div>${item.properties.title}</div>`); //设置信息窗内容
  // }

  markerLayer.on("click", (evt: any) => {
    console.log("当前点击marker", evt);
    infoWindow.open(); //打开信息窗
    infoWindow.setPosition(evt.geometry.position); //设置信息窗位置
    infoWindow.setContent(
      `<div style='text-align: left;font-size: 14px;'><div>网点名称：${
        evt.geometry.content
      }</div><div style='margin-top: 5px;'>详细地址：${
        evt.geometry.properties.title
      }</div><div style='margin-top: 5px;'>联系电话：${
        evt.geometry.properties.phone ? evt.geometry.properties.phone : "暂无"
      }</div></div>`
    ); //设置信息窗内容

    // let url = "";
    // let ua = navigator.userAgent.toLowerCase();
    // let agent: any = ua.match(/MicroMessenger/i);

    // if (agent == "micromessenger") {
    //   alert("微信");
    //   // 腾讯地图组件
    //   url = `https://apis.map.qq.com/tools/routeplan/eword=${evt.geometry.content}&epointx=${evt.geometry.position.lng}&epointy=${evt.geometry.position.lat}?referer=ECIMetro&key=DL6BZ-2TPWD-WP24E-HUZ6W-CZAUF-Z6FGI`;
    // } else {
    //   alert("其他浏览器");
    //   // 地图调起  URI API
    //   url = `qqmap://map/routeplan?type=drive&to=${evt.geometry.content}&tocoord=${evt.geometry.position.lng},${evt.geometry.position.lat}&referer=DL6BZ-2TPWD-WP24E-HUZ6W-CZAUF-Z6FGI`;
    // }

    // if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    //   let loadDateTime = new Date().getTime();
    //   window.setTimeout(function () {
    //     let timeOutDateTime = new Date().getTime();
    //     if (timeOutDateTime - loadDateTime < 5000) {
    //       (window as any).location =
    //         "https://pr.map.qq.com/j/tmap/download?key=DL6BZ-2TPWD-WP24E-HUZ6W-CZAUF-Z6FGI";
    //     } else {
    //       window.close();
    //     }
    //   }, 25);
    //   (window as any).location = url;
    // } else if (navigator.userAgent.match(/android/i)) {
    //   alert("安卓");

    //   window.location.href = url;

    //   window.setTimeout(function () {
    //     if ((window as any).location.href != url) {
    //       window.location.href =
    //         "https://pr.map.qq.com/j/tmap/download?key=DL6BZ-2TPWD-WP24E-HUZ6W-CZAUF-Z6FGI";
    //     }
    //   }, 3000);

    //   setTimeout(function () {
    //     location.reload();
    //   }, 1000);
    // }
  });
};

// pc端修改地图中心
const changeCenter = (item: any) => {
  // initMap();
  dataMap.map.setCenter(new TMap.LatLng(item.lat, item.lng));
};

let userAgentInfo = navigator.userAgent;
function isMobile() {
  let Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  let getArr = Agents.filter((i) => userAgentInfo.includes(i));
  return getArr.length ? true : false;
}

// 打开腾讯地图
const openMapApp = (evt: any) => {
  console.log("当前点击职位", evt);

  if (isMobile()) {
    let url = "";
    let ua = userAgentInfo.toLowerCase();
    let agent: any = ua.match(/MicroMessenger/i);

    if (agent == "micromessenger") {
      // alert("微信");
      // 腾讯地图组件
      url = `https://apis.map.qq.com/tools/routeplan/eword=${evt.address}&epointx=${evt.lng}&epointy=${evt.lat}?referer=ECIMetro&key=DL6BZ-2TPWD-WP24E-HUZ6W-CZAUF-Z6FGI`;
    } else {
      // alert("其他浏览器");
      // 地图调起  URI API
      url = `qqmap://map/routeplan?type=drive&to=${evt.address}&tocoord=${evt.lng},${evt.lat}&referer=DL6BZ-2TPWD-WP24E-HUZ6W-CZAUF-Z6FGI`;
    }

    if (userAgentInfo.match(/(iPhone|iPod|iPad);?/i)) {
      let loadDateTime = new Date().getTime();
      window.setTimeout(function () {
        let timeOutDateTime = new Date().getTime();
        if (timeOutDateTime - loadDateTime < 5000) {
          (window as any).location =
            "https://pr.map.qq.com/j/tmap/download?key=DL6BZ-2TPWD-WP24E-HUZ6W-CZAUF-Z6FGI";
        } else {
          window.close();
        }
      }, 25);
      (window as any).location = url;
    } else if (userAgentInfo.match(/android/i)) {
      // alert("安卓");

      window.location.href = url;

      window.setTimeout(function () {
        if ((window as any).location.href != url) {
          window.location.href =
            "https://pr.map.qq.com/j/tmap/download?key=DL6BZ-2TPWD-WP24E-HUZ6W-CZAUF-Z6FGI";
        }
      }, 3000);

      setTimeout(function () {
        location.reload();
      }, 1000);
    }
  }
};
</script>

<style scoped lang="scss">
@media screen and (min-width: 768px) {
  .pc-map-container {
    display: flex;
    background-color: #f2f1ed;

    .pc-job-content {
      width: 40%;
      padding: 0 35px 0;
      background-color: #fff;

      .company-addr {
        padding-top: 12px;
        .addr-every {
          margin-top: 24px;
          padding-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f5f5f5;
          cursor: pointer;

          .every-content {
            margin-right: 20px;

            .title {
              margin-bottom: 7px;
              font-weight: 900;
              font-size: 16px;
              color: #1a1a1a;
            }

            .addr {
              padding-top: 8px;
              font-weight: 400;
              font-size: 14px;
              line-height: 18px;
              color: #6c6c6c;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .home-title-six {
    margin-top: 35px;
    margin-bottom: 24px;
    background: url("../../assets/imgs/pc/common/titleBack2.png") no-repeat;
    background-size: 100% 100%;

    div {
      padding: 9px 1px 11px 6px;
    }
  }

  .company-addr {
    margin-top: 6px;
    padding: 0 15px;

    .addr-every {
      margin-top: 24px;
      padding-bottom: 33px;
      border-bottom: 1px solid #f5f5f5;

      .every-content {
        .top-title {
          display: flex;
          justify-content: space-between;
          // align-items: center;

          .title {
            margin-bottom: 7px;
            font-weight: 900;
            font-size: 15px;
            color: #1a1a1a;
          }

          .btn {
            width: 57px;
            height: 27px;
            margin-left: 10px;
            line-height: 27px;
            text-align: center;
            color: #dea600;
            border-radius: 69px;
            font-size: 13px;
            font-weight: bold;
            background-color: #f7f2df;
          }
        }

        .addr {
          padding-top: 8px;
          font-weight: 400;
          font-size: 12px;
          line-height: 13px;
          color: #6c6c6c;
        }
      }
    }
  }
}
</style>
