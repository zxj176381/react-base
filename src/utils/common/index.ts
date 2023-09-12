export const isObject = (value: unknown): value is Record<any, any> => value !== null && typeof value === "object";
export const isFunction = (value: unknown): value is Function => typeof value === "function";
export const isString = (value: unknown): value is string => typeof value === "string";
export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";
export const isNumber = (value: unknown): value is number => typeof value === "number";
export const isUndef = (value: unknown): value is undefined => typeof value === "undefined";
export const isArray = (value: unknown): value is [] => Array.isArray(value);

/**
 * 判断是否是空对象
 * @param {Record<string, any>} obj
 * @return {Boolean}
 */
function isEmptyObject(obj: Record<string, any>): boolean {
  if (obj === null || typeof obj !== "object") {
    return true;
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

/**
 * 序列化地址信息
 * @param {String} url 地址信息
 * @param {Object} [params={}] 参数信息
 * @return {String} 拼接完成后的完整地址
 */
const invalidQueryValues = ["undefined", "null", ""];
export function serializeUrl<T extends Record<string, any>>(url: string, params: T): string {
  if (!isEmptyObject(params)) {
    let queryString = "";
    if (!url.match(/\?/)) {
      queryString += "?";
    }
    for (const key in params) {
      const value = params[key];
      if (~invalidQueryValues.indexOf(value + "")) {
        continue;
      }
      queryString += `&${key}=${value}`;
    }
    url = url + queryString;
    url = url.replace(/\?&/, "?").replace(/\?$/, "");
  }
  return url;
}
