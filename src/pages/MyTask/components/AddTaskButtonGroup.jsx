import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import toast from "../../../utils/toast";
import { DatePicker } from "@mui/x-date-pickers";
import CustomSelect from "../../../components/CommonComponents/CustomSelect";
import MemberList from "./MemberList";
import { priorityOptions } from "../../../utils/utils";
import { data } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeads } from "../../../reducers/memberSlice";
import { addTask } from "../../../reducers/taskSlice";

const AddTaskButtonGroup = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const selectFileRef = useRef(null);
  const [usersModal, setUsersModal] = useState({ open: false, type: null });
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const {leads, isLoading} = useSelector((state) => state.members )

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (2 MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2 MB limit.");
        return;
      }
      setFile(file);
      setFileName(file.name);
      console.log(file, file.name);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFileName("");
    selectFileRef.current.value = ""; // Clear the file input
  };

  const setMembers = (memberIds) => {
    if (usersModal.open) setValue(usersModal.type, memberIds);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await dispatch(addTask({...data, file}));
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      handleCloseModal();
    }
  };

  const handleCloseModal = (e, reason) => {
    if (reason && reason === "backdropClick") return;
    reset();
    // handleRemoveFile();
    setOpenModal(false);
  };

  const fetchLeads = async () => {
    const payload = {
      From: 1,
      To: -1,
      Text: "",
    };
    try {
      dispatch(getAllLeads(payload));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Add Task
      </Button>
      <Modal
        open={openModal}
        sx={{
          position: "absolute",
          top: "10%",
          // borderRadius: 0,
        }}
      >
        <Box
          component="div"
          sx={{
            width: {
              xs: "90%", // 90% of the parent width on small screens
              sm: "70%", // 70% of the parent width on small tablets
              md: "50%", // 50% of the parent width on medium screens (desktops)
            },
            margin: "auto",
            boxShadow: 3,
            height: "80vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "white",
            borderRadius: 4,
          }}
        >
          {/* Modal Header */}
          <AppBar
            position="sticky"
            sx={{ top: 0, width: "100%", background: "white", color: "black" }}
          >
            <Typography sx={{ flexGrow: 1 }} variant="h5" p={2}>
              Add Task
            </Typography>
          </AppBar>

          {/* Modal Tabs to switch between Assin to Me and Assign to others */}
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="primary"
          >
            {console.log(tabIndex)}
            <Tab label="Assign to Others" />
            <Tab label="Assign to Me" />
          </Tabs>

          {/* Modal Form */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              flexGrow: 1,
              px: 3,
              overflowY: "auto",
              height: "calc(100% - 120px)",
              pb: 2,
            }}
          >
            <TextField
              label="Title"
              variant="standard"
              fullWidth
              margin="normal"
              {...register("Title", {
                required: "Title is required",
                pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Title should contain alphabets only",
                },
              })}
              error={!!errors.Title}
              size="medium"
              helperText={errors.Title ? errors.Title?.message : ""}
            />
            <TextField
              fullWidth
              label="Description"
              {...register("Description", {
                required: "Description is required",
              })}
              margin="normal"
              error={!!errors.Description}
              helperText={errors.Description ? errors.Description?.message : ""}
              variant="standard"
              required
              multiline
              rows={2}
            />
            <TextField
              label="Add File"
              value={fileName}
              onClick={() => selectFileRef.current.click()}
              margin="normal"
              variant="standard"
              fullWidth
              InputProps={{
                readOnly: true,
                endAdornment: fileName && (
                  <InputAdornment position="end">
                    <Typography
                      variant="p"
                      color="error"
                      onClick={handleRemoveFile}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
            <input
              type="file"
              id="file-input"
              ref={selectFileRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column", // For xs (mobile): vertical
                    sm: "row", // For sm (tablet): horizontal
                    md: "row", // For md (medium): horizontal
                    lg: "row", // For lg (large): horizontal
                  },
                  gap: "10px",
                }}
              >
                <FormControl fullWidth sx={{ flex: 1 }}>
                  {/* Lead Selection Field */}
                  <Controller
                    name="LeadId"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        options={leads}
                        getOptionKey={(option) => option.id}
                        onChange={(_, newValue) =>
                          field.onChange(newValue ? newValue.id : null)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Lead/Customer Name"
                          />
                        )}
                      />
                    )}
                  />
                </FormControl>

                {/* Date Field */}
                <Controller
                  name="TaskEndDate"
                  control={control}
                  rules={{
                    required: "Due Date is required",
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label="Select Due Date"
                      format="DD MMM YYYY"
                      minDate={dayjs()}
                      sx={{ flex: 1 }}
                      slotProps={{
                        textField: {
                          variant: "standard",
                          error: !!error,
                          helperText: error ? error.message : "",
                          required: true,
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {/* Priority Selection */}
              <CustomSelect
                name="priority"
                label="Select Priority"
                control={control}
                options={priorityOptions}
              />
            </Box>

            {/* Lead Members */}
            {tabIndex === 0 && (
              <>
                <TextField
                  name="UserIds"
                  label="Add Users"
                  value={
                    watch("UserIds")
                      ? Object.keys(watch("UserIds")).length + " Users"
                      : ""
                  }
                  onClick={() => setUsersModal({ open: true, type: "UserIds" })}
                  margin="normal"
                  variant="standard"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </>
            )}

            {/* CC Members */}
            <TextField
              name="TaskOwners"
              label="Add CC Members"
              value={
                watch("TaskOwners")
                  ? Object.keys(watch("TaskOwners")).length + " Users"
                  : ""
              }
              onClick={() => setUsersModal({ open: true, type: "TaskOwners" })}
              margin="normal"
              variant="standard"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>

          {/* ADD and Cancel Button section */}
          <AppBar
            position="sticky"
            sx={{
              bottom: 0,
              width: "100%",
              background: "white",
              color: "grey",
              top: "auto",
            }}
          >
            <Toolbar sx={{ justifyContent: "end", gap: 2 }}>
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Add
              </Button>
            </Toolbar>
          </AppBar>
          {/* CheckBox Modal */}
          <MemberList
            open={usersModal.open}
            handleClose={() => setUsersModal({ open: false, type: null })}
            setcheckedMembers={setMembers}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default AddTaskButtonGroup;
