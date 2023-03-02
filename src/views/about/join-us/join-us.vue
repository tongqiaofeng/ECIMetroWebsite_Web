<template>
  <!-- <div>加入我们</div> -->
  <div v-if="cliWidth > 768" class="eci-main-content">
    <img src="../../../assets/imgs/pc/about/join.png" class="top-big-img" />

    <div class="grab-font-content">
      <div class="home-title-six"><div>招聘职位</div></div>
      <div class="search-input" id="joinUsContainer">
        <el-input
          v-model="searchKeyword"
          size="large"
          clearable
          placeholder="搜索职位名称"
        />
        <div class="search-btn" @click="searchJob">
          <img class="img" src="../../../assets/imgs/pc/common/search.png" />
          <span>搜索职位</span>
        </div>
      </div>
      <div v-if="jobList">
        <div class="total-num">{{ total }}个职位正在招聘</div>
        <div class="job-list">
          <el-table
            :data="jobList"
            style="width: 100%"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column align="center" prop="name" label="职位名称" />
            <el-table-column
              align="center"
              prop="jobCategory"
              label="职位类别"
            />
            <el-table-column
              align="center"
              prop="workLocation"
              label="工作地点"
            />
            <el-table-column
              align="center"
              prop="createTime"
              label="发布时间"
            />
          </el-table>
        </div>
        <van-pagination
          v-model="page"
          :total-items="total"
          :items-per-page="5"
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
  </div>
  <div v-else>
    <img src="../../../assets/imgs/phone/about/join.png" class="top-big-img" />

    <div class="grab-font-content">
      <div class="home-title-six"><div>招聘职位</div></div>
      <div class="search-input" id="joinUsContainer">
        <van-search
          v-model="searchKeyword"
          placeholder="搜索职位名称"
          @search="searchJob"
        />
      </div>
      <div v-if="jobList">
        <div class="total-num">{{ total }}个职位正在招聘</div>
        <div class="job-list">
          <div
            v-for="(item, i) in jobList"
            :key="item.id"
            class="job-every"
            @click="handleCurrentChange(item)"
          >
            <van-divider
              v-if="i > 0"
              :style="{ borderColor: '#f5f5f5', padding: '14px 0' }"
            />
            <div class="name">
              {{ item.name }}
            </div>
            <div class="params">
              <div>{{ item.jobCategory }}</div>
              <div class="line"></div>
              <div>{{ item.workLocation }}</div>
            </div>
            <div class="time">{{ item.createTime }}发布</div>
          </div>
        </div>
        <van-pagination
          v-model="page"
          :total-items="total"
          :items-per-page="5"
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
    <div class="grab-nav">
      <Header :isShow="'otherPage'"></Header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "@/layouts/header/index.vue";

import { joinSearchPort } from "@/request/api/about";
import { IJob } from "@/types/global";

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };
});

const router = useRouter();
// 查看职位详情
const handleCurrentChange = (val: any) => {
  console.log("职位详情", val);

  router.push({
    path: "/about/join/detail",
    query: {
      id: val.id,
    },
  });
};

// 获取职位列表
const searchKeyword = ref("");
const page = ref(1);
const total = ref(0);
const jobList = ref<IJob[]>([]);
const getJobList = () => {
  joinSearchPort({
    keyword: searchKeyword.value,
    page: page.value,
    pageNum: 5,
    state: 0,
  }).then((res) => {
    console.log("职位列表", res);
    jobList.value = res.data.data.list;
    total.value = res.data.data.total;
  });
};
getJobList();

const searchJob = () => {
  page.value = 1;
  getJobList();
};

// 分页
const pageChange = () => {
  getJobList();
  (document.getElementById("joinUsContainer") as HTMLElement).scrollIntoView({
    behavior: "smooth",
  });
};
</script>

<style scoped lang="scss">
.home-title-six {
  background: url("../../../assets/imgs/pc/common/titleBack4.png") no-repeat;
  background-size: 100% 100%;
}

@media screen and (min-width: 768px) {
  .home-title-six {
    margin: 63px auto 53px;
    background: url("../../../assets/imgs/pc/common/titleBack4.png") no-repeat;
    background-size: 100% 100%;

    div {
      padding: 10px 5px 14px 10px;
    }
  }

  .grab-font-content {
    padding: 0 10%;

    .search-input {
      display: flex;

      .search-btn {
        width: 132px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #dea600;
        text-align: center;
        font-size: 16px;
        color: #fff;
        cursor: pointer;

        .img {
          width: 22px;
          height: 22px;
          margin-right: 6px;
        }
      }
    }

    .total-num {
      margin-top: 50px;
      font-weight: 400;
      font-size: 16px;
      color: #6c6c6c;
    }

    .job-list {
      margin-top: 60px;
      margin-bottom: 70px;
    }
  }
}

@media screen and (max-width: 767px) {
  .home-title-six {
    margin-top: 18px;
    margin-bottom: 4px;
    background: url("../../../assets/imgs/pc/common/titleBack4.png") no-repeat;
    background-size: 100% 100%;

    div {
      padding: 9px 1px 11px 6px;
    }
  }

  .total-num {
    margin-top: 24px;
    font-weight: 400;
    font-size: 12px;
    color: #6c6c6c;
  }

  .job-list {
    margin-top: 40px;
    margin-bottom: 30px;

    .job-every {
      .name {
        font-weight: 900;
        font-size: 16px;
        color: #1a1a1a;
      }

      .params {
        margin-top: 16px;
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 14px;
        color: #595959;

        .line {
          width: 1px;
          height: 14px;
          margin: 0 5px;
          background-color: #595959;
        }
      }

      .time {
        margin-top: 12px;
        font-weight: 400;
        font-size: 14px;
        color: #595959;
      }
    }
  }
}
</style>
<style lang="scss">
.search-input {
  margin-top: 25px;

  .van-search {
    padding: 0;
  }

  .el-input__wrapper {
    background-color: #f5f5f5;
    box-shadow: none;
  }

  .el-input__inner {
    color: #6c6c6c;
  }

  .el-input__prefix {
    color: #6c6c6c;
  }
}

.job-list {
  .el-table .el-table__cell {
    padding: 25px 0;
  }
}
</style>
