<template>
  <el-menu
    :default-active="routePath"
    :mode="props.isShow == 'pcPage' ? 'horizontal' : 'vertical'"
    :unique-opened="true"
    :ellipsis="false"
    :menu-trigger="'click'"
    :text-color="textColor()"
    :active-text-color="activeTextColor()"
    :background-color="backColor()"
    router
    v-if="constantRoutes"
  >
    <router-link v-show="props.isShow == 'pcPage'" class="logo-link" to="/"
      ><img
        v-if="system"
        :src="base_request_url + '/file/' + system.companyMsg.websiteLogo"
    /></router-link>
    <!-- <div class="flex-grow" v-show="props.isShow == 'pcPage'" /> -->
    <template v-for="item in constantRoutes[0].children" :key="item.path">
      <!-- 单栏目 -->

      <el-menu-item
        class="sub-menu"
        :key="item.path"
        :index="item.path"
        :route="{ path: item.path }"
        v-if="
          !item.meta?.isShow &&
          (!item.children || (item.children && item.meta?.childShow))
        "
        @click="menuItemClick(item.meta?.title)"
      >
        <span>{{ item.meta?.title }}</span>
      </el-menu-item>
      <!-- 有子栏目 -->
      <el-sub-menu
        :popper-append-to-body="false"
        v-if="item.children && !item.meta?.childShow"
        :index="item.path"
        class="sub-menu-item"
      >
        <template #title>
          <span
            class="sub-menu"
            v-if="item.meta && item.meta.title == 'Cat®(卡特)设备'"
          >
            Cat<span style="font-size: 13px">®</span>(卡特)设备</span
          >
          <span
            class="sub-menu"
            v-else-if="item.meta && item.meta.title != 'Cat®(卡特)设备'"
          >
            {{ item.meta.title }}</span
          >
        </template>
        <template v-for="option in item.children" :key="option.name">
          <el-menu-item
            index=""
            key="https://246438635.cms.n.weimob.com/bos/cms/246438635/6001491069635/3594336635/design/index?productInstanceId=3594336635"
            v-if="option.meta?.title == '整机商城'"
            @click="menuItemClick(option.meta?.title)"
          >
            <a
              :style="{
                color:
                  props.isShow == 'pcPage'
                    ? '#1a1a1a'
                    : routePath == '/'
                    ? '#1a1a1a'
                    : '#fff',
              }"
              href="https://246438635.cms.n.weimob.com/bos/cms/246438635/6001491069635/3594336635/design/index?productInstanceId=3594336635"
              target="_blank"
              >整机商城</a
            >
          </el-menu-item>
          <el-menu-item
            index=""
            key="https://www.catpeijian.cn/zh-CN/ecim?dealer=ecim&cl_sr=owned&cl_ctnm=ecimposter&cl_source1=ecim_m"
            v-else-if="
              option.meta?.title == '零件商城' ||
              option.meta?.title == '工装及配件'
            "
            @click="menuItemClick(option.meta?.title)"
          >
            <a
              :style="{
                color:
                  props.isShow == 'pcPage'
                    ? '#1a1a1a'
                    : routePath == '/'
                    ? '#1a1a1a'
                    : '#fff',
              }"
              href="https://www.catpeijian.cn/zh-CN/ecim?dealer=ecim&cl_sr=owned&cl_ctnm=ecimposter&cl_source1=ecim_m"
              target="_blank"
              >{{ option.meta?.title }}</a
            >
          </el-menu-item>
          <el-menu-item
            :index="option.path"
            v-else-if="
              option.meta &&
              option.meta.title != '整机商城' &&
              option.meta.title != '零件商城' &&
              option.meta.title != '工装及配件' &&
              !option.meta.isDynamic
            "
            @click="menuItemClick(option.meta?.title)"
          >
            <span class="title" style="font-size: 14px" v-if="option.meta">
              {{ option.meta.title }}
            </span>
          </el-menu-item>
          <el-menu-item
            :index="option.path"
            :route="{ path: option.path, query: { name: option.meta.title as any} }"
            v-else-if="
              option.meta &&
              option.meta.title != '整机商城' &&
              option.meta.title != '零件商城' &&
              option.meta.title != '工装及配件' &&
              option.meta.isDynamic
            "
            @click="menuItemClick(option.meta?.title)"
          >
            <span class="title isDynamicColor" v-if="option.meta">
              {{ option.meta.title }}
            </span>
          </el-menu-item>
        </template>
      </el-sub-menu>
    </template>

    <router-link
      v-show="props.isShow == 'pcPage'"
      class="search-img"
      to="/search"
      ><img src="../../assets/imgs/common/search.png"
    /></router-link>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
// import { constantRoutes } from "@/router/index";
import { useUserStore } from "@/store/userStore";

import { base_request_url } from "@/request/http";

import { getProductClassify } from "@/utils/utils";

const constantRoutes: any = useUserStore().routerData;
console.log("55555555555555", useUserStore().routerData);

const { childList } = await getProductClassify("联盟产品");
console.log(childList.value);

