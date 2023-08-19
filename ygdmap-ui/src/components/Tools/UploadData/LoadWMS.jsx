import LayersContext from "context/LayerContext";
import { useContext, useState } from "react";

import {
  Button,
  Container,
  Stack,
  TextField,
} from "@mui/material";

function LoadWMS() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [layer, setLayer] = useState("");

  const { addWmsLayer } = useContext(LayersContext);

  const handleSubmit = () => {
    addWmsLayer({
      name: name,
      url: url,
      layer: layer,
    });
  };

  return (
    <Container maxWidth="md">
      <Stack
        component="form"
        sx={{
          width: "25ch",
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="WMS service url"
          variant="outlined"
          fullWidth
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <TextField
          label="Layer (Comma-separated list of WMS layers to
          show.)"
          variant="outlined"
          fullWidth
          value={layer}
          onChange={e => setLayer(e.target.value)}
        />
        <TextField
          label="Layer Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </Stack>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
}

export default LoadWMS;
