<template>
  <div
    @touchstart="handleTouchstart"
    @touchmove="handleTouchmove"
    @touchend="handleTouchend"
  >
    <Suspense>
      <router-view />
    </Suspense>
  </div>

  <el-backtop v-show="cliWidth > 768" :right="5" :bottom="100">
    <div class="back-top-content">
      <img class="top-img" src="./assets/imgs/pc/common/top.png" />
      <div class="top-font">返回顶部</div>
    </div>
  </el-backtop>

  <div
    v-show="cliWidth < 769 && isShowBack"
    class="phone-back-top"
    @click="backTop"
  >
    <div class="back-top-content">
      <img class="top-img" src="./assets/imgs/pc/common/top.png" />
      <div class="top-font">返回顶部</div>
    </div>
  </div>

  <div id="arrowLeft">
    <img src="./assets/imgs/phone/common/back.png" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
import { websiteConfigPort } from "@/request/api/system";
const userStore = useUserStore();

const cliWidth = ref(document.documentElement.clientWidth);
const isShowBack = ref(false);
const handleScroll = () => {
  if (window.scrollY > 100) {
    isShowBack.value = true;
  } else {
    isShowBack.value = false;
  }
};
onMounted(() => {
  window.addEventListener("beforeunload", (e) => {
    console.log(e);
    sessionStorage.setItem("product_type_list", "");
    sessionStorage.setItem("support_type_list", "");
  }); //监听页面刷新触发事件

  window.addEventListener("scroll", handleScroll); // 获取滑动高度 一般在刚进入页面写入(componentDidMount)

  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };
});
const router = useRouter();

// 获取系统设置信息
const getLogo = () => {
  websiteConfigPort().then((res) => {
    console.log("系统设置信息");

    userStore.setSystemMsg(res.data.data);
  });
};
getLogo();

const backTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

//屏幕滑动
//手指按下屏幕
let startX = 0;
let startY = 0;
let startTime = 0;
const handleTouchstart = (event: any) => {
  startTime = Date.now();
  startX = event.changedTouches[0].clientX;
  // alert(startX);
  startY = event.changedTouches[0].clientY;
};

const handleTouchmove = (event: any) => {
  console.log("滑动中", event);

  // if (startX < 50) {
  if (startX > cliWidth.value - 50) {
    const endTime = Date.now();
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    //判断按下的时长
    if (endTime - startTime > 1000) {
      return;
    }

    //先判断用户滑动的距离，是否合法，合法:判断滑动的方向 注意 距离要加上绝对值
    if (Math.abs(endX - startX) > 5) {
      //滑动方向
      if (Math.abs(endY - startY) > 100) {
        // console.log("y方向偏移太多，不让你滑了")
        return;
      } else {
        let ele = document.getElementById("arrowLeft") as HTMLElement;
        ele.style.display = "block";
      }
    } else {
      return;
    }
  }
};

//手指离开屏幕
const handleTouchend = (event: any) => {
  let ele = document.getElementById("arrowLeft") as HTMLElement;
  ele.style.display = "none";

  if (startX > cliWidth.value - 50) {
    const endTime = Date.now();
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    //判断按下的时长
    if (endTime - startTime > 1000) {
      return;
    }
    //滑动的方向
    let direction = "";
    //先判断用户滑动的距离，是否合法，合法:判断滑动的方向 注意 距离要加上绝对值
    // alert("X值" + Math.abs(endX - startX));
    if (Math.abs(endX - startX) > 5) {
      //滑动方向
      // alert("Y值" + Math.abs(endY - startY));
      if (Math.abs(endY - startY) > 100) {
        // console.log("y方向偏移太多，不让你滑了")
        return;
      } else {
        direction = endX - startX > 0 ? "right" : "left";
      }
    } else {
      return;
    }

    //用户做了合法的滑动操作
    if (direction === "left") {
      // alert("left");
      // router.go(-1);
      router.back();
    }
  }
};
</script>

<style scoped lang="scss">
#app {
  font-family: "PingFang SC";
}
</style>
<style lang="scss">
#arrowLeft {
  position: fixed;
  bottom: 50%;
  z-index: 99999;
  display: none;
  animation: fadenum 0.5s 1;

  img {
    width: 25px;
    height: 129px;
  }
}

@keyframes fadenum {
  0% {
    right: -25px;
  }
  100% {
    right: 0px;
  }
}

.phone-back-top {
  position: fixed;
  right: 5px;
  bottom: 100px;
}

@media screen and (min-width: 768px) {
  .el-backtop {
    height: 68px !important;
    width: 68px !important;
  }
}
@media screen and (max-width: 767px) {
  .el-backtop {
    height: 58px !important;
    width: 58px !important;

    .back-top-content {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
