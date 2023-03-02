<template>
  <div>
    <div v-if="cliWidth > 768" class="eci-main-content">
      <div class="grab-font-content">
        <div class="home-title-six"><div>搜索页面内容</div></div>
        <div class="search-input" id="searchContainer">
          <el-input
            v-model="searchKeyword"
            size="large"
            clearable
            placeholder="可输入产品、职位、活动名称搜索页面内容"
          />
          <div class="search-btn" @click="searchContent">
            <img class="img" src="../../assets/imgs/pc/common/search.png" />
            <span>搜索</span>
          </div>
        </div>
        <div>
          <div class="job-list">
            <el-table
              :data="searchList"
              style="width: 100%"
              highlight-current-row
              @current-change="handleCurrentChange"
            >
              <el-table-column align="center" prop="title" label="名称">
                <template #default="scope">
                  <div>
                    {{
                      scope.row.type == 1
                        ? scope.row.model
                        : scope.row.type == 2
                        ? scope.row.title
                        : scope.row.type == 3
                        ? scope.row.jobName
                        : ""
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="typeName" label="类别" />
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
      </div>
    </div>
    <div v-else>
      <div class="grab-font-content">
        <div class="home-title-six"><div>搜索页面内容</div></div>
        <div class="search-input" id="searchContainer">
          <van-search
            v-model="searchKeyword"
            placeholder="可输入产品、职位、活动名称搜索页面内容"
            @search="searchContent"
          />
        </div>
        <div v-if="searchList">
          <div class="job-list">
            <div
              v-for="(item, i) in searchList"
              :key="item.id"
              class="job-every"
              @click="handleCurrentChange(item)"
            >
              <van-divider
                v-if="i > 0"
                :style="{ borderColor: '#f5f5f5', padding: '14px 0' }"
              />
              <div class="search-every">
                <div>
                  <div class="name">
                    {{
                      item.type == 1
                        ? item.model
                        : item.type == 2
                        ? item.title
                        : item.type == 3
                        ? item.jobName
                        : ""
                    }}
                  </div>
                  <div class="params">
                    <div>{{ item.typeName }}</div>
                  </div>
                </div>
                <van-icon name="arrow" size="20" />
              </div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "@/layouts/header/index.vue";

import { getProductClassify } from "@/utils/utils";
import { fuzzySearchPort } from "@/request/api/common";

import _sessionStorage from "@/utils/sessionStorage";

const cliWidth = ref(document.documentElement.clientWidth);
onMounted(() => {
  window.onresize = () => {
    cliWidth.value = document.documentElement.clientWidth;
  };
});

const router = useRouter();
// 查看详情
const handleCurrentChange = async (val: any) => {
  console.log("跳转详情", val);

  let url = "";
  let params = {};
  if (val.type === 1) {
    switch (val.typeName) {
      case "机械设备":
        const { typeId } = await getProductClassify("机械设备");

        let params2 = {
          equipmentTypeId: typeId.value,
          series: "",
        };
        _sessionStorage.set("check_product_params", params2);

        url = "/product/detail";
        params = {
          productId: val.id,
          type: 1,
        };

        sessionStorage.setItem(
          "BreadcrumbItem",
          JSON.stringify([
            {
              path: "/product/grab",
              name: val.typeName,
            },
          ])
        );
        break;
      case "二手设备":
        url = "/secondHand/detail";
        params = {
          productId: val.id,
        };

        sessionStorage.setItem(
          "BreadcrumbItem",
          JSON.stringify([
            {
              path: "/secondHand/list",
              name: val.typeName,
            },
          ])
        );
        break;
      default:
        break;
    }

    const { childList } = await getProductClassify("联盟产品");
    console.log(childList.value);

    for (const item of childList.value) {
      if (item.equipmentTypeName === val.typeName) {
        const { typeId } = await getProductClassify(
          "联盟产品",
          item.equipmentTypeName
        );
        let params2 = {
          equipmentTypeId: typeId.value,
          series: "",
        };
        _sessionStorage.set("check_product_params", params2);

        url = "/product/detail";
        params = {
          name: val.typeName,
          productId: val.id,
          type: 2,
        };

        sessionStorage.setItem(
          "BreadcrumbItem",
          JSON.stringify([
            {
              path: "/alliance",
              query: {
                name: val.typeName,
              },
              name: val.typeName,
            },
          ])
        );
      }
    }
  }

  switch (val.type) {
    case 2:
      url = "/activity/detail";
      params = {
        newsId: val.id,
      };

      sessionStorage.setItem(
        "BreadcrumbItem",
        JSON.stringify([
          {
            path: "/activity/list",
            query: {
              id: val.articleTypeId,
            },
            name: val.typeName,
          },
        ])
      );
      break;
    case 3:
      url = "/about/join/detail";
      params = {
        id: val.id,
      };
      break;
    default:
      break;
  }

  router.push({
    path: url,
    query: params,
  });
};

// 模糊搜索页面内容
const searchKeyword = ref("");
const page = ref(1);
const total = ref(0);
const searchList = ref();
const searchPageContent = () => {
  fuzzySearchPort({
    keyword: searchKeyword.value,
    page: page.value,
    pageNum: 5,
  }).then((res) => {
    console.log("模糊搜索页面内容", res);
    searchList.value = res.data.data.list;
    total.value = res.data.data.total;
  });
};

const searchContent = () => {
  page.value = 1;
  searchPageContent();
};

// 分页
const pageChange = () => {
  searchPageContent();
  (document.getElementById("searchContainer") as HTMLElement).scrollIntoView({
    behavior: "smooth",
  });
};
</script>

<style scoped lang="scss">
@media screen and (min-width: 768px) {
  .home-title-six {
    margin: 63px auto 53px;
    font-weight: normal;

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
    font-weight: normal;

    div {
      padding: 9px 1px 11px 6px;
    }
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

      .search-every {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
