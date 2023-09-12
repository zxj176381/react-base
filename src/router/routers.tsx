import { lazy } from "react";
import LazyLoading from "./lazyLoading";

export const staticRouters: RouterConfig[] = [
  {
    path: "/",
    redirect: "/home",
    name: "layout",
    element: <LazyLoading Element={lazy(() => import("@/pages/Layout"))} />,
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页"
        },
        element: <LazyLoading Element={lazy(() => import("@/pages/Home"))} />
      },
      {
        path: "/list",
        name: "list",
        meta: {
          title: "列表页"
        },
        element: <LazyLoading Element={lazy(() => import("@/pages/List"))} />
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录"
    },
    element: <LazyLoading Element={lazy(() => import("@/pages/Login"))} />
  }
];
