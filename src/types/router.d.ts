export declare global {
  declare interface RouterConfig {
    path: string;
    element: JSX.Element;
    name: string;
    meta?: {
      title?: string;
    };
    redirect?: string;
    children?: RouterConfig[];
  }
}
