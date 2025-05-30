import { Box } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddTaskButtonGroup = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  




  return <Box></Box>;
};

export default AddTaskButtonGroup;
