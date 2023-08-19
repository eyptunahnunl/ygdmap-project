import { DataGrid } from "@mui/x-data-grid";
import clsx from "clsx";
import LayersContext from "context/LayerContext";
import { useContext, useEffect, useState } from "react";

function AttributeTable() {
  const { activeLayerID, layersData } =
    useContext(LayersContext);
  const [tableCol, setTableCol] = useState([]);
  const [tableRow, setTableRow] = useState([]);

  const [value, setValue] = useState();
  const [selectedRows, setSelectedRows] = useState([2, 4]);

  let layerPropertyNames = [];

  useEffect(() => {
    console.log("selectedRows", selectedRows);
  }, []);
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
            id: properties.F_ID,
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
      row => !selectedRows.includes(row.id)
    ); // Seçili olmayan satırlar
    const selectedRowData = tableRow.filter(row =>
      selectedRows.includes(row.id)
    ); // Seçili satırlar
    setTableRow([...selectedRowData, ...newRows]); // Seçili satırlar en üste taşınmış veri kaynağı
  };

  // const addSelection = newSelection => {
  //   setSelectedRows(prevSelections => [
  //     ...prevSelections,
  //     newSelection,
  //   ]);
  // };
  const handleRowSelection = selection => {
    // Önceki seçili satırları koruyarak yeni seçili satırları eklemek
    // const newSelectedRows = [
    //   ...selectedRows.filter(
    //     id => !deselection.includes(id)
    //   ),
    //   ...selection,
    // ];
    // setSelectedRows(selection);
    setSelectedRows(selection);
  };
  console.log("slectedrow", selectedRows);
  return (
    <div className="absolute bottom-0 z-20 w-full bg-white p-2 ">
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
            rowSelectionModel={selectedRows}
            isRowSelected={e => console.log(e)}
            checkboxSelection
            pageSizeOptions={[5, 10]}
            onRowSelectionModelChange={handleRowSelection}

            // onSortModelChange={model => console.log(model)}
            // sortModel={sortModel}
            // disableRowSelectionOnClick
            // getCellClassName={params => selectedRow(params)}
          />
        </div>
      ) : (
        <div className="h-80 justify-center justify-items-center">
          veri yok
        </div>
      )}
    </div>
  );
}

export default AttributeTable;
