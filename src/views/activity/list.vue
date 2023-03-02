<template>
  <!-- <h3>活动与分享</h3> -->
  <div class="eci-main-content">
    <div v-if="cliWidth > 768">
      <img
        v-if="activeName == 1"
        src="../../assets/imgs/pc/activity/activity.jpg"
        class="top-big-img"
      />
      <img
        v-else-if="activeName == 2"
        src="../../assets/imgs/pc/activity/news.jpg"
        class="top-big-img"
      />
      <img
        v-else="activeName == 3"
        src="../../assets/imgs/pc/activity/customer.jpg"
        class="top-big-img"
      />
    </div>
    <div v-else>
      <img
        v-if="activeName == 1"
        src="../../assets/imgs/phone/activity/activity.jpg"
        class="top-big-img"
      />
      <img
        v-else-if="activeName == 2"
        src="../../assets/imgs/phone/activity/news.jpg"
        class="top-big-img"
      />
      <img
        v-else="activeName == 3"
        src="../../assets/imgs/phone/activity/customer.jpg"
        class="top-big-img"
      />
    </div>

    <van-tabs
      id="topContainer"
      class="activity-tabs-container"
      :background="'#F5F5F5'"
      :title-active-color="'#1A1A1A'"
      :title-inactive-color="'#828385'"
      color="#F5C71B"
      v-model:active="activeName"
      @click-tab="handleClick"
    >
      <van-tab
        v-for="item in typeList"
        :key="item.id"
        :title="item.typeName"
        :name="item.id"
      >
      </van-tab>
    </van-tabs>

    <div class="activity-container" v-if="activityList.length > 0">
      <el-row class="activity-main" :gutter="20" justify="start">
        <el-col
          v-for="(acti, index) in activityList"
          :key="acti.id"
          :xs="12"
          :sm="12"
          :md="8"
          :lg="8"
          :xl="8"
        >
          <router-link
            v-if="acti.source === 0"
            class="activity-every"
            :to="{ path: '/activity/detail', query: { newsId: acti.id } }"
          >
            <div class="activity-img">
              <img
                class="img"
                :src="base_request_url + '/file/' + acti.coverPhoto"
              />
            </div>
            <div class="activity-title">{{ acti.title }}</div>
            <div class="activity-btn" v-if="cliWidth > 991">阅读更多</div>
          </router-link>
          <a v-else :href="acti.content" target="_blank" class="activity-every">
            <div class="activity-img">
              <img
                class="img"
                :src="base_request_url + '/file/' + acti.coverPhoto"
              />
            </div>
            <div class="activity-title">{{ acti.title }}</div>
            <div class="activity-btn" v-if="cliWidth > 991">阅读更多</div>
          </a>
        </el-col>
      </el-row>

      <van-pagination
        v-model="page"
        :total-items="total"
        :items-per-page="6"
        force-ellipses
        @change="pageChange"
      >
        <template #prev-text>
          <van-icon name="arrow-left" />
        </template>
        <template #next-text>
          <van-icon name="arrow" />
        </template>
        <template #page="{ text }">{{ text }}</template>
      </van-pagination>
    </div>
    <div v-else>
      <van-empty description="敬请期待~" />
    </div>
  </div>

  <div class="grab-nav" v-if="cliWidth < 768">
    <Header :isShow="'otherPage'"></Header>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate, useRouter } from "vue-router";
import { IActivity } from "@/types/global";

import { base_request_url } from "@/request/http";
import { articlePort, articleTypePort } from "@/request/api/activity";

import Header from "@/layouts/header/index.vue";

const route = useRoute();
const router = useRouter();

const paramsRes = () => {
  activeName.value = Number(type.value);
  let title = "";
  for (const item of typeList.value) {
    if (item.id == activeName.value) {
      title = item.typeName;
    }
  }
  sessionStorage.setItem(
    "BreadcrumbItem",
    JSON.stringify([
      {
        path: "/activity/list",
        query: { id: activeName.value },
        name: title,
      },
    ])
  );

  getActivityList();
};

// onBeforeRouteUpdate((to: any, from: any) => {
//   console.log("路由变化", to);
//   if (to.query.id) {
//     type.value = to.query.id;
//   } else {
//     type.value = typeList.value[0].id;
//   }

//   paramsRes();
// });

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };
});

const activeName = ref();
const handleClick = (item: any) => {
  console.log("tab变化");

  page.value = 1;
  router.replace({
    path: "/activity/list",
    query: { id: item.name },
  });
};

// 获取活动列表
const activityList = ref<IActivity[]>([]);
const type = ref();
const page = ref(1);
const total = ref(0);
const getActivityList = () => {
  activityList.value = [];
  articlePort({
    keyword: "",
    page: page.value,
    pageNum: 6,
    type: type.value,
  }).then((res) => {
    console.log("活动列表", res);

    activityList.value = res.data.data.list;
    total.value = res.data.data.total;
  });
};

// 分页
const pageChange = () => {
  console.log("分页");

  getActivityList();
  (document.getElementById("topContainer") as HTMLElement).scrollIntoView({
    behavior: "smooth",
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
      router.replace({
        path: "/activity/list",
        query: {
          id: typeList.value[0].id,
        },
      });
    }

    paramsRes();
  });
};
getTypeList();
</script>

<style scoped lang="scss">
.activity-container {
  margin: 40px auto 0;

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

  .activity-main {
    margin-bottom: 60px;
  }

  .activity-every {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .activity-title {
      width: 100%;
      text-align: left;
      color: #1a1a1a;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .activity-btn {
      width: 100px;
      height: 40px;
      margin-top: 24px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      color: #1a1a1a;
      border: 1px solid #595959;
      cursor: pointer;
    }
  }

  .pagination {
    margin-top: 78px;
  }
}

@media screen and (min-width: 1200px) {
  .activity-every {
    margin-bottom: 48px;

    .activity-title {
      margin-top: 26px;
      font-size: 18px;
    }
  }
}

@media screen and (max-width: 1199px) {
  .activity-every {
    margin-bottom: 28px;

    .activity-title {
      margin-top: 16px;
      font-size: 16px;
    }
  }
}

@media screen and (min-width: 768px) {
  .activity-img {
    width: 100%;

    .img {
      width: 100%;
      height: 17vw;
    }
  }
}

@media screen and (max-width: 767px) {
  .activity-container {
    padding: 0 15px;
    margin-top: 30px;
  }

  .activity-img {
    width: 100%;

    .img {
      width: 100%;
      height: 33vw;
    }
  }
}
</style>
