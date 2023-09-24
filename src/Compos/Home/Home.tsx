import HomeLayout from "./HomeLayout";
import { Layout } from "antd";

const Home = ({user}) => {
  return (
    <>
    {/* <Header /> */}
      <HomeLayout user={user} />
    </>
  );
};

export default Home;
