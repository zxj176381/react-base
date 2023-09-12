export declare global {
  declare interface ServiceOptions {
    url?: string;
    path: string;
    data?: Record<string, any> | BodyInit | null | undefined;
    query?: Record<string, any> | null | undefined;
    method?: "GET" | "POST" | "PUT" | "OPTIONS" | "HEAD" | "DELETE" | "TRACE" | "CONNECT" | undefined;
    contentType?: "json" | "form";
    withToken?: boolean;
    showDialog?: boolean;
    isDecrypt?: boolean;
  }
  declare interface InviteFetchOptions {
    url: string;
    body: BodyInit | null | undefined;
    method: ServiceOptions["method"];
    headers: HeadersInit | undefined;
  }
  declare interface ServiceResponse<R> {
    code: number;
    message: string;
    success: boolean;
    timestamp: number;
    result: T;
  }
  declare interface ServiceReturnResponse<R> extends ServiceResponse<R> {
    _status: number;
    _msg: string;
  }
  declare type ServicePromise<R> = Promise<ServiceReturnResponse<R>>;
  type Service1<R> = () => ServicePromise<R>;
  type Service2<R, D> = (data: D) => ServicePromise<R>;
  type Service3<R, D, Q> = (data: D, query: Q) => ServicePromise<R>;
  declare type Service<R, D = null, Q = null> = D extends null
    ? Service1<R>
    : Q extends null
    ? Service2<R, D>
    : Service3<R, D, Q>;
  declare interface ServiceListResult<R> {
    countId: number | null;
    current: number;
    maxLimit: number | null;
    optimizeCountSql: boolean;
    orders: [];
    pages: number;
    records: R;
    searchCount: boolean;
    size: number;
    total: number;
  }
  declare type ServiceRecordPromise<R> = Promise<ServiceReturnResponse<ServiceListResult<R>>>;
  type ServiceRecord1<R> = () => ServiceRecordPromise<R>;
  type ServiceRecord2<R, D> = (data: D) => ServiceRecordPromise<R>;
  type ServiceRecord3<R, D, Q> = (data: D, query: Q) => ServiceRecordPromise<R>;
  declare type ServiceRecord<R, D = null, Q = null> = D extends null
    ? ServiceRecord1<R>
    : Q extends null
    ? ServiceRecord2<R, D>
    : ServiceRecord3<R, D, Q>;
}
