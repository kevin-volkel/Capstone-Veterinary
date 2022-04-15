import React, { useContext } from "react";
import {uesContext, useEffect} from React;
import MapContext from "../map/mapContext";
import OLTileLayer from "ol/layer/Tile"

const TileLayer = ({source, zIndex = 0}) => {
    const {map} = useContext(MapContext);
    useEffect(() => {
      if(!map) return

      let tileLayer = new OLTileLayer({
          source,
          zIndex,
      });

      map.addLayer(tileLayer);
      titleLayer.setZindex(zIndex)
    
      return () => {
        if(map) {
            map.removeLayer(tileLayer)
        }
      }
    }, [map])
    return null
}

export default TileLayer