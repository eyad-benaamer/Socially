import { useWindowWidth } from "hooks/useWindowWidth";

import Sidebar from "../../components/sidebar";
import { Content } from "./content";
import Bar from "components/bar";

import Following from "./following";

const Home = () => {
  const windowWidth = useWindowWidth();

  return (
    <>
      <div className="grid grid-cols-8 pt-5 pb-28 min-h-screen">
        {windowWidth >= 768 && (
          <div className="sidebar flex justify-center col-span-2">
            <Sidebar />
          </div>
        )}
        <div className="content sm:col-span-8 md:mx-0 md:col-span-6 lg:col-span-4 col-span-8">
          <div className="my-0 mx-auto">
            <Content />
          </div>
        </div>
        {windowWidth >= 768 && (
          <div className="conacts sm:col-span-3 md:col-span-3 lg:col-span-2 ">
            <Following />
          </div>
        )}
      </div>
      {windowWidth <= 768 && <Bar />}
    </>
  );
};
export default Home;
