import LayersContext from "context/LayerContext";
import { useContext, useState } from "react";

import {
  Button,
  Container,
  TextField,
} from "@mui/material";

function LoadWMS() {
  const [inputValue, setInputValue] = useState("");
  const [isValidWMS, setIsValidWMS] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { wmsLayer, setWmsLayer, addWmsLayer } =
    useContext(LayersContext);

  // Text içeriğini Input Value state'ine ata
  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  // Form submit olduğunda input state deki url in validasyonuna bak
  const handleSubmit = event => {
    event.preventDefault();
    checkWMSValidity(inputValue).then(validation => {
      if (validation.isValid) {
        console.log(
          "validasyon durumu",
          validation.isValid
        );
        addWmsLayer(validation.wmsService);
      }
    });
  };

  const checkWMSValidity = async url => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const contentType =
          response.headers.get("content-type");
        if (contentType) {
          console.log("Valid WMS service:", url);
          setIsValidWMS(true);
          setErrorMessage("");
          return {
            isValid: true,
            errorMessage: "",
            wmsService: url,
          }; // wmsService alanını da dön
        } else {
          console.log("Not a valid WMS service:", url);
          setIsValidWMS(false);
          setErrorMessage("Not a valid WMS service URL.");
          return {
            isValid: false,
            errorMessage: "Not a valid WMS service URL.",
          };
        }
      } else {
        console.log(
          "Network response was not ok:",
          response
        );
        setIsValidWMS(false);
        setErrorMessage("Network response was not ok.");
        return {
          isValid: false,
          errorMessage: "Network response was not ok.",
        };
      }
    } catch (error) {
      console.error(
        "Error while checking WMS service:",
        error
      );
      setIsValidWMS(false);
      setErrorMessage(
        "An error occurred while checking the URL."
      );
      return {
        isValid: false,
        errorMessage:
          "An error occurred while checking the URL.",
      };
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          label="WMS Service URL"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
          error={!isValidWMS && inputValue !== ""}
          helperText={
            !isValidWMS && inputValue !== ""
              ? errorMessage
              : isValidWMS
              ? "Success!"
              : ""
          }
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default LoadWMS;
