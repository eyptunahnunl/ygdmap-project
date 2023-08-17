import { GeoSearch, Measurment } from 'components/Tools'
import LayersContext from 'context/LayerContext';
import { useContext } from 'react';
import { AddLayerGeoJson, LayerItems } from '..';

function MapTools() {
  const { layersData } = useContext(LayersContext);

  return (
    <>
        <GeoSearch/>
      <Measurment/>
      <LayerItems>
          {layersData?.map((item, index) => {
            return (
              <AddLayerGeoJson
                key={index}
                name={item.name}
                data={item.data}
                popup={item.data.features}
              />
            );
          })}
        </LayerItems>
    </>
  )
}

export default MapTools