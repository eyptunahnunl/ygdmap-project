import { useContext } from "react";
import { GeoJSON, LayersControl } from "react-leaflet";
import L from "leaflet";
import LayersContext from "context/LayerContext";

function AddLayerGeoJson({ name, data, popup, color }) {
  const { setActiveFId, activeFId, setActiveLayerID } =
    useContext(LayersContext);
  const handleOnClick = event => {
    const activeLayerId = event.layer.feature.layerID;
    const uniqueId =
      event.layer.feature.properties.uniqueId;
    if (activeFId.includes(uniqueId)) {
      setActiveFId(activeFId.filter(id => id !== uniqueId));
    } else {
      setActiveFId([...activeFId, uniqueId]);
      setActiveLayerID(activeLayerId);
    }
  };

  const featureStyle = feature => {
    return {
      fillColor: activeFId.includes(
        feature.properties.uniqueId
      )
        ? "yellow"
        : "blue",
    };
  };

  function point(feature, latlng) {
    return L.circleMarker(latlng);
  }

  return (
    <>
      <LayersControl.Overlay name={name} checked>
        <GeoJSON
          data={data}
          eventHandlers={{
            click: handleOnClick,
            // dblclick: resetStyledLayer,
          }}
          pointToLayer={(a, b) => {
            return point(a, b);
          }}
          style={featureStyle}
        ></GeoJSON>
      </LayersControl.Overlay>
    </>
  );
}

export default AddLayerGeoJson;
