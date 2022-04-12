import React from "react";
import Modal from "react-modal";
import { Typography } from "@material-ui/core";
import "./CustomModal.css";

function CustomModal({ header, children, open, onClose, width }) {
  const customStyles = {
    content: {
      width: width || "30%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: 0,
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <Modal isOpen={open} onRequestClose={onClose} style={customStyles}>
      <React.Fragment>
        {header && (
          <div className={"Header"}>
            <Typography variant="h6" component="div">
              {header}
            </Typography>
          </div>
        )}
        <div className={"Main"}>{children}</div>
      </React.Fragment>
    </Modal>
  );
}

export default CustomModal;
