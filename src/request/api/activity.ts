// 活动模块相关接口
import { post, get } from "../http";

// 获取活动列表
export const articlePort = (p: any) => post("/news/articleListGet", p);

// 获取活动类型
export const articleTypePort = () => get("/news/articleTypeListGet");

// 获取活动详情
export const articleInfoPort = (p: any) => get("/news/articleInfoGet", p);
