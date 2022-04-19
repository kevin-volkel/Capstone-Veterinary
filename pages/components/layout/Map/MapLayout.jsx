// import React, { useState } from "react";
// import Map from "./map/map.js";
// import { layers, TileLayer, VectorLayer } from "./layers/LIndex.js";
// import { Controls, FullScreenControl } from "./controls/cIndex.js";
// import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
// import { osm, vector } from "./source/sIndex.js";
// import { fromLonLat, get } from "ol/proj";
// import GeoJSON from "ol/format/GeoJSON";
// import vectorLayers from "./layers/vectorLayers.js";

// let styles = {
//   MultiPolygon: new Style({
//     stroke: new Stroke({
//       color: "blue",
//       width: 1,
//     }),
//     fill: new Fill({
//       color: "rgb(0, 0, 255, 0.1",
//     }),
//   }),
// };

// import mapConfig from "./config.json";

// const geojsonObject = mapConfig.geojsonObject;
// const geojsonObject2 = mapConfig.geojsonObject2;

// const MapLayout = () => {
//   const [center, setCenter] = useState([-112.292839, 33.535941]);
//   const [zoom, setZoom] = useState(9);
//   const [showLayer1, setShowLayer1] = useState(true);
//   const [showLayer2, setShowLayer2] = useState(true);

//   return (
//     <div>
//       <Map center={fromLonLat(center)} zoom={zoom}>
//          <layers> 
//           <TileLayer
//             source={osm}
//             zIndex={0}
//             />
// {/* 
//              {showLayer1 && (
//               <VectorLayer
//                 // source={vector({ features: new GeoJSON().readFeatures(geojsonObject, {featureProjection: get('ESPG:3857')} )})}
//                 // style={styles.MultiPolygon}
//               />
//             )} */}

//               {/*
//             {showLayer2 && (
//               <VectorLayer
//               source={vector({ features: new GeoJSON().readFeatures(geojsonObject2, {featureProjection: get('ESPG:3857')} )})}
//               style={styles.MultiPolygon}
//               />
//             )} */}
//         </layers>

//         {/* <Controls>
//           <FullScreenControl />
//         </Controls> */}
//       </Map>
//     </div>
//   );
// };

// export default MapLayout;
