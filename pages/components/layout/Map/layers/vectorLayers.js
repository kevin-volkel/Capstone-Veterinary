import { useContext, useEffect } from 'react';
import MapContext from '../map/mapContext';
import OLVectorLayer from 'ol/layer/Vector';

const VectorLayers = ({ source, style, zIndex = 0 }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let vectorLayers = new OLVectorLayer({
      source,
      style,
    });

    map.addLayer(vectorLayers);

    return () => {
      if (map) {
        map.addLayer.setZindex(zIndex);
      }
    };
  }, [map]);

  return null;
};

export default VectorLayers;
