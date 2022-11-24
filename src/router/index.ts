import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layouts/index.vue";

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    children: [
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
          title: "产品中心",
        },
        children: [
          {
            path: "/product/grab",
            name: "Grab",
            // icon: new URL('../assets/imgs/menu-icon/index.png',
            //   import.meta.url).href,
            component: () => import("@/views/product/grab.vue"),
            meta: {
              title: "挖掘机&非挖",
              name: "grab",
            },
          },
        ],
      },
      {
        path: "/workers",
        name: "workers",
        component: () => import("@/views/workers/index.vue"),
        meta: {
          title: "山工设备",
        },
      },
      {
        path: "/store",
        name: "store",
        component: () => import("@/views/store/index.vue"),
        meta: {
          title: "在线商城",
        },
      },
      {
        path: "/support",
        name: "support",
        component: () => import("@/views/support/index.vue"),
        meta: {
          title: "支持",
        },
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "关于我们",
        },
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
            component: () => import("@/views/activity/list.vue"),
          },
          {
            path: "detail",
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
  // 路由跳转,页面回到顶部
  scrollBehavior: (to, from, savePosition) => {
    if (savePosition) {
      return savePosition;
    } else {
      return {
        top: 0,
      };
    }
  },
});

export default router;
