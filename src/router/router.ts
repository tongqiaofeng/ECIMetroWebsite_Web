// 配置路由守卫
import router from "@/router/index";
import { startNprogress, closeNprogress } from "@/utils/nprogress";

import pinia from "../store/store";
import { useUserStore } from "../store/userStore";

import { getProductClassify } from "@/utils/utils";

const userStore = useUserStore(pinia); // 这里一定要把 pinia传入进去
console.log(userStore);

// 前置守卫
let isF = false; //这个是用于判断动态路由是否已经被获取
router.beforeEach(async (to, from, next) => {
  console.log(to, from.path);
  startNprogress();

  // console.log("4444444444----------", userStore.routerData);

  if (isF) {
    next();
  } else {
    const { childList } = await getProductClassify("联盟产品");
    console.log(childList.value);

    let data = {
      path: "/alliance",
      name: "allianceFather",
      meta: {
        title: "联盟产品",
      },
      children: [] as any,
    };

    let allianceList = [];
    for (const item of childList.value) {
      allianceList.push({
        path: "/alliance",
        name: "alliance" + item.id,
        component: () => import("@/views/workers/index.vue"),
        meta: {
          title: item.equipmentTypeName,
          isDynamic: true,
        },
      });
    }

    data.children = allianceList;

    // 获取当前默认路由
    const currenRoutes: any = router.options.routes;
    console.log("6666666666666", currenRoutes);

    allianceList.forEach((item: any) => {
      // has用于判断当前路由中是否已经具有，避免重复
      const has = currenRoutes[0].children[4].children.some(
        (it: any) => it.name == item.name
      );
      if (!has) {
        currenRoutes[0].children[4] = data;

        router.addRoute("mainHome", data);
      }
    });

    // 将新生成的路由保存到vuex中
    userStore.setRouterData(currenRoutes);
    console.log("222222222222244444444", currenRoutes);

    // 更改控制生成路由次数的值
    isF = true;
    // 跳转
    //确保addRoute()时动态添加的路由已经被完全加载上去，不然刷新页面可能会导致空白
    // next({ ...to, replace: true });
    next({
      path: `${to.path}`,
      query: to.query,
    });
  }
});

// 后置守卫
router.afterEach((to, from) => {
  closeNprogress();
});
