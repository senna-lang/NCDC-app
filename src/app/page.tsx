import MainArea from "@/components/layouts/MainArea";
import SideBar from "@/components/layouts/SideBar";

const Home = () => {
  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-slate-300">
        <div className="flex h-full w-[1280px]">
          <div className="max-h-full w-1/4 border-r">
            <SideBar />
          </div>
          <div className="max-h-screen w-3/4">
            <MainArea />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
