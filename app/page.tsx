import Sidebar from "./Components/Sidebar";
import AiNewsSidebar from "./Components/AiNewsSidebar";
import Navbar from "./Components/Navbar";
import Mapbox from "./Components/Mapbox/Mapbox";

export default function Home() {
  return (
    <main>
      {/* Background layer for Mapbox */}
      <div className="w-screen h-screen absolute inset-0 overflow-auto">
        <Mapbox />
      </div>
      
      {/* Foreground layer for the rest of the content */}
      <div className="relative z-10 w-full h-full flex">
        <Sidebar />
        <div className="flex-grow flex flex-col">
          <Navbar />
          <div className="flex-grow overflow-auto p-4">
            {/* Other content goes here */}
          </div>
        </div>
        <AiNewsSidebar />
      </div>
    </main>
  );
}
