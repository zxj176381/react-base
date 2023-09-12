export const isDecryption = import.meta.env.VITE_ENV_NAME === "production"; // 是否解密，当接口加密时使用
export const headerContentTypeMap = {
  json: "application/json",
  form: "application/x-www-form-urlencoded"
} as const;
export const serviceTimer = 60000;
export const PUBLIC_KEY = "";
