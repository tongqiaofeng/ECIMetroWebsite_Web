import { defineStore } from "pinia";
import _sessionStorage from "../utils/sessionStorage";

export const useUserStore = defineStore("userStore", {
  // 数据
  state: () => {
    return {
      token:
        _sessionStorage.get("token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrIjoiYWRtaW4iLCJpZCI6MSwidXNlciI6ImFkbWluIn0.9Dfs9QCsYkZjcn6BDb6TMRr_T8qDpd2VnqNId55aoUk",
      adminInfo: _sessionStorage.get("admin_info") || {},
    };
  },
  // 计算属性
  getters: {},
  // 方法
  actions: {
    setToken(token: string) {
      this.token = token;
      _sessionStorage.set("token", token);
    },
    setAdminInfo(data: object) {
      this.adminInfo = data;
      _sessionStorage.set("admin_info", data);
    },
    loginout() {
      this.adminInfo = {};
      this.token = "";
      _sessionStorage.remove("admin_info");
      _sessionStorage.remove("token");
    },
  },
});
