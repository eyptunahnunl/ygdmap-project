import { createContext, useState } from "react";

const LayersContext = createContext({});

export const LayersProvider = ({ children }) => {
  const [layersData, setLayersData] = useState([]);
  const [activeLayer, setActiveLayer] = useState([]);
  const [activeFId, setActiveFId] = useState([]);
  const [activeLayerID, setActiveLayerID] = useState();
  const [rasterLayer, setRasterLayer] = useState();
  const [activeData, setActiveData] = useState([]);

  const [clearStyle, setClearStyle] = useState();

  const [wmsLayer, setWmsLayer] = useState([]);

  const addLayer = newLayer => {
    setLayersData(prevLayers => [...prevLayers, newLayer]);
  };

  const addNewFeatureId = newFeatureId => {
    setActiveData(prevData => ({
      ...prevData,
      featureId: [...prevData.featureId, newFeatureId],
    }));
  };

  const handleLayerChange = (newLayerID, newFeatureIds) => {
    const existingLayer = activeData.find(
      item => item.layerID === newLayerID
    );

    if (!existingLayer) {
      const newDataList = [
        ...activeData,
        {
          layerID: newLayerID,
          featureId: [...newFeatureIds],
        },
      ];
      setActiveData(newDataList);
    }
  };

  const addFeatureIdsToLayer = (layerID, newFeatureIds) => {
    const newDataList = activeData.map(item => {
      if (item.layerID === layerID) {
        return {
          ...item,
          featureId: [...item.featureId, ...newFeatureIds],
        };
      }
      return item;
    });
    return newDataList;
  };

  const addWmsLayer = wms => {
    const isLayerExists = wmsLayer.some(
      layer => layer.name === wms.name
    );

    if (!isLayerExists) {
      setWmsLayer(prevLayers => [...prevLayers, wms]);
    }
  };

  const data = {
    layersData,
    setLayersData,
    addLayer,
    activeLayer,
    setActiveLayer,
    activeFId,
    setActiveFId,
    clearStyle,
    setClearStyle,
    activeLayerID,
    setActiveLayerID,
    rasterLayer,
    setRasterLayer,

    addNewFeatureId,
    handleLayerChange,
    addFeatureIdsToLayer,
    wmsLayer,
    setWmsLayer,
    addWmsLayer,
  };

  return (
    <LayersContext.Provider value={data}>
      {children}
    </LayersContext.Provider>
  );
};

export default LayersContext;
