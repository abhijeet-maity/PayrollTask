import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import MemberList from "./MemberList";
import { DatePicker } from "@mui/x-date-pickers";
import CustomModal from "../../../components/CommonComponents/CustomModal";
import CustomSelect from "../../../components/CommonComponents/CustomSelect";
import { priorityOptions, statusOptions } from "../../../utils/utils";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFilterData } from "../../../reducers/taskSlice";

const FilterButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [membersModalOpen, setMembersModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      TaskStatus: "",
      Priority: "",
      UserIds: "",
      FromDueDate: null,
      ToDueDate: null,
    },
  });

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const setMembers = (memberIds) => {
    if (membersModalOpen) setValue("UserIds", memberIds);
  };

  const onSubmit = (value) => {
    console.log(value);
    dispatch(setFilterData(value));
    handleClose();
    reset();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Filter
      </Button>
      <CustomModal
        maxWidth="xs"
        title="Filter Options"
        open={dialogOpen}
        handleSubmit={handleSubmit(onSubmit)}
        onClose={handleClose}
      >
        <form>
          <CustomSelect
            label="By Status"
            name="TaskStatus"
            control={control}
            options={statusOptions}
            margin="normal"
          />
          <CustomSelect
            label="By Priority"
            name="Priority"
            control={control}
            options={priorityOptions}
          />

          <TextField
            label="By Members"
            value={
              watch("UserIds")
                ? Object.keys(watch("UserIds")).length + " Users"
                : ""
            }
            onClick={() => setMembersModalOpen(true)}
            margin="normal"
            size="small"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <MemberList
            open={membersModalOpen}
            handleClose={() => setMembersModalOpen(false)}
            setcheckedMembers={setMembers}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="FromDueDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="From Due Date"
                    format="DD MMM YYYY"
                    sx={{ flex: 1 }}
                    slotProps={{ textField: { variant: "standard" } }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="ToDueDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="To Due Date"
                    format="DD MMM YYYY"
                    sx={{ flex: 1 }}
                    slotProps={{ textField: { variant: "standard" } }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </CustomModal>
    </div>
  );
};

export default FilterButton;
