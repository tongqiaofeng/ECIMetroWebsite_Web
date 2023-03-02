// 关于我们
import { post, get } from "../http";

// 职位列表
export const joinSearchPort = (p: any) => post("/join/joinSearch", p);

// 职位详情
export const joinDetailPort = (p: any) => get("/join/joinInfoGet", p);
