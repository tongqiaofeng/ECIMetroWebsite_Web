<template>
  <!-- :menu-trigger="'click'" -->
  <el-menu
    :default-active="
      route.path == '/activity/detail' || route.path == '/activity/list'
        ? '/activity'
        : route.path
    "
    :mode="props.isShow ? 'horizontal' : 'vertical'"
    :unique-opened="true"
    :ellipsis="false"
    :text-color="props.isShow ? '#b7bdc6' : '#fff'"
    :active-text-color="props.isShow ? '#000' : '#000'"
    :background-color="props.isShow ? '#fff' : '#c3c3c3'"
    router
  >
    <router-link v-show="props.isShow" class="logo-link" to="/"
      ><img src="../../assets/imgs/home/logn.png"
    /></router-link>
    <div class="flex-grow" v-show="props.isShow" />
    <template v-for="item in constantRoutes[0].children" :key="item.path">
      <!-- 单栏目 -->
      <!-- 
        v-if="
          !item.children || (item.children && item.meta && item.meta.childShow)
        "
         v-if="!item.children && item.meta && !item.meta.menuShow"
    
        v-if="item.children && item.meta && !item.meta.childShow"
         v-if="item.children"
       -->
      <el-menu-item
        class="sub-menu"
        :key="item.path"
        :index="item.path"
        :route="{ path: item.path }"
        v-if="
          !item.children || (item.children && item.meta && item.meta.childShow)
        "
        @click="menuItemClick"
      >
        <span v-if="item.meta">{{ item.meta.title }}</span>
      </el-menu-item>
      <!-- 有子栏目 -->
      <el-sub-menu
        v-if="item.children && item.meta && !item.meta.childShow"
        :index="item.path"
        class="sub-menu-item"
      >
        <template #title>
          <span class="title" style="font-size: 15px" v-if="item.meta">{{
            item.meta.title
          }}</span>
        </template>
        <template v-for="option in item.children" :key="option.path">
          <el-menu-item
            :index="option.path"
            v-if="option.meta"
            @click="menuItemClick"
          >
            <span class="title" style="font-size: 14px" v-if="option.meta">
              {{ option.meta.title }}
            </span>
          </el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { constantRoutes } from "@/router/index";

console.log(constantRoutes);

const route = useRoute();

const props = defineProps({
  isShow: {
    required: true,
  },
});
console.log(props.isShow);

const emit = defineEmits(["menuClose"]);
const menuItemClick = () => {
  emit("menuClose", "close");
};
</script>

<style lang="scss" scoped>
.logo-link {
  padding-left: 20px;
  display: flex;
  align-items: center;

  img {
    max-width: 100%;
    height: 50px;
  }
}
.flex-grow {
  flex-grow: 1;
}
</style>
