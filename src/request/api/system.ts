// 系统配置相关接口
import { get } from "../http";

// 系统配置
export const websiteConfigPort = () => get("/config/websiteConfigGet");

// 小程序打开链接及APP下载地址
export const contactMsgPort = () => get("/config/contactMsgGet");
