import { isObject, serializeUrl } from "@/utils";
import { headerContentTypeMap, isDecryption } from "./constant";
import { cryptoDecrypt, inviteFetch, normalizeResponseData, responseStatusMap, serviceTimeout } from "./utils";

/**
 * 网络请求
 * @param {ServiceOptions} options
 */
export default function request({
  url,
  path,
  data,
  query,
  method = "GET",
  contentType = "json",
  withToken = true,
  showDialog = false,
  isDecrypt = true
}: ServiceOptions) {
  let serviceUrl = url || import.meta.env.VITE_SERVICE_URL + path;
  let body: BodyInit | null | undefined = null;
  let headers: HeadersInit | undefined = {};
  if (method === "GET") {
    data && isObject(data) && (serviceUrl = serializeUrl(serviceUrl, data));
  } else {
    query && isObject(query) && (serviceUrl = serializeUrl(serviceUrl, query));
    if (contentType === "json") {
      body = JSON.stringify(data);
    } else if (contentType === "form") {
      body = data as BodyInit | null | undefined;
    }
  }
  if (withToken) {
    headers["X-Access-Token"] = "";
  }
  headers["content-type"] = headerContentTypeMap[contentType];

  return new Promise<ServiceReturnResponse<any>>((resolve, reject) => {
    Promise.race([serviceTimeout(), inviteFetch({ url: serviceUrl, body, method, headers })])
      .then((res) => {
        if (isDecryption && isDecrypt) {
          res = cryptoDecrypt(res.result);
        }
        const resData = normalizeResponseData(res);
        if (resData._status === responseStatusMap.FAIL) {
          if (showDialog) {
            // TODO 失败弹窗提示
          }
        }
        resolve(resData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
