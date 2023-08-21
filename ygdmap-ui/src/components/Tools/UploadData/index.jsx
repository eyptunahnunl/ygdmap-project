import LayersContext from "context/LayerContext";
import { useContext, useEffect, useState } from "react";

import shp from "shpjs";
import { v4 as uuidv4 } from "uuid";

function UploadData() {
  const [shapeFileData, setShapeFileData] = useState();
  const { addLayer, setActiveLayer, setActiveLayerID } =
    useContext(LayersContext);
  const [layerID, setLayerID] = useState(0);

  const [fileExtention, setFileExtention] = useState("");
  function handleFile(file) {
    if (file === undefined) {
      return;
    }
    if (
      !(
        file.name.slice(-3) == "zip" ||
        file.name.slice(-4) == "json"
      )
    ) {
      return setFileExtention("olmadı");
    }

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

    if (json.features === undefined) {
      return;
    }
    json.features.forEach((feature, index) => {
      feature.properties["F_ID"] = index + 1;
      feature.properties["uniqueId"] = uuidv4();

      feature.layerID = layerID;
    });

    const geoJsonLayer = {
      name: name,
      data: json,
      layerID: layerID,
    };

    setActiveLayerID(json.features[0].layerID);
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
      setLayerID(layerID + 1);
      data.features.forEach((feature, index) => {
        // feature.F_ID = index;
        feature.properties["F_ID"] = index;
        feature.properties["uniqueId"] = uuidv4();

        feature.layerID = layerID;
      });
      const newShapeFile = {
        name: data.fileName,
        data: data,
        layerID: layerID,
      };
      setActiveLayer(data);
      setActiveLayerID(data.features[0].layerID);
      addLayer(newShapeFile);
      // geo.addData(data);
    });
  }, [shapeFileData]);

  return (
    <>
      <div>
        <input
          type="file"
          onChange={e => handleFile(e.target.files[0])}
        />
        <span>load geojson or Shpafile (.zip) </span>
        {fileExtention && (
          <span>.json veya .zip yüklemediniz ! </span>
        )}
      </div>
    </>
  );
}

export default UploadData;
