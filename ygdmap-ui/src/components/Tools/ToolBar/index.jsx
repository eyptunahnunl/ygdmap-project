import AttributeTable from "components/AttributeTable";
import DataEntry from "components/DataEntry";
import LocationAnalysis from "components/LocationAnalysis";
import { Button } from "components/UI";
import UIControlContext from "context/UIControl";
import { useContext } from "react";

function ToolBar() {
  const {
    dataEntry,
    setDataEntry,
    attributeTable,
    setAttributeTable,
    locationAnalysis,
    setLocationAnalysis,
  } = useContext(UIControlContext);

  const handleDataEntry = () => {
    setDataEntry(!dataEntry);
  };
  const handleAttributeTable = () => {
    setAttributeTable(!attributeTable);
  };
  const handlelocationAnalysis = () => {
    setLocationAnalysis(!locationAnalysis);
  };

  return (
    <>
      <div className="right-1 w-10 top-56  z-51 absolute flex-row  mt-0 overflow-hidden ">
        <Button
          iconName="dataEntry"
          onClick={handleDataEntry}
        />
        <Button
          iconName="table"
          onClick={handleAttributeTable}
        />
        <Button
          iconName="tool"
          onClick={handlelocationAnalysis}
        />
        {/* <UploadData /> */}
      </div>

      {dataEntry && <DataEntry />}
      {locationAnalysis && <LocationAnalysis />}
      {attributeTable && <AttributeTable />}
    </>
  );
}

export default ToolBar;
