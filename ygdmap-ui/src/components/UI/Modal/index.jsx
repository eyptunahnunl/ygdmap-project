import { Box, Modal, Typography } from "@mui/material";
import React from "react";

function CustomModal({ open, handleClose, header, text }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {header}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {text}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default CustomModal;
