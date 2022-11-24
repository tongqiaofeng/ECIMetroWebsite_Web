<template>
  <div class="upload-imgs">
    <div class="add">
      <form enctype="multipart/form-data" style="width: 100px; height: 100px">
        <input
          @change="inputChange($event)"
          type="file"
          name="upload-images"
          accept="image/*"
          class="inputUpload"
          multiple
        />
        <el-icon class="addIcon"><Plus /></el-icon>
      </form>
    </div>

    <draggable
      :list="imageUrl"
      item-key="index"
      animation="300"
      style="display: flex; flex-wrap: wrap"
      @end="overImgData"
    >
      <template #item="{ element }">
        <div class="item" v-if="element">
          <div class="every-img">
            <span class="spanStyle" @click="delImage(element)">x</span>
            <el-image
              preview-teleported
              :src="base_request_url + '/file/' + element"
              style="
                width: 100px;
                height: 100px;
                border-radius: 5px;
                object-fit: cover;
              "
              :preview-src-list="imgListFilter()"
            />
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";

import { base_request_url } from "@/request/http";
import { uploadPort } from "@/request/api/api";

import draggable from "vuedraggable";

const props = defineProps({
  imgUrl: {
    required: true,
    type: Array,
    default: [],
  },
});
const imageUrl = ref<Array<string>>([]);

watch(
  () => props.imgUrl,
  (newVal: any) => {
    console.log("上传图片组件");
    console.log(newVal);

    imageUrl.value = newVal;
  },
  { deep: true, immediate: true }
);

const emit = defineEmits(["imgChange"]);

const imgListFilter = () => {
  let list = [];
  list = imageUrl.value.map((item) => {
    if (item) {
      return base_request_url + "/file/" + item;
    }
  });

  return list;
};

// 拖拽移动图片后
function overImgData(data: Array<string>) {
  console.log("拖拽后", data);
  console.log(imageUrl.value);

  emit("imgChange", {
    img: imageUrl.value.filter((el) => {
      return el != "";
    }),
  });
}

// 1、获取input上传file文件，inputChange
// 2、大于2M压缩，否则直接上传
// 压缩过程
// 1、读取文件，photoCompress2
// 2、利用canvas数据化图片进行压缩，图片转base64，canvasDataURL2
// 3、图片base64 转Blob格式/file格式，base64UrlToBlob2
// 4、上传图片，uploadLice2
// 多张图片上传
function inputChange(e: any) {
  let files = e.target.files;

  if (!files) {
    return;
  } else {
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      // 文件大于2M，进行压缩上传
      if (files[i].size / 1024 > 2050) {
        console.log("压缩");
        photoCompress2(
          files[i],
          {
            // 调用压缩图片方法
            quality: 0.7,
          },
          (base64Codes: any) => {
            let bl = base64UrlToBlob2(base64Codes);
            uploadLice2(bl); // 请求图片上传接口
          }
        );
      } else {
        // 小于等于2M 原图上传
        uploadLice2(files[i]);
      }
    }
  }
}
/*压缩图片
  读取文件
  file：文件(类型是图片格式)，
  obj：文件压缩后对象width， height， quality(0-1)
  callback：容器或者回调函数
*/
function photoCompress2(file: any, obj: any, callback: any) {
  let ready = new FileReader(); //实例化reader，读取文件内容
  ready.readAsDataURL(file); // 把目标文件转地址
  ready.onload = (event: any) => {
    // 文件读取成功
    let res = event.target.result;
    canvasDataURL2(res, obj, callback); // 开始压缩
  };
}
/* 利用canvas数据化图片进行压缩 */
/* 图片转base64 */
function canvasDataURL2(path: any, obj: any, callback: any) {
  let img: any = new Image();
  img.src = path;
  img.onload = function () {
    let that = this; // 指到img
    // 默认按比例压缩
    let w = that.width,
      h = that.height,
      scale = w / h;
    w = obj.width || w;
    h = obj.height || w / scale;
    let quality = 0.7; // 默认图片质量为0.7
    // 生成canvas
    let canvas = document.createElement("canvas");
    let ctx: any = canvas.getContext("2d");

    // 创建节点属性
    let anw = document.createAttribute("width");
    anw.nodeValue = w;
    let anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    // 铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(that, 0, 0, w, h);

    // 图像质量
    if (obj.quality && obj.quality >= 1 && obj.quality < 0) {
      quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    // 返回值是一个数据url，是base64组成的图片的源数据、可以直接赋值给图片的src属性
    let base64 = canvas.toDataURL("image/jpeg", quality);
    // 回调函数返回base64的值
    callback(base64);
  };
}
// base64 转Blob格式/file格式
function base64UrlToBlob2(urlData: any) {
  console.log("转Blob格式/file格式", urlData);

  let arr = urlData.split(",");
  let mime = arr[0].match(/:(.*?);/)[1]; // 去掉url的头，并转化为byte
  let bstr = window.atob(arr[1]); // new Buffer.from(arr[1], "base64").toString("binary"), // 处理异常,将ascii码小于0的转换为大于0
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  console.log("u8arr数据", u8arr);

  // 转blob
  // return new Blob([u8arr], {type: mime})

  // 转file
  let filename = Date.parse(new Date() + "") + ".jpg";
  /* [u8arr] 文件的內容  filename 文件的文件名/文件路徑  { type: mime } 配置對象 */
  return new File([u8arr], filename, {
    type: mime,
  });
}
// 返回file文件，调用接口执行上传
function uploadLice2(file: any) {
  uploadPort({
    file,
  }).then((res: any) => {
    ElMessage.success("图片上传成功");

    imageUrl.value.push(res.data.fileName);
    emit("imgChange", {
      img: imageUrl.value.filter((el) => {
        return el != "";
      }),
    });
  });
}
// 删除图片
function delImage(item: string) {
  console.log(item);
  for (let i = 0; i < imageUrl.value.length; i++) {
    if (imageUrl.value[i] == item) {
      console.log(i);
      imageUrl.value.splice(i, 1);
    }
  }

  console.log("删除图片", imageUrl.value);
  emit("imgChange", {
    img: imageUrl.value.filter((el) => {
      return el != "";
    }),
  });
}
</script>

<style lang="scss">
.upload-imgs {
  width: 100%;
  position: relative;
  display: flex;

  .add {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: flex;

    .addIcon {
      width: 15px;
      height: 15px;
      position: absolute;
      top: 42px;
      left: 42px;
      z-index: 1;
    }

    .inputUpload {
      position: absolute;
      display: block;
      width: 100px;
      height: 100px;
      opacity: 0;
      cursor: pointer;
      z-index: 999;
    }
  }

  .every-img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
    cursor: pointer;

    .spanStyle {
      width: 15px;
      height: 15px;
      position: absolute;
      top: 1px;
      right: 1px;
      text-align: center;
      line-height: 0.9;
      background-color: rgb(221, 221, 221);
      color: rgb(255, 255, 255);
      border: 1px solid rgb(221, 221, 221);
      border-radius: 50%;
      z-index: 999;
      cursor: pointer;
    }
  }
}
</style>
