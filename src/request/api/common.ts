// 系统配置相关接口
import { get } from "../http";

// 模糊搜索页面内容
export const fuzzySearchPort = (p: any) => get("/product/fuzzySearch", p);
