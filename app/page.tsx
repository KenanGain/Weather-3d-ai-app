import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Mapbox from "./Components/Mapbox/Mapbox";


export default function Home() {
  return (
    <main >
      <div className="w-screen h-screen absolute rounded-xl">
      <Mapbox />
      </div>
      <div className="w-full h-full">
      <div className="relative mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto ">
      <Navbar />
      </div>
      </div>
      <Sidebar />
    </main>
  );
}
