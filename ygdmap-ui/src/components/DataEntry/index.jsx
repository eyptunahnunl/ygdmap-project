import { useContext, useEffect, useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import shp from "shpjs";
import LayersContext from 'context/LayerContext';

function DataEntry() {

  const [shapeFileData, setShapeFileData] = useState();
  const { addLayer, setActiveLayer } =
    useContext(LayersContext);
  const [layerID, setLayerID] = useState(0);

  useEffect(() => {
    console.log("render data entry");
  }, []);

 function handleFile(file){
  if (file.name?.slice(-3) == "zip") {
    return handleZipFile(file);
  }
  var reader = new FileReader();

  reader.onload = function (e) {
    let ext;
    if (reader.readyState !== 2 || reader.error) {
      return;
    } else {
      ext = file.name.split(".");
      ext = ext[ext.length - 1];
      jsonData(
        [
          reader.result,
          file.name.slice(0, 0 - (ext.length + 1)),
        ],
        [reader.result]
      );
    }
  };
  reader.readAsArrayBuffer(file);
 }

 function jsonData(data) {
  setLayerID(layerID + 1);
  const name = data[1];
  const json =
    data.length === 2
      ? JSON.parse(makeGeometri(data[0]))
      : data[0];

  json.features.forEach((feature, index) => {
    feature.F_ID = index;
    feature.layerID = layerID;
  });

  console.log("jsontype", json);

  const geoJsonLayer = {
    name: name,
    data: json,
    layerID: layerID,
  };

  setActiveLayer(json);
  addLayer(geoJsonLayer);
}

function makeGeometri(buffer) {
  let array = new Uint8Array(buffer);
  let len = array.length;
  let outString = "";
  let i = 0;
  while (i < len) {
    outString += String.fromCharCode(array[i++]);
  }
  return outString;
}
function readerLoad() {
  setShapeFileData(this.result);
}
function handleZipFile(file) {
  let reader = new FileReader();
  reader.onload = readerLoad;
  reader.readAsArrayBuffer(file);
}


useEffect(() => {
  shp(shapeFileData).then(function (data) {
    console.log("json add json file  ");
    setLayerID(layerID + 1);
    data.features.forEach((feature, index) => {
      feature.F_ID = index;
      feature.layerID = layerID;
    });
    const newShapeFile = {
      name: data.fileName,
      data: data,
      layerID: layerID,
    };
    setActiveLayer(data);

    addLayer(newShapeFile);
    // geo.addData(data);
  });
}, [shapeFileData]);

  return (
    <div className="absolute top-6  border-2 z-20 w-86 bg-white m-3 ">
      <Tabs aria-label="Basic tabs" defaultValue={0}>
        <TabList>
          <Tab>Load File</Tab>
          <Tab>WMS</Tab>
          <Tab>Raster</Tab>
        </TabList>
        <TabPanel value={0}>
          <div>
            <input type="file" onChange={e => handleFile(e.target.files[0])} />
            <span>load geojson or Shpafile (.zip) </span>
          </div>
        </TabPanel>
        <TabPanel value={1}>
          <b>Second</b> tab panel
        </TabPanel>
        <TabPanel value={2}>
          <b>Third</b> tab panel
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default DataEntry;
