import { defineStore } from "pinia";
import { IEquipment, ISupport } from "@/types/global";

export const useUserStore = defineStore("userStore", {
  // 数据
  state: () => {
    return {
      productTypeList: sessionStorage.getItem("product_type_list") || "",
      supportTypeList: sessionStorage.getItem("support_type_list") || "",
      systemMsg: sessionStorage.getItem("systemInfo") || "",
      routerData: sessionStorage.getItem("routerData") || [],
    };
  },
  // 计算属性
  getters: {},
  // 方法
  actions: {
    setProductType(data: IEquipment[]) {
      sessionStorage.setItem("product_type_list", JSON.stringify(data));
      this.productTypeList = JSON.parse(
        sessionStorage.getItem("product_type_list") as string
      );
    },
    setSupportType(data: ISupport) {
      sessionStorage.setItem("support_type_list", JSON.stringify(data));
      this.supportTypeList = JSON.parse(
        sessionStorage.getItem("support_type_list") as string
      );
    },
    setSystemMsg(val: any) {
      sessionStorage.setItem("systemInfo", JSON.stringify(val));
      this.systemMsg = sessionStorage.getItem("systemInfo") as string;
    },
    setRouterData(val: any) {
      sessionStorage.setItem("routerData", JSON.stringify(val));
      this.routerData = JSON.parse(
        sessionStorage.getItem("routerData") as string
      );
    },
  },
});
