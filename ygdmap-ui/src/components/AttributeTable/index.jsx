import { DataGrid } from "@mui/x-data-grid";
import LayersContext from "context/LayerContext";
import { useContext, useEffect, useState } from "react";

function AttributeTable() {
  const { activeLayerID, layersData } = useContext(LayersContext);
  const [filterData, setFilterData] = useState([]);

  const [tableCol, setTableCol] = useState([]);
  const [tableRow, setTableRow] = useState([]);

  console.log("layersData", layersData);

  let layerPropertyNames = [];

  useEffect(() => {
    if (layersData.length !== 0) {
      console.log("giriyor mu ");
      const activeLayer = layersData.filter(
        (item) => item.layerID == activeLayerID
      );


      const rows = activeLayer[0].data.features.map(feature => {
        const { properties } = feature;
        return {
          id:properties.F_ID,
          ...properties
        };
      });

      setTableRow(rows);

      Object.keys(activeLayer[0].data.features[0].properties).map((item) => {
        layerPropertyNames.push(item)
      })



      const columns = layerPropertyNames.reduce((cols, item) => {
        cols.push(
          { field: item, headerName: item, width: 150 }
        )
        return cols
      }, [])
      setTableCol(columns)
    }
  }, [activeLayerID]);


  return (
    <div className="absolute bottom-0 z-20 w-full bg-white p-2">
      {layersData.length !== 0 ? (
        <>
          <DataGrid
            rows={tableRow}
            columns={tableCol}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }, // kaç row olacak bi sayfada
              },
            }}

            // isSelectable={e => console.log(e)}
            
            pageSizeOptions={[5, 10]}
          />
        </>
      ) : (
        <div className='h-80 justify-center justify-items-center'>        
          veri yok
        </div>
      )}
    </div>
  );
}

export default AttributeTable;
