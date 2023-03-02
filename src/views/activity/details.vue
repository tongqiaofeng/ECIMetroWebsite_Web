<template>
  <!-- <div>活动详情</div> -->
  <Detail
    :detail-name="activityInfo.title"
    :detail-content="activityInfo.content"
  ></Detail>
</template>

<script setup lang="ts">
import { base_request_url } from "@/request/http";
import { articleInfoPort } from "@/request/api/activity";
import { IActivity } from "@/types/global";

import { ref, nextTick } from "vue";
import { useRoute } from "vue-router";

import Detail from "@/components/detail.vue";

const route = useRoute();

// 获取活动详情
const activityInfo = ref<IActivity>({
  // content: "<div>我是测试活动的内容</div>",
  content: "https://element-plus.gitee.io/zh-CN",
  coverPhoto: "",
  id: 1,
  source: 0,
  title: "测试111",
  type: 1,
});
const getActivityInfo = () => {
  let id = route.query.newsId;
  articleInfoPort({
    id,
  }).then((res) => {
    console.log("活动详情", res);
    activityInfo.value = res.data.data;

    // 替换文章内 图片路径 为图片访问路径
    activityInfo.value.content = activityInfo.value.content.replaceAll(
      "/_file_/",
      base_request_url + "/file/"
    );

    nextTick(() => {
      // 设置文章内 视频 居中显示
      let htmlList = document.querySelectorAll("div[data-w-e-type = 'video']");
      for (const index in htmlList) {
        if (typeof htmlList[index] == "object") {
          htmlList[index].setAttribute("style", "text-align: center");
        }
      }
    });
  });
};
getActivityInfo();
</script>
