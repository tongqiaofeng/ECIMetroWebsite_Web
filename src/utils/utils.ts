/**
 * 清空对象的属性值数据
 * @param {*} obj
 */
export const resetObjValues = (obj: any) => {
  if (!obj) return false;
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") {
      if (Array.isArray(obj[key])) {
        obj[key] = [];
      } else {
        obj[key] = {};
      }
    } else {
      obj[key] = null;
    }
  });
  return obj;
};

/**
 * 千分价格
 * @param {*} num
 * @returns
 */
export const formatNumberRgx = (num: string | number) => {
  if (num) {
    let parts = Number(num).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  } else {
    return 0;
  }
};

// 負數及带小数數字的獲取
export const getPriceNum = (value: string | number) => {
  console.log(value);
  if (value) {
    let reg = /(\-)?\d+[0-9]+([.]{1}[0-9]+){0,1}/g;
    let m = value.toString().replace(/,/g, "").match(reg);
    console.log(m);
    return m ? m.join("") : value;
  } else {
    return "";
  }
};

// 負數及整数数字的获取
export const getIntegerNum = (value: string | number) => {
  console.log(value);
  if (value) {
    let reg = /(\-)?\d+[0-9]+([0-9]+){0,1}/g;

    let m = value.toString().replace(/,/g, "").match(reg);
    console.log(m);
    return m ? m.join("") : value;
  } else {
    return "";
  }
};

// 当前日期
export const getDateNow = () => {
  let now = new Date();
  let year = now.getFullYear(); //得到年份
  let month = now.getMonth(); //得到月份
  let date = now.getDate(); //得到日期

  month = month + 1;
  let mon = month.toString().padStart(2, "0");
  let dat = date.toString().padStart(2, "0");
  let defaultDate = `${year}-${mon}-${dat}`; //
  return defaultDate;
};
