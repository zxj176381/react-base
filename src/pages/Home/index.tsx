import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const navigateToList = () => {
    navigate("/list");
  };
  return (
    <div>
      <div>首页</div>
      <div onClick={navigateToList}>跳转列表页</div>
    </div>
  );
};

export default Home;
