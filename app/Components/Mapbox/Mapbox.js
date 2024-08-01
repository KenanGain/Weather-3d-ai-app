// "use client";
// import React, { useEffect, useRef } from "react";
// import { useGlobalContext } from "@/app/Context/globalContext";

// function Mapbox() {
//   const { forecast } = useGlobalContext();
//   const activeCityCords = forecast?.coord;
//   const cesiumContainerRef = useRef(null);

//   useEffect(() => {
//     if (!forecast || !forecast.coord || !activeCityCords) {
//       return;
//     }

//     // Load Cesium script dynamically
//     const script = document.createElement('script');
//     script.src = 'https://cesium.com/downloads/cesiumjs/releases/1.95/Build/Cesium/Cesium.js';
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       // Enable simultaneous requests
//       Cesium.RequestScheduler.requestsByServer["tile.googleapis.com:443"] = 18;

//       // Create the viewer
//       const viewer = new Cesium.Viewer(cesiumContainerRef.current, {
//         imageryProvider: false,
//         baseLayerPicker: false,
//         homeButton: false,
//         fullscreenButton: false,
//         navigationHelpButton: false,
//         vrButton: false,
//         sceneModePicker: false,
//         geocoder: false,
//         globe: false,
//         infobox: false,
//         selectionIndicator: false,
//         timeline: false,
//         projectionPicker: false,
//         clockViewModel: null,
//         animation: false,
//         requestRenderMode: true,
//       });

//       // Add 3D Tile set
//       const tileset = viewer.scene.primitives.add(
//         new Cesium.Cesium3DTileset({
//           url: "https://tile.googleapis.com/v1/3dtiles/root.json?key=AIzaSyBKRZrdzAxGi1pc4rjk4NNApsAXrAR7dxE",
//           showCreditsOnScreen: true,
//         })
//       );

//       // Point the camera at the active city
//       const location = Cesium.Cartesian3.fromDegrees(activeCityCords.lon, activeCityCords.lat);
//       viewer.camera.flyTo({
//         destination: Cesium.Cartesian3.fromDegrees(activeCityCords.lon, activeCityCords.lat, 10000),
//         orientation: {
//           heading: Cesium.Math.toRadians(0),
//           pitch: Cesium.Math.toRadians(-45),
//           roll: 0.0
//         }
//       });

//       // Cleanup function
//       return () => {
//         if (viewer && !viewer.isDestroyed()) {
//           viewer.destroy();
//         }
//         document.body.removeChild(script);
//       };
//     };
//   }, [forecast, activeCityCords]);

//   if (!forecast || !forecast.coord || !activeCityCords) {
//     return (
//       <div>
//         <h1>Loading</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 basis-[50%] border rounded-lg">
//       <div
//         id="cesiumContainer"
//         ref={cesiumContainerRef}
//         style={{ width: "100%", height: "100%", minHeight: "400px" }}
//       ></div>
//     </div>
//   );
// }

// export default Mapbox;
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/app/Context/globalContext";

function Mapbox() {
  const { forecast } = useGlobalContext();
  const activeCityCords = forecast?.coord;
  const cesiumContainerRef = useRef(null);
  const viewerRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const apikey = process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY;

  useEffect(() => {
    if (!isScriptLoaded) {
      const script = document.createElement('script');
      script.src = 'https://cesium.com/downloads/cesiumjs/releases/1.95/Build/Cesium/Cesium.js';
      script.async = true;
      document.body.appendChild(script);
  
      script.onload = () => {
        setIsScriptLoaded(true);
      };
  
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isScriptLoaded]); // Include isScriptLoaded here

  useEffect(() => {
    if (isScriptLoaded && cesiumContainerRef.current && !viewerRef.current) {
      Cesium.RequestScheduler.requestsByServer["tile.googleapis.com:443"] = 18;
  
      viewerRef.current = new Cesium.Viewer(cesiumContainerRef.current, {
        imageryProvider: false,
        baseLayerPicker: false,
        homeButton: false,
        fullscreenButton: false,
        navigationHelpButton: false,
        vrButton: false,
        sceneModePicker: false,
        geocoder: false,
        globe: false,
        infobox: false,
        selectionIndicator: false,
        timeline: false,
        projectionPicker: false,
        clockViewModel: null,
        animation: false,
        requestRenderMode: true,
      });
  
      viewerRef.current.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: `https://tile.googleapis.com/v1/3dtiles/root.json?key=${apikey}`,
          showCreditsOnScreen: true,
        })
      );
  
      return () => {
        if (viewerRef.current && !viewerRef.current.isDestroyed()) {
          viewerRef.current.destroy();
        }
      };
    }
  }, [isScriptLoaded, apikey]); // Add apikey here

  useEffect(() => {
    if (viewerRef.current && activeCityCords) {
      viewerRef.current.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(activeCityCords.lon, activeCityCords.lat, 500),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-20),
          roll: 0.0
        },
        duration: 2  // Duration of animation in seconds
      });
    }
  }, [activeCityCords]);

  if (!forecast || !forecast.coord || !activeCityCords) {
    return <div><h1>Loading</h1></div>;
  }

  return (
    <div className="absolute">
      <div
        id="cesiumContainer"
        ref={cesiumContainerRef}
        className="w-screen h-screen"
      />
    </div>
  );
}

export default Mapbox;