const route = useRoute();
const routePath = ref(route.path);
console.log(route);
const activeName = ref();

onBeforeRouteUpdate((to: any) => {
  console.log("===================", to);
  activeName.value = to;

  textColorShow(activeName.value.query.name, activeName.value.path);

  routePath.value = to.path;

  if (to.name == "list" || to.name == "newsDetail") {
    routePath.value = "/activity";
  } else if (
    to.name == "classify" ||
    to.name == "electricity" ||
    to.name == "classifyElectricity" ||
    to.name == "Power"
  ) {
    routePath.value = "/product/power";
  } else if (
    to.name == "mineClassify" ||
    to.name == "mineDetail" ||
    to.name == "calc"
  ) {
    routePath.value = "/product/mine";
  } else if (to.name == "secondDetail") {
    routePath.value = "/secondHand";
  } else if (to.name == "JobDetail") {
    routePath.value = "/about/join";
  } else if (
    to.name == "bcp" ||
    to.name == "map" ||
    to.name == "excavator" ||
    to.name == "fileDetail" ||
    to.name == "maintain" ||
    to.name == "commonSense" ||
    to.name == "resource"
  ) {
    routePath.value = "/support";
  } else {
    routePath.value = to.path;
  }
});

const props = defineProps({
  isShow: {
    required: true,
  },
});

const emit = defineEmits(["menuClose"]);
const menuItemClick = (title: any) => {
  console.log("999999999----------", title);

  emit("menuClose", "close");
};

onMounted(() => {
  textColorShow(route.query.name, routePath.value);
});

const textColorShow = (name: any, path: any) => {
  let list = document.getElementsByClassName("isDynamicColor");
  console.log(list);

  let list2 = childList.value.map((item: any) => {
    return item.equipmentTypeName;
  });

  for (let i = 0; i < list.length; i++) {
    if (props.isShow == "phonePage") {
      if (list2.indexOf(name) !== -1 && list[i].innerHTML == name) {
        console.log(list[i].innerHTML, name);

        list[i].setAttribute("style", "color:#F5C71B");
      } else {
        if (path == "/") {
          list[i].setAttribute("style", "color:#1a1a1a");
        } else {
          list[i].setAttribute("style", "color:#fff");
        }
      }
    }
  }
};

const textColor = (): string => {
  if (props.isShow == "pcPage") {
    return "#1a1a1a";
  } else if (props.isShow == "phonePage") {
    if (route.path == "/") {
      return "#1a1a1a";
    } else {
      return "#fff";
    }
  } else {
    return "#1A1A1A";
  }
};

const activeTextColor = (): string => {
  let color =
    props.isShow == "pcPage"
      ? "#1A1A1A"
      : props.isShow == "phonePage"
      ? "#F5C71B"
      : "#1A1A1A";
  return color;
};

const backColor = (): string => {
  if (props.isShow == "pcPage") {
    return "transparent";
  } else if (props.isShow == "phonePage") {
    if (route.path == "/") {
      return "#fff";
    } else {
      return "#1a1a1a";
    }
  } else {
    return "#F5F5F5";
  }
};

const system: any = ref();
const userStore = useUserStore();
if (userStore.systemMsg) {
  system.value = JSON.parse(userStore.systemMsg);
}
</script>

<style lang="scss" scoped>
.logo-link {
  display: flex;
  align-items: center;

  img {
    max-width: 100%;
    min-width: 100px;
    height: 50px;
  }
}

.search-img {
  display: flex;
  align-items: center;

  img {
    width: 19px;
    height: 19px;
  }
}

.flex-grow {
  flex-grow: 1;
}

.sub-menu {
  font-weight: 700;
  font-size: 15px;
}

a {
  color: #fff;
}
</style>
<style lang="scss">
.el-menu--popup {
  width: 80vw;
  display: flex;
  justify-content: center;
}

.el-menu--horizontal .el-menu .el-menu-item {
  padding: 0 50px;
}

.el-menu--horizontal {
  justify-content: center;
}

@media screen and (max-width: 767px) {
  .shop-a {
    display: inline-block;
    width: 100%;
  }
}

@media screen and (min-width: 1301px) {
  .el-menu-item {
    padding: 0 20px !important;
  }

  .el-sub-menu__title {
    padding: 0 20px !important;
    padding-right: 44px !important;
  }

  .el-sub-menu .el-sub-menu__icon-arrow {
    right: 20px !important;
  }

  .logo-link {
    margin-right: 60px;
  }

  .search-img {
    margin-left: 60px;
  }
}

@media screen and (max-width: 1300px) {
  .el-menu-item {
    padding: 0 15px !important;
  }

  .el-sub-menu__title {
    padding: 0 15px !important;
    padding-right: 32px !important;
  }

  .el-sub-menu .el-sub-menu__icon-arrow {
    right: 15px !important;
  }

  .logo-link {
    margin-right: 20px;
  }

  .search-img {
    margin-left: 20px;
  }
}
</style>
