<template>
  <div v-show="cliWidth > 768" class="eci-main-content detail-content">
    <div class="second-nav">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="(item, index) of breadList"
          :key="index"
          :to="{ path: item.path, query: item.query }"
          replace
        >
          {{ item.name }}</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ detailName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="details-pc-content">
      <div class="detail-title">
        <div class="line"></div>
        <div class="detail-name">
          {{ detailName }}
        </div>
      </div>

      <div class="detail-main">
        <div class="content" v-html="detailContent"></div>
      </div>
    </div>
  </div>
  <div v-show="cliWidth < 768" class="eci-main-content">
    <div>
      <div class="detail-main">
        <div class="detail-name">
          {{ detailName }}
        </div>
        <div class="line"></div>
        <div class="content" v-html="detailContent"></div>
      </div>
    </div>
    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";

import Header from "@/layouts/header/index.vue";

const cliWidth = ref(document.documentElement.clientWidth);
const breadList = ref();
onMounted(() => {
  // 窗口大小发生改变时,调用一次
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };

  if (sessionStorage.getItem("BreadcrumbItem")) {
    breadList.value = JSON.parse(
      sessionStorage.getItem("BreadcrumbItem") as string
    );
    console.log("---------发热热饭----------------", breadList.value);
  }
});

const props = defineProps({
  detailName: {
    required: true,
    type: String,
    default: "",
  },
  detailContent: {
    required: true,
    type: String,
    default: "",
  },
});
console.log("8888---------", props);
</script>

<style scoped lang="scss">
@media screen and (min-width: 768px) {
  .second-nav {
    margin-bottom: 50px;
  }

  .details-pc-content {
    .carousel-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .detail-title {
      margin-bottom: 32px;
      display: flex;

      .detail-name {
        width: fit-content;
        font-weight: bold;
        font-size: 30px;
        color: #1a1a1a;
      }

      .line {
        width: 4px;
        height: 30px;
        margin-right: 12px;
        background: #f5c71b;
      }
    }

    .detail-main {
      .content {
        margin-top: 32px;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .detail-main {
    padding: 40px 15px 0;

    .detail-name {
      font-weight: 900;
      font-size: 24px;
      color: #1a1a1a;
    }

    .line {
      width: 50px;
      height: 3px;
      margin-top: 12px;
      background: #f5c71b;
    }

    .content {
      margin-top: 25px;
    }
  }
}

.content a {
  color: #000;
}

.detail-content {
  max-width: 816px !important;
}

.details-pc-img {
  text-align: center;

  img {
    width: 100%;
    height: auto;
    margin: 0 auto;
    object-fit: cover;
  }
}
</style>
