import { Fragment } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { staticRouters } from "./routers";
import { useUserStore } from "@/store";

const Router: React.FC = () => {
  const location = useLocation();
  const isLogged = useUserStore((state) => state.isLogged);

  // 路由校验是否有权限
  const routeAuth = (route: RouterConfig): RouterConfig["element"] => {
    if (location.pathname === route.path) {
      // 设置页面 title
      document.title = route.meta?.title
        ? `${route.meta?.title} - ${import.meta.env.VITE_APP_NAME}`
        : import.meta.env.VITE_APP_NAME;
    }
    if (!isLogged && route.name !== "login") {
      // 未登录
      return <Navigate to="/login" state={{ from: location }} />;
    }
    if (isLogged && route.name === "login") {
      return <Navigate to="/home" />;
    }
    if (route.redirect && location.pathname === route.path) {
      // 判断当前路由是否有重定向地址，有的话进入重定向页面
      return <Navigate to={route.redirect} />;
    }
    return route.element;
  };
  // 循环获取路由
  const routerConfig = (routeList: RouterConfig[]): JSX.Element[] => {
    return routeList.map((route, index) => {
      return (
        <Route key={index} path={route.path ? route.path : "/"} element={routeAuth(route)}>
          {/* 递归获取路由 */}
          {route.children ? routerConfig(route.children) : <Fragment />}
        </Route>
      );
    });
  };

  return <Routes>{routerConfig(staticRouters)}</Routes>;
};

export default Router;
