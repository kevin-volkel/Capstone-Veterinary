import React, { useContext, useEffect } from "react";
import MapContext from "../map/mapContext";
import OLTileLayer from "ol/layer/Tile";

const TileLayer = ({ source, zIndex = 0 }) => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;

    let tileLayer = new OLTileLayer({
      source,
      zIndex,
    });

    map.addLayer(tileLayer);
    titleLayer.setZindex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map]);

};



export default TileLayer;
