import {
  GeoSearch,
  LoadWMS,
  Measurment,
} from "components/Tools";
import LayersContext from "context/LayerContext";
import { useContext, useEffect, useState } from "react";
import { AddLayerGeoJson, LayerItems } from "..";
import GeotiffLayer from "../GeoTiffLayer";
import { getRandomColor } from "utils/mapOperations";

function MapTools() {
  const { layersData } = useContext(LayersContext);
  const [featureColors, setFeatureColors] = useState({});

  useEffect(() => {
    if (layersData.length > 0) {
      const colors = {};
      layersData.data.forEach(geojson => {
        if (!colors[geojson.layerID]) {
          colors[geojson.layerID] = getRandomColor();
        }
      });
      setFeatureColors(prevColors => ({
        ...prevColors,
        ...colors,
      }));
    }
  }, []);
  return (
    <>
      <GeoSearch />
      <Measurment />
      <LayerItems>
        {layersData?.map((item, index) => {
          return (
            <AddLayerGeoJson
              key={index}
              name={item.name}
              data={item.data}
              popup={item.data.features}
              color={featureColors}
            />
          );
        })}
      </LayerItems>
      <GeotiffLayer />
      <LoadWMS />
    </>
  );
}

export default MapTools;
