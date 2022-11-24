<template>
  <div class="activity-container">
    <h3>活动与分享</h3>
    <div class="activity-type">
      <el-row :gutter="10" justify="center">
        <el-col
          v-for="item in typeList"
          :key="item.id"
          :xs="24"
          :sm="12"
          :md="4"
          :lg="4"
          :xl="4"
        >
          <router-link
            :to="{ path: '/activity/list', query: { id: item.id } }"
            class="type-every"
            :activeClass="route.query.id == item.id + '' ? 'typeActive' : ''"
            >{{ item.typeName }}</router-link
          >
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20" justify="start">
      <el-col
        v-for="(acti, index) in activityList"
        :key="acti.id"
        :xs="24"
        :sm="12"
        :md="6"
        :lg="6"
        :xl="6"
      >
        <router-link
          class="activity-every"
          @click="checkDetail(acti.id)"
          :to="{ path: '/activity/detail', query: { newsId: acti.id } }"
        >
          <div class="activity-img">
            <img
              class="img"
              :src="base_request_url + '/file/' + acti.coverPhoto"
            />
          </div>
          <div class="activity-title">{{ acti.title }}</div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { base_request_url } from "@/request/http";
import { articlePort, articleTypePort } from "@/request/api/activity";

import { ref, nextTick } from "vue";
import { useRoute, onBeforeRouteUpdate, useRouter } from "vue-router";
import { IActivity } from "@/types/global";

const route = useRoute();
const router = useRouter();

onBeforeRouteUpdate((to: any) => {
  console.log("路由变化", to);
  if (to.path == "/activity/list") {
    type.value = to.query.id;

    getActivityList();
  }
});

// 去查看活动详情
const checkDetail = (id: number) => {
  console.log(id);
};

// 获取活动列表
const activityList = ref<IActivity[]>([]);
const type = ref();
const getActivityList = () => {
  articlePort({
    keyword: "",
    page: 1,
    pageNum: 10,
    type: type.value,
  }).then((res) => {
    console.log("活动列表", res);

    activityList.value = res.data.data.list;
  });
};

// 获取活动分类
interface IType {
  id: number;
  typeName: string;
}
const typeList = ref<IType[]>([]);
const getTypeList = () => {
  articleTypePort().then((res) => {
    console.log("活动分类", res);
    typeList.value = res.data.data;

    if (route.query.id) {
      type.value = route.query.id;
    } else {
      router.push({
        path: "/activity/list",
        query: {
          id: typeList.value[0].id,
        },
      });
    }

    getActivityList();
  });
};
getTypeList();
</script>

<style scoped lang="scss">
.activity-container {
  margin: 0 auto;

  .activity-type {
    margin-bottom: 30px;

    .type-every {
      width: 100%;
      height: 40px;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      background-color: rgb(26, 69, 54);
      color: #fff;
    }

    .typeActive {
      background-color: orange;
    }
  }

  .activity-every {
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .activity-img {
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;

      .img {
        // width: 294px;
        // height: 193px;
        width: 100%;
        display: flex;
        align-items: center;
        aspect-ratio: auto 294/193;
      }
    }

    .activity-title {
      text-align: center;
      color: #000;
    }
  }
}

@media screen and (min-width: 1200px) {
  .activity-container {
    width: 80%;
    .activity-title {
      margin-top: 10px;
      font-size: 16px;
    }
  }
}

@media screen and (min-width: 1200px) and (max-width: 1499px) {
  .activity-container {
    width: 85%;

    .activity-title {
      margin-top: 10px;
      font-size: 16px;
    }
  }
}

@media screen and (max-width: 1199px) {
  .activity-container {
    width: 90%;

    .activity-title {
      margin-top: 6px;
      font-size: 13px;
    }
  }
}
</style>
