import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layouts/index.vue";

type RouteConfig = RouteRecordRaw & { hidden?: boolean };
const constantRoutes: Array<RouteConfig> = [
  {
    path: "/",
    name: "mainHome",
    component: Layout,
    children: [
      {
        path: "/:cathchAll(.*)",
        name: "404",
        component: () => import("@/views/404.vue"),
        meta: {
          title: "404",
          isShow: "false",
        },
      },
      {
        path: "/search",
        name: "search",
        component: () => import("@/views/home/search.vue"),
        meta: {
          title: "搜索",
          isShow: "false",
        },
      },
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/product",
        meta: {
          title: "Cat®(卡特)设备",
        },
        children: [
          {
            path: "detail",
            name: "detail",
            component: () => import("@/views/product/detail.vue"),
          },
          {
            path: "720URL",
            name: "720URL",
            component: () => import("@/views/product/720Url.vue"),
          },
          {
            path: "comparison",
            name: "comparison",
            component: () => import("@/views/product/comparison.vue"),
          },
          {
            path: "workTools",
            name: "workTools",
            component: () => import("@/views/product/workTools.vue"),
          },
          {
            path: "/product/grab",
            name: "Grab",
            component: () => import("@/views/product/grab/grab.vue"),
            meta: {
              title: "机械设备",
              name: "grab",
            },
          },
          {
            path: "/product/power/classify",
            name: "classify",
            component: () => import("@/views/product/power/classify.vue"),
          },
          {
            path: "/product/power/electricity",
            name: "electricity",
            component: () => import("@/views/product/power/electricity.vue"),
          },
          {
            path: "/product/power/electricity/classify",
            name: "classifyElectricity",
            component: () => import("@/views/product/power/elec-classify.vue"),
          },
          {
            path: "/product/power",
            name: "Power",
            component: () => import("@/views/product/power/power.vue"),
            meta: {
              title: "动力设备",
            },
          },
          {
            path: "/product/mine/classify",
            name: "mineClassify",
            component: () => import("@/views/product/mine/classify.vue"),
          },
          {
            path: "/product/mine/detail",
            name: "mineDetail",
            component: () => import("@/views/product/mine/detail.vue"),
          },
          {
            path: "/product/mine/calculator",
            name: "calc",
            component: () => import("@/views/product/mine/calculator.vue"),
          },
          {
            path: "/product/mine",
            name: "Mine",
            component: () => import("@/views/product/mine/mine.vue"),
            meta: {
              title: "矿山设备",
            },
          },
          {
            path: "",
            name: "peijian",
            component: () => import("@/views/store/index.vue"),
            meta: {
              title: "工装及配件",
            },
          },
        ],
      },
      {
        path: "/alliance",
        name: "allianceFather",
        meta: {
          title: "联盟产品",
        },
        children: [],
      },
      {
        path: "",
        component: () => import("@/views/store/index.vue"),
        meta: {
          title: "在线商城",
        },
        children: [
          {
            path: "",
            name: "cat",
            component: () => import("@/views/store/index.vue"),
            meta: {
              title: "整机商城",
            },
          },
          {
            path: "",
            name: "peijian",
            component: () => import("@/views/store/index.vue"),
            meta: {
              title: "零件商城",
            },
          },
        ],
      },
      {
        path: "/secondHand",
        name: "SecondHand",
        component: () => import("@/views/second-hand/index.vue"),
        redirect: "/secondHand/list",
        meta: {
          title: "二手设备",
          childShow: "否",
        },
        children: [
          {
            path: "list",
            name: "secondList",
            component: () => import("@/views/second-hand/second-hand.vue"),
          },
          {
            path: "/secondHand/detail",
            name: "secondDetail",
            component: () => import("@/views/second-hand/detail.vue"),
          },
        ],
      },
      {
        path: "/lease",
        name: "Lease",
        component: () => import("@/views/lease/lease.vue"),
        meta: {
          title: "租赁业务",
        },
      },
      {
        path: "/support",
        name: "support",
        component: () => import("@/views/support/index.vue"),
        redirect: "/support",
        meta: {
          title: "支持",
          childShow: "否",
        },
        children: [
          {
            path: "/support",
            name: "support",
            component: () => import("@/views/support/support.vue"),
          },
          {
            path: "bcp",
            name: "bcp",
            component: () => import("@/views/support/bcp-maintain.vue"),
          },
          {
            path: "map",
            name: "map",
            component: () => import("@/views/support/map.vue"),
          },

          {
            path: "excavator",
            name: "excavator",
            component: () => import("@/views/support/new-excavator.vue"),
          },
          {
            path: "fileDetail",
            name: "fileDetail",
            component: () => import("@/views/support/fileDetail.vue"),
          },
          {
            path: "maintain",
            name: "maintain",
            component: () => import("@/views/support/maintain/maintain.vue"),
          },

          {
            path: "commonSense",
            name: "commonSense",
            component: () =>
              import("@/views/support/maintain/common-sense.vue"),
          },

          {
            path: "resource",
            name: "resource",
            component: () => import("@/views/support/maintain/resource.vue"),
          },
        ],
      },
      {
        path: "/about",
        meta: {
          title: "关于我们",
        },
        children: [
          {
            path: "/about/company",
            name: "CompanyIntro",
            component: () =>
              import("@/views/about/company-intro/company-intro.vue"),
            meta: {
              title: "公司介绍",
            },
          },
          {
            path: "/about/culture",
            name: "Culture",
            component: () => import("@/views/about/culture/culture.vue"),
            meta: {
              title: "企业文化",
            },
          },
          {
            path: "/about/join",
            name: "JoinUs",
            component: () => import("@/views/about/join-us/join-us.vue"),
            meta: {
              title: "加入我们",
            },
          },
          {
            path: "/about/join/detail",
            name: "JobDetail",
            component: () => import("@/views/about/join-us/job-detail.vue"),
          },
          {
            path: "/about/statement",
            name: "Statement",
            component: () => import("@/views/about/statement.vue"),
          },
        ],
      },
      {
        path: "/activity",
        component: () => import("@/views/activity/index.vue"),
        redirect: "/activity/list",
        meta: {
          title: "活动与分享",
          childShow: "否",
        },
        children: [
          {
            path: "list",
            name: "list",
            component: () => import("@/views/activity/list.vue"),
          },
          {
            path: "detail",
            name: "newsDetail",
            component: () => import("@/views/activity/details.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

export default router;
