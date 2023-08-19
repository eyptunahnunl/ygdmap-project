import { LayersControl } from "react-leaflet";
import TileLayers from "./TileLayers";

function LayerItems({ children }) {
  return (
    <>
      <LayersControl>
        <TileLayers />

        {children}
      </LayersControl>
    </>
  );
}

export default LayerItems;
