// sessionStorage
const _sessionStorage = {
  set: function (key: any, value: any) {
    if (!key) {
      return null;
    }
    // 复合类型转为json
    if (typeof value === "object") {
      // console.log(value)
      value = JSON.stringify(value);
    }
    sessionStorage.setItem(key, value);
  },
  get: function (key: any) {
    let value = sessionStorage.getItem(key);
    if (value && isJson(value)) {
      value = JSON.parse(value);
    }
    return value;
  },
  remove: function (key: any) {
    sessionStorage.removeItem(key);
  },
  clear: function () {
    sessionStorage.clear();
  },
};

/**
 * 验证json
 * @param {*} str
 * @returns Boolean
 */
export function isJson(str: string) {
  if (typeof str === "string") {
    try {
      let obj = JSON.parse(str);
      if (obj && typeof obj === "object") {
        return true;
      }
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}
export default _sessionStorage;
