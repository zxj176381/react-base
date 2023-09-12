import CryptoJS from "crypto-js";
import { PUBLIC_KEY, serviceTimer } from "./constant";

export async function inviteFetch({
  url,
  body,
  headers,
  method
}: InviteFetchOptions): Promise<ServiceReturnResponse<any>> {
  const response = await fetch(url, {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers,
    redirect: "follow",
    referrer: "no-referrer",
    body
  });
  return response.json();
}

export function serviceTimeout(): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("接口请求超时"));
    }, serviceTimer);
  });
}

export const cryptoDecrypt = (options: string) => {
  if (!options) return "";
  options = options.replace(new RegExp("_", "gm"), "=");
  const parsedOptions = CryptoJS.enc.Base64.parse(options);
  options = parsedOptions.toString(CryptoJS.enc.Utf8);
  const publicKey = CryptoJS.enc.Utf8.parse(PUBLIC_KEY);
  const decryptOptions = CryptoJS.AES.decrypt(options, publicKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  let res = CryptoJS.enc.Utf8.stringify(decryptOptions).toString();
  return JSON.parse(res);
};

export const responseStatusMap = {
  SUCCESS: 200, // 请求成功且操作成功，对应 request 方法的 success 回调。
  FAIL: 500 // 请求成功但操作失败，对应 request 方法的 success 回调。
};

export function normalizeResponseData(data: ServiceResponse<any>) {
  let _status = responseStatusMap.SUCCESS;
  const _code = data.code;
  const _msg = data.message;
  if (_code !== 200) {
    _status = responseStatusMap.FAIL;
  }
  return {
    ...data,
    _status,
    _msg
  };
}
