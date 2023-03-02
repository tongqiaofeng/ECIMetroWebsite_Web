<template>
  <!-- <h3>工装机具</h3> -->
  <div v-if="cliWidth > 768" class="eci-main-content detail-content">
    <div class="detail-nav" @click="goBack">
      <img src="../../../assets/imgs/pc/common/left02.png" />
      返回职位列表
    </div>

    <div class="detail-top">
      <div class="name">
        {{ jobDetail?.name }}
      </div>
      <div class="other-params">
        <div>发布时间：{{ jobDetail?.createTime }}</div>
        <div class="line"></div>
        <div>工作地点：{{ jobDetail?.workLocation }}</div>
        <div class="line"></div>
        <div>学历要求：{{ jobDetail?.major }}</div>
        <div class="line"></div>
        <div>职位类别：{{ jobDetail?.jobCategory }}</div>
      </div>
    </div>

    <van-divider />

    <div class="content-title">招聘介绍</div>
    <div class="content">{{ jobDetail?.content }}</div>
  </div>
  <div v-else class="eci-main-content">
    <div class="padding-left-right">
      <div class="detail-top">
        <div class="name">
          {{ jobDetail?.name }}
        </div>
        <div class="other-params">
          <div>{{ jobDetail?.createTime }}发布</div>
          <div class="line"></div>
          <div>{{ jobDetail?.workLocation }}</div>
          <div class="line"></div>
          <div>{{ jobDetail?.major }}</div>
          <div class="line"></div>
          <div>{{ jobDetail?.jobCategory }}</div>
        </div>
      </div>

      <van-divider />

      <div class="content-title">招聘介绍</div>
      <div class="content">{{ jobDetail?.content }}</div>
    </div>

    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { base_request_url } from "@/request/http";
import { joinDetailPort } from "@/request/api/about";
import { IJob } from "@/types/global";

import Header from "@/layouts/header/index.vue";

const cliWidth = ref(document.documentElement.clientWidth);

onMounted(() => {
  // 窗口大小发生改变时,调用一次
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };
});

const router = useRouter();
// 返回职位列表
const goBack = () => {
  router.push("/about/join");
};

const route = useRoute();
// 获取职位详情
const jobDetail = ref<IJob>();
const getDetail = () => {
  joinDetailPort({
    id: route.query.id,
  }).then((res) => {
    console.log("职位详情", res);
    jobDetail.value = res.data.data;
  });
};
getDetail();
</script>

<style scoped lang="scss">
@media screen and (min-width: 768px) {
  .detail-content {
    max-width: 816px !important;
  }
  .detail-nav {
    margin-top: 36px;
    display: flex;
    align-items: center;
    color: #dea600;
    font-size: 16px;
    cursor: pointer;

    img {
      width: 10px;
      height: 14px;
      margin-right: 6px;
    }
  }

  .detail-top {
    margin-top: 60px;

    .name {
      font-size: 34px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #1a1a1a;
    }

    .other-params {
      margin-top: 24px;
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #858585;

      .line {
        width: 1px;
        height: 16px;
        margin: 0 10px;
        background-color: #858585;
      }
    }
  }

  .content-title {
    margin-top: 50px;
    font-size: 18px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #1a1a1a;
  }

  .content {
    margin-top: 16px;
    font-size: 16px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #4d4d4d;
    line-height: 32px;
  }
}

@media screen and (max-width: 767px) {
  .detail-top {
    margin-top: 30px;

    .name {
      font-size: 24px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #1a1a1a;
    }

    .other-params {
      margin-top: 16px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #858585;

      .line {
        width: 1px;
        height: 14px;
        margin: 0 10px;
        background-color: #858585;
      }
    }
  }

  .content-title {
    margin-top: 36px;
    font-size: 18px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #1a1a1a;
  }

  .content {
    margin-top: 16px;
    font-size: 14px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #4d4d4d;
    line-height: 24px;
  }
}
</style>
