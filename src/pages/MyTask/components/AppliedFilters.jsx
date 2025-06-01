import { Chip, Stack, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilterData } from "../../../reducers/taskSlice";
import dayjs from "dayjs";

const TASKSTATUS = "TaskStatus";
const PRIORITY = "Priority";
const USERIDS = "UserIds";
const FROMDUEDATE = "FromDueDate";
const TODUEDATE = "ToDueDate";

const AppliedFilters = () => {
  const { filterData: filters } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const handleClearFilters = (filterKey) => {
    if (filterKey === "all") {
      dispatch(setFilterData({}));
    } else {
      const updatedFilters = { ...filters };
      if (filterKey === "date") {
        delete updatedFilters[FROMDUEDATE];
        delete updatedFilters[TODUEDATE];
      } else {
        delete updatedFilters[filterKey];
      }
      dispatch(setFilterData(updatedFilters));
    }
  };

  return (
    Object.values(filters).length > 0 ? (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: 2,
      }}
    >
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {filters[TASKSTATUS] && (
            <Chip
              label={`Status: ${filters[TASKSTATUS]}`}
              onDelete={() => handleClearFilters(TASKSTATUS)}
              color="primary"
              variant="outlined"
            />
          )}
          {filters[PRIORITY] && (
            <Chip
              label={`Priority: ${filters[PRIORITY]}`}
              onDelete={() => handleClearFilters(PRIORITY)}
              color="secondary"
              variant="outlined"
            />
          )}
          {filters[USERIDS]?.length > 0 && (
            <Chip
              label={`Members: ${filters[USERIDS]?.length}`}
              onDelete={() => handleClearFilters(USERIDS)}
              color="success"
              variant="outlined"
            />
          )}
          {filters[FROMDUEDATE] && filters[TODUEDATE] && (
            <Chip
              label={`From ${dayjs(filters[FROMDUEDATE]).format("DD MMM YYYY")} To ${dayjs(filters[TODUEDATE]).format("DD MMM YYYY")}`}
              onDelete={() => handleClearFilters("date")}
              color="warning"
              variant="outlined"
            />
          )}

          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleClearFilters("all")}
          >
            Clear Filter
          </Button>
        </Stack>
    </Box>) : null
  );
};

export default AppliedFilters;