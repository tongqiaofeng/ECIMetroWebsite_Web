// 配置路由守卫
import router from "@/router/index";
import { startNprogress, closeNprogress } from "@/utils/nprogress";

// 前置守卫
router.beforeEach((to, from, next) => {
  startNprogress();
  next();
});

// 后置守卫
router.afterEach((to, from) => {
  closeNprogress();
});
