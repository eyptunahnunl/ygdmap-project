import { useContext, useEffect, useState } from "react";
import {
  GeoJSON,
  LayersControl,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import LayersContext from "context/LayerContext";

function AddLayerGeoJson({ name, data, popup, color }) {
  //   const [popupValue, setPopupValue] = useState([]);

  // const [activeFId, setSelectedIds] = useState([]);
  const {
    setActiveFId,
    layersData,
    activeFId,
    setActiveLayer,
    setActiveLayerID,
  } = useContext(LayersContext);

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
    // e.target.setStyle(style(e.target.feature));
    //  e.target.feature.reset(this)
    // console.log("reset higlight", e.target);
    this.refs.geojson.resetStyle(e.target);
  };
  const activeFeatureHandle = e => {
    console.log(e);
    const filter = layersData.filter(
      item => e.target.feature.layerID === item.layerID
    );
    // console.log("filter",filter)
    setActiveLayer(filter[0].data);
    setActiveFId(e.target.feature.properties.F_ID);

    e.target.setStyle({
      weight: 1,
      color: "yellow",
      fillOpacity: 0.4,
    });
  };

  function styleChanged(e) {
    e.sourceTarget.setStyle({
      weight: 1,
      color: "yellow",
      fillOpacity: 0.4,
    });
    setActiveLayerID(e.layer.feature.layerID);
    console.log(e);
  }

  function resetStyledLayer(e) {
    e.target.resetStyle();
  }

  // function onEachFeature(feature, layer) {
  //   var defaultStyle = layer.style,
  //     that = this; //NEW

  //   layer.on("onclick", function (e) {
  //     this.setStyle({
  //       color: "#2262CC",
  //       weight: 3,
  //       opacity: 0.6,
  //       fillOpacity: 0.65,
  //       fillColor: "#2262CC",
  //     });
  //   });

  // }

  const handleOnClick = event => {
    const clickedFeatureId =
      event.layer.feature.properties.F_ID;
    const activeLayerId = event.layer.feature.layerID;
    console.log("event", clickedFeatureId);
    // Seçilmişse kaldır, değilse ekle
    if (activeFId.includes(clickedFeatureId)) {
      setActiveFId(
        activeFId.filter(id => id !== clickedFeatureId)
      );
    } else {
      setActiveFId([...activeFId, clickedFeatureId]);
      setActiveLayerID(activeLayerId);
    }
  };

  const featureStyle = feature => {
    return {
      fillColor: activeFId.includes(feature.properties.F_ID)
        ? "yellow"
        : "blue", // Seçiliyse mavi, değilse yeşil
      // Diğer stil özelliklerini buraya
      // color: color[data.layerID],
    };
  };
  console.log("color[data.layerID]", color[data.layerID]);
  function point(feature, latlng) {
    return L.circleMarker(latlng);
  }

  console.log(activeFId);
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
