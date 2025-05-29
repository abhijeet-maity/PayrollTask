import React, { useState } from "react";
import CustomModal from "../../../components/CommonComponents/CustomModal";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const partialCompleteOptions = [50, 75, 100];

const PartialCompleteModal = ({isOpen, handleClose, handleUpdateTaskStatus, taskId}) => {
  const [percent, setPercent] = useState();

  const handlePercentChange = (e, nextPercent) => {
    if (nextPercent !== null) {
      setPercent(nextPercent);
    }
  };

  return (
    <>
      <CustomModal
        open={isOpen}
        onClose={handleClose}
        title="Partial Complete"
        handleSubmit={() => handleUpdateTaskStatus(taskId, percent)}
      >
        <ToggleButtonGroup
          value={percent}
          onChange={handlePercentChange}
          exclusive
          color="primary"
        >
          {partialCompleteOptions.map((item, index) => (
            <ToggleButton key={`Partial-option-${index}`} value={item}>
              {item}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </CustomModal>
    </>
  );
};

export default PartialCompleteModal;