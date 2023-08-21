import LayersContext from "context/LayerContext";
import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import axios from "axios";
import LocationAnalysisContext from "context/LocationAnalysisContext";
import {
  CustomModal,
  DropDown,
  Header,
} from "components/UI";
import { fetchAnalysisData } from "services/analysis";
function LocationAnalysis() {
  const { layersData } = useContext(LayersContext);
  const { setApiData } = useContext(
    LocationAnalysisContext
  );
  const [poligon, setPoligon] = useState({});
  const [secondData, setSecondData] = useState({});

  const [errorModalOpen, setErrorModal] = useState(false);
  const [nonIntersection, setNonIntersection] =
    useState(false);

  const serviceEntegration = async () => {
    if (
      Object.keys(poligon).length > 0 &&
      Object.keys(secondData).length > 0
    ) {
      const serviceData = {
        polygon: poligon,
        otherShape: secondData,
      };
      try {
        const response = await axios.post(
          "http://localhost:8080/api/data",
          serviceData
        );

        if (response.data.features.length > 0) {
          const ids = response.data.features.map(
            feature => feature.properties.uniqueId
          );

          setApiData(ids);
        } else {
          setNonIntersection(true);
        }
      } catch (error) {
        console.error(
          "API isteği sırasında bir hata oluştu:",
          error
        );

        setErrorModal(true);
      }
    }
  };
  return (
    <div className="absolute top-1/2 z-20 w-72 h-56 flex-col bg-white m-3 p-2">
      <Box sx={{ minWidth: 120 }}>
        <Header text="Location Analysis Tool" />
        <DropDown
          onChange={event => setPoligon(event.target.value)}
          value={poligon}
          data={layersData}
          text="Select Layer..."
          label="Poligon Katman giriniz"
        />
      </Box>

      <Box sx={{ minWidth: 120 }} className="mt-2">
        <DropDown
          onChange={event =>
            setSecondData(event.target.value)
          }
          value={secondData}
          data={layersData}
          text="Select Second Layer..."
          label="Point, line, poligon giriniz"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
          onClick={serviceEntegration}
        >
          Submit
        </Button>
      </Box>

      {errorModalOpen && (
        <CustomModal
          open={errorModalOpen}
          handleClose={() => setErrorModal(false)}
          header={"API İsteğinde hata oluştu"}
          text={
            "Girdiğiniz veri türleri birincisi Poligon ikincisi Poligon, line veya Point Objelerinden oluşmalı "
          }
        />
      )}
      {nonIntersection && (
        <CustomModal
          open={nonIntersection}
          handleClose={() => setNonIntersection(false)}
          header="Girdiğiniz veriler kesişmedi"
          text="verileriniz geometrik olarak aynı kesişim lokasyonunda değil"
        />
      )}
    </div>
  );
}

export default LocationAnalysis;
