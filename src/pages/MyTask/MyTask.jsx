import React, { useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import useDebounce from "../../customHooks/useDebounce";

import styles from "./MyTask.module.scss";
import TaskTable from "./components/TaskTable";

const MyTask = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 1000);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box className={styles.MyTaskPage}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"4rem"}
        width={"100%"}
        className={styles.actionContainer}
      >
        <Button variant="contained">Filter</Button>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button variant="contained">Settings</Button>
          <Button variant="contained">Export</Button>
        </Box>
      </Box>
      <TaskTable search={debounceSearch} />
    </Box>
  );
};

export default MyTask;
