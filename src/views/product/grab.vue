<template>
  <div>挖掘机&非挖</div>
  <div
    :style="{ height: cliWidth > 768 ? '800px' : '400px', padding: '0 10px' }"
    id="amp-container"
    ref="ampContainer"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { Toast } from "vant";

const cliWidth = ref(document.documentElement.clientWidth);

const dataMap = {
  map: "",
  markerLayer: null,
  latitude: 31.197646, //纬度
  lngitude: 121.59996, //经度
  address: "",
};
const TMap = (window as any).TMap;
console.log(TMap);

//初始化地图
const ampContainer = ref(null);
onMounted(() => {
  console.log("产品中心");
  nextTick(() => {
    initMap();
  });
});

//初始化地图
const initMap = () => {
  let center = new TMap.LatLng(39.954104, 116.357503);

  dataMap.map = new TMap.Map(ampContainer.value, {
    center: center, //设置地图中心点坐标
    zoom: 11, //设置地图缩放级别
  });

  markerLayerMap(); // 标记地图
};

//标记地图
const markerList = [
  {
    id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
    styleId: "myStyle", //指定样式id
    position: new TMap.LatLng(39.954104, 116.357503), //点标记坐标位置
    content: "故宫博物馆",
    properties: {
      //自定义属性
      title: "故宫博物馆",
    },
  },
  {
    //第二个点标记
    id: "2",
    styleId: "marker",
    position: new TMap.LatLng(40.040074, 116.273519),
    content: "腾讯北京总部",
    properties: {
      title: "腾讯北京总部",
    },
  },
  {
    id: "3",
    styleId: "test",
    position: new TMap.LatLng(39.93157, 116.41005),
    content: "东城区",
    properties: {
      title: "东城区",
    },
  },
];
const markerLayerMap = () => {
  const markerLayer = new TMap.MultiMarker({
    map: dataMap.map, //指定地图容器
    //样式定义
    styles: {
      //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
      myStyle: new TMap.MarkerStyle({
        width: 25, // 点标记样式宽度（像素）
        height: 35, // 点标记样式高度（像素）
        // src: "../img/marker.png", //图片路径
        //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
        anchor: { x: 16, y: 32 },
      }),
    },
    //点标记数据数组
    geometries: markerList,
  });

  console.log(markerLayer);

  // for (const item of markerList) {
  //   //初始化infoWindow
  //   let infoWindow = new TMap.InfoWindow({
  //     map: dataMap.map,
  //     position: new TMap.LatLng(39.984104, 116.307503),
  //     offset: { x: 0, y: -32 }, //设置信息窗相对position偏移像素，为了使其显示在Marker的上方
  //   });
  //   infoWindow.open(); //打开信息窗

  //   //设置infoWindow
  //   infoWindow.setPosition(item.position); //设置信息窗位置
  //   infoWindow.setContent(`<div>${item.properties.title}</div>`); //设置信息窗内容
  // }

  markerLayer.on("click", (evt: any) => {
    console.log("当前点击marker", evt);

    let url = "";
    let ua = navigator.userAgent.toLowerCase();
    let agent: any = ua.match(/MicroMessenger/i);

    if (agent == "micromessenger") {
      alert("微信");
      // 腾讯地图组件
      url = `https://apis.map.qq.com/tools/routeplan/eword=${evt.geometry.content}&epointx=${evt.geometry.position.lng}&epointy=${evt.geometry.position.lat}?referer=ECIMetro&key=DL6BZ-2TPWD-WP24E-HUZ6W-CZAUF-Z6FGI`;
    } else {
      alert("其他浏览器");
      // 地图调起  URI API
      url = `qqmap://map/routeplan?type=drive&to=${evt.geometry.content}&tocoord=${evt.geometry.position.lng},${evt.geometry.position.lat}&referer=DL6BZ-2TPWD-WP24E-HUZ6W-CZAUF-Z6FGI`;
    }

    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
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
    } else if (navigator.userAgent.match(/android/i)) {
      alert("安卓");

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
  });
};
</script>

<style scoped></style>
