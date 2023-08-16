import React, { useRef } from "react";
import { ContainerMap } from "..";
import { GeoSearch } from "components/Tools";
import ToolBar from 'components/Tools/ToolBar';

function MapObjects() {

  return (
    <ContainerMap >
      <ToolBar/>
    </ContainerMap>
  );
}

export default MapObjects;
