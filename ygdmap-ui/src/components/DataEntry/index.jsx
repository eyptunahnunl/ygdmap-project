import { useEffect } from "react";

function DataEntry() {
  useEffect(() => {
    console.log("render data entry");
  }, []);
  return (
    <div className="absolute top-6 z-20 w-72 bg-white m-3">
      DataEntry
    </div>
  );
}

export default DataEntry;
