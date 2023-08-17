import { useContext, useEffect, useState } from "react";
import {
  GeoJSON,
  LayersControl,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import LayersContext from 'context/LayerContext';
function AddLayerGeoJson({ name, data, popup }) {
  //   const [popupValue, setPopupValue] = useState([]);

  const [popupData, setPopupData] = useState([]);
  const {
    acitveFId,
    setActiveFId,
    layersData,
    setActiveLayer,
  } = useContext(LayersContext);

  
  function popUp(f) {
    var out = [];
    console.log(f);
    if (f.properties) {
      for (var key in f.properties) {
        out.push(key + ": " + f.properties[key]);
      }
      setPopupData(out);
    }
  }
  const highlightFeature = e => {
    var layer = e.target;
    layer.setStyle({
      weight: 1,
      color: "yellow",
      fillOpacity: 0.4,
    });
  };

  const style = feature => {
    return {
      fillColor: null,
      weight: 3,
      stroke: true,
      dashOffset: null,
      color: "#3388ff",
      dashArray: null,
      fillOpacity: 0.2,
    };
  };
  const resetHighlight = e => {
    e.target.setStyle(style(e.target.feature));
  };
  const activeFeatureHandle = e => {
    const filter = layersData.filter(
      item => e.target.feature.layerID === item.layerID
    );
    setActiveLayer(filter[0].data);
    console.log("filterdata sfafsa ", filter[0].data);
    console.log("fitre", e.target.feature.layerID);
    setActiveFId(e.target.feature.F_ID);
  };

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: activeFeatureHandle,
    });
  }
  function point(feature, latlng) {
    return L.circleMarker(latlng);
  }
  return (
    <LayersControl.Overlay name={name} checked>
      <GeoJSON
        data={data}
        eventHandlers={{
          click: e => {
            // console.log("event", e);
            // e.sourceTarget.options.color = onselect;
          },
        }}
        onEachFeature={onEachFeature}
        pointToLayer={(a, b) => {
          return point(a, b);
        }}
      >
        {/* <Popup>
          <div>
            <div></div>
            {getProperties(popup.properties)}
          </div>
        </Popup> */}
      </GeoJSON>
    </LayersControl.Overlay>
  );
}

export default AddLayerGeoJson;
