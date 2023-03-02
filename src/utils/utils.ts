/**
 * 千分价格
 * @param {*} num
 * @returns
 */
export const formatNumberRgx = (num: string | number) => {
  if (num) {
    let parts = Number(num).toFixed(0).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  } else {
    return 0;
  }
};

// 当前日期
export const getDateNow = (time?: any) => {
  let now = time ? new Date(time) : new Date();
  let year = now.getFullYear(); //得到年份
  let month = now.getMonth(); //得到月份
  let date = now.getDate(); //得到日期

  month = month + 1;
  let mon = month.toString().padStart(2, "0");
  let dat = date.toString().padStart(2, "0");
  let defaultDate = `${year}-${mon}-${dat}`; //
  return defaultDate;
};

import { ref } from "vue";
import { base_request_url } from "@/request/http";
import { equipmentTypePort } from "@/request/api/product";

import pinia from "../store/store";
import { useUserStore } from "../store/userStore";

const userStore = useUserStore(pinia); // 这里一定要把 pinia传入进去
console.log(userStore);

// 获取 产品分类 图文信息
export const getProductClassify = async (
  val: string,
  child?: string,
  gs?: string
) => {
  if (!userStore.productTypeList) {
    // 获取产品分类列表
    await equipmentTypePort().then((res) => {
      console.log("产品分类----------", res);

      userStore.setProductType(res.data.data);
    });
  }

  console.log("产品分类列表111111111", userStore.productTypeList);
  let list: any = userStore.productTypeList;

  const grabId = ref(null);
  const grabContent = ref("");
  const imgClassifyUrl = ref("");
  const imgClassifyPhoneUrl = ref("");
  const imgClassifySmallUrl = ref("");
  const typeId = ref(null);
  const childList: any = ref([]);

  for (const item of list) {
    if (item.equipmentTypeName == val) {
      console.log(item);
      grabId.value = item.id;

      if (child) {
        for (const chl of item.children) {
          if (chl.equipmentTypeName == child) {
            if (gs) {
              for (const son of chl.children) {
                if (son.equipmentTypeName == gs) {
                  grabContent.value = son.content;
                  imgClassifyUrl.value = son.imgPc;
                  imgClassifyPhoneUrl.value = son.imgMobile;
                  imgClassifySmallUrl.value = son.imgSort;

                  typeId.value = son.id;
                }
              }
            } else {
              grabId.value = chl.id;
              grabContent.value = chl.content;
              imgClassifyUrl.value = chl.imgPc;
              imgClassifyPhoneUrl.value = chl.imgMobile;
              imgClassifySmallUrl.value = chl.imgSort;
              childList.value = chl.children;

              typeId.value = chl.id;
            }
          }
        }
      } else {
        grabContent.value = item.content;
        imgClassifyUrl.value = item.imgPc;
        imgClassifyPhoneUrl.value = item.imgMobile;
        imgClassifySmallUrl.value = item.imgSort;
        childList.value = item.children;

        typeId.value = item.id;
      }

      if (grabContent.value) {
        grabContent.value = grabContent.value.replaceAll(
          "/_file_/",
          base_request_url + "/file/"
        );
      }
    }
  }

  return {
    grabId,
    grabContent,
    imgClassifyUrl,
    imgClassifyPhoneUrl,
    imgClassifySmallUrl,
    typeId,
    childList,
  };
};

import { supportListPort } from "@/request/api/support";
// 获取 支持分类 图文信息
export const getSupportClassify = async (
  val: string,
  child?: string,
  gs?: string,
  nextgs?: string
) => {
  console.log(
    "支持分类列表111111111",
    typeof userStore.supportTypeList,
    userStore.supportTypeList
  );

  if (!userStore.supportTypeList) {
    // 获取支持分类列表
    await supportListPort().then((res) => {
      console.log("支持分类----------", res);

      userStore.setSupportType(res.data.data);
    });
  }

  let typeList: any = userStore.supportTypeList;

  const supportContent = ref("");
  const imgSuUrl = ref("");
  const imgSuPhoneUrl = ref("");
  const videoSu = ref("");
  const typeSuId = ref();
  const childSuList: any = ref([]);

  if (child) {
    for (const chl of typeList.children) {
      if (chl.title == child) {
        if (gs) {
          for (const son of chl.children) {
            if (son.title == gs) {
              if (nextgs) {
                for (const next of son.children) {
                  if (next.title == nextgs) {
                    supportContent.value = next.content;
                    imgSuUrl.value = next.imgPc;
                    imgSuPhoneUrl.value = next.imgMobile;
                    childSuList.value = next.children;
                    videoSu.value = next.video;
                    typeSuId.value = next.id;
                  }
                }
              } else {
                supportContent.value = son.content;
                imgSuUrl.value = son.imgPc;
                imgSuPhoneUrl.value = son.imgMobile;
                childSuList.value = son.children;
                videoSu.value = son.video;
                typeSuId.value = son.id;
              }
            }
          }
        } else {
          supportContent.value = chl.content;
          imgSuUrl.value = chl.imgPc;
          imgSuPhoneUrl.value = chl.imgMobile;
          childSuList.value = chl.children;
          videoSu.value = chl.video;
          typeSuId.value = chl.id;
        }
      }
    }
  } else {
    supportContent.value = typeList.content;
    imgSuUrl.value = typeList.imgPc;
    imgSuPhoneUrl.value = typeList.imgMobile;
    childSuList.value = typeList.children;
    typeSuId.value = typeList.id;
  }

  if (supportContent.value) {
    supportContent.value = supportContent.value.replaceAll(
      "/_file_/",
      base_request_url + "/file/"
    );

    supportContent.value = supportContent.value.replaceAll(
      "<video",
      `<video webkit-playsinline="true" playsinline="true" x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint" style="object-fit: fill"`
    );
  }

  return {
    supportContent,
    imgSuUrl,
    imgSuPhoneUrl,
    videoSu,
    typeSuId,
    childSuList,
  };
};
