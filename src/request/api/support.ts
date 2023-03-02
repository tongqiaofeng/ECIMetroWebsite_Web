// 支持模块相关接口
import { post, get } from "../http";

// 支持 图文列表
export const supportListPort = () => get("/support/supportListGet");
