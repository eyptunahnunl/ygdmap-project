import { ContainerMap, MapTools } from "components/Map";
import { ToolBar } from "components/Tools";

function App() {
  return (
    <>
      <ContainerMap>
        <MapTools />
      </ContainerMap>

      <ToolBar />
    </>
  );
}

export default App;
