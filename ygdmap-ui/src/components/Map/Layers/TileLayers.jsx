import LayersContext from "context/LayerContext";
import { useContext } from "react";
import {
  LayersControl,
  TileLayer,
  WMSTileLayer,
} from "react-leaflet";

function TileLayers() {
  const { wmsLayer } = useContext(LayersContext);

  return (
    <>
      <LayersControl.BaseLayer
        checked
        name="Open Street Map (OSM)"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="OSM (Black)">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
      </LayersControl.BaseLayer>
      {wmsLayer?.map((item, index) => {
        console.table(item.name, item.url, item.layer);
        return (
          <LayersControl.BaseLayer
            checked
            name={item.name}
            key={index}
          >
            <WMSTileLayer
              // layers={"AlmanMavileriOsmanlica500_1000"}
              params={{
                layers: item.layer,
                transparent: true,

                // request: "test",
              }}
              // layers={item.layer}
              url={item.url}
            />
          </LayersControl.BaseLayer>
        );
      })}
    </>
  );
}

export default TileLayers;
