// 产品模块相关接口
import { post, get } from "../http";

// 获取产品分类列表
export const equipmentTypePort = () =>
  get("/product_type/equipmentTypeListGet");

// 机械设备
// 按需求查看  分类列表
export const allDemandequipmentTypePort = (p: any) =>
  get("/product/allDemandGet", p);

// 系列列表
export const seriesPort = (p: any) => get("/product/seriesListGet", p);

// 产品列表-(机械设备,山工机械,二手设备)
export const productSearchPort = (p: any) => post("/product/productSearch", p);

// 产品详情
export const productInfoPort = (p: any) => get("/product/productInfoGet", p);

// 二手设备 所在地
export const recycleAreaPort = () => get("/product/recycleAreaListGet");

// 工装机具
export const toolInfoPort = (p: any) => get("/tool/toolInfoGet", p);

// 设备租赁
export const leaseAddPort = (p: any) => post("join/leaseAdd", p);

// 型号列表
export const modelListPort = () => get("/product/modelListGet");
