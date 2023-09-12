import { Suspense } from "react";

const LazyLoading: React.FC<{ Element: React.LazyExoticComponent<React.FC> }> = ({ Element }) => {
  const Loading = () => {
    return <div>加载中...</div>;
  };

  return <Suspense fallback={<Loading />}>{<Element />}</Suspense>;
};

export default LazyLoading;
