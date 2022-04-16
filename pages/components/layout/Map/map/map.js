import React, { useRef, useState, useEffect } from "react";
const API_ENDPOINT = `https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.14.1/build/ol.js`;
import * as ol from "ol";

const MapContext = new React.createContext();

export const Map = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => {
      mapObject.setTarget(undefined);
    };
  }, []);

  //zoom change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setZoom(zoom);
  }, [zoom])

  //center change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setCenter(center);
  }, [center])


  return(
    <MapContext.Provider value={{map}}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  )
  
};

export const useGlobalContext = () => {
  return useContext(MapContext);
};

export default Map