import React, { useContext, useRef } from "react";
import { ContainerMap, MapTools } from "..";
import { ToolBar } from "components/Tools";
import LayersContext from 'context/LayerContext';

function MapObjects() {

  return (
    <>
      <ContainerMap>
        <MapTools />
      </ContainerMap>
  
      <ToolBar />
    </>
  );
}

export default MapObjects;
