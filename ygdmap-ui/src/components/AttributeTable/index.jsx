import { DataGrid } from "@mui/x-data-grid";

import LayersContext from "context/LayerContext";
import { useContext, useEffect, useState } from "react";

function AttributeTable() {
  const {
    activeLayerID,
    layersData,
    setActiveFId,

    activeFId,
  } = useContext(LayersContext);
  const [tableCol, setTableCol] = useState([]);
  const [tableRow, setTableRow] = useState([]);

  let layerPropertyNames = [];

  useEffect(() => {
    if (layersData.length !== 0) {
      const activeLayer = layersData.filter(
        item => item.layerID === activeLayerID
      );

      const rows = activeLayer[0].data.features.map(
        feature => {
          const { properties, layerID } = feature;
          return {
            layerID: layerID,
            id: properties.uniqueId,
            ...properties,
          };
        }
      );

      setTableRow(rows);

      Object.keys(
        activeLayer[0].data.features[0].properties
        // eslint-disable-next-line array-callback-return
      ).map(item => {
        layerPropertyNames.push(item);
      });

      const columns = layerPropertyNames.reduce(
        (cols, item) => {
          cols.push({
            field: item,
            headerName: item,
            width: 150,
          });
          return cols;
        },
        []
      );
      setTableCol(columns);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLayerID]);

  const moveSelectedRowsToTop = () => {
    const newRows = tableRow.filter(
      row => !activeFId.includes(row.id)
    ); // Seçili olmayan satırlar
    const selectedRowData = tableRow.filter(row =>
      activeFId.includes(row.id)
    ); // Seçili satırlar
    setTableRow([...selectedRowData, ...newRows]); // Seçili satırlar en üste taşınmış veri kaynağı
  };

  const handleRowSelection = selection => {
    setActiveFId(selection);
  };

  const zoomTodubleClick = event => {
    console.log("cel", event.id);
    // console.log(layersData[0].data.features.filter());
    // layersData.filter( data => data.feat )
  };
  return (
    <div className="absolute bottom-0  z-20 w-full bg-white p-2 ">
      {layersData.length !== 0 ? (
        <div>
          <button onClick={moveSelectedRowsToTop}>
            Seçili Satırları Taşı
          </button>

          <DataGrid
            rows={tableRow}
            columns={tableCol}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }, // kaç row olacak bi sayfada
              },
            }}
            rowSelectionModel={activeFId}
            checkboxSelection
            pageSizeOptions={[5, 10]}
            onRowSelectionModelChange={handleRowSelection}
            // onRowDoubleClick={zoomTodubleClick}
            onCellClick={zoomTodubleClick}
          />
        </div>
      ) : (
        <div className="h-80 justify-center justify-items-center text-center">
          Lütfen Vector Tipinde Veri Ekleyiniz
        </div>
      )}
    </div>
  );
}

export default AttributeTable;
