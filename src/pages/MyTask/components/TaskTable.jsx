import React, { useEffect, useState } from "react";
import { Box, ButtonGroup, IconButton, Paper } from "@mui/material";

import {
  AccessTime,
  DeleteForeverOutlined,
  ThumbUpAltOutlined,
  CheckCircleOutline,
  ArchiveOutlined,
  BarChartOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  fetchTasks,
  updateTaskStatus,
} from "../../../reducers/taskSlice";
import dayjs from "dayjs";
import { getStatus } from "../../../utils/utils";
import DataTable from "react-data-table-component";
import PartialCompleteModal from "./PartialCompleteModal";//Partial complete task
import ConfirmModal from "../../../components/CommonComponents/ConfirmModal";//For Deletion 

const DEFAULT_PAGE_NO = 0;
const rowsPerPage = [10, 25, 50, 100];

const TaskTable = ({ search }) => {
  const dispatch = useDispatch();
  const { filterData } = useSelector((state) => state.task);
  const { tasks, totalCount, loading } = useSelector((state) => state.task);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [sortModel, setSortModel] = useState([]);
  const [isPartialTaskModalOpen, setIsPartialTaskModalOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: rowsPerPage[0], 
    page: DEFAULT_PAGE_NO,
  });

  const onPaginationModelChange = (value) => {
    fetchAllTasks({
      pageNo:
        paginationModel.pageSize === value.pageSize
          ? value.page
          : DEFAULT_PAGE_NO,
      pageSize: value.pageSize,
      sortColumn: sortModel.length > 0 ? sortModel[0].field : "",
      sortOrder: sortModel.length > 0 ? sortModel[0].sort : "",
    });

    setPaginationModel({
      ...value,
      page:
        paginationModel.pageSize === value.pageSize
          ? value.page
          : DEFAULT_PAGE_NO,
    });
  };

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const handleUpdateTaskStatus = (TaskId, TaskStatusValue) => {
    dispatch(updateTaskStatus({ TaskId, TaskStatusValue }));
    setSelectedTask(null);
    setIsPartialTaskModalOpen(false);
  };

  const fetchAllTasks = ({ pageNo, pageSize, sortColumn, sortOrder }) => {
    const payload = {
      From: pageNo * pageSize + 1,
      To: pageSize * (pageNo + 1),
      Title: search,
      UserId: 1248,
      IsArchive: false,
      UserIds: "",
      Priority: "",
      TaskStatus: "",
      FromDueDate: "",
      ToDueDate: "",
      SortByDueDate: "",
      SortColumn: sortColumn,
      SortOrder: sortOrder,
      ...filterData,
    };
    dispatch(fetchTasks(payload));
  };

  useEffect(() => {
    fetchAllTasks({
      pageNo: paginationModel.page,
      pageSize: paginationModel.pageSize,
      sortColumn: sortModel.length > 0 ? sortModel[0].field : "",
      sortOrder: sortModel.length > 0 ? sortModel[0].sort : "",
    });
  }, [dispatch, rowsPerPage, search, sortModel, paginationModel, filterData]);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.Title,
      sortable: false,
      cell: (row) => <span style={{ color: "blue" }}>{row.Title}</span>,
      width: "120px",
    },
    {
      name: "Customer Name",
      selector: (row) => row.LeadName,
      sortable: false,
      cell: (row) => (
        <span style={{ color: "blue" }}>{row.LeadName || "-"}</span>
      ),
      width: "150px",
    },
    {
      name: "Assigned By",
      selector: (row) => row.AssignedByUserName,
      sortable: false,
      width: "180px",

    },
    {
      name: "Assigned Date",
      selector: (row) => row.CreateDate,
      sortable: true,
      cell: (row) => formatDate(row.CreateDate),
      width: "180px",
    },
    {
      name: "Due Date",
      selector: (row) => row.TaskEndDate,
      sortable: true,
      cell: (row) => formatDate(row.TaskEndDate),
      width: "150px",
    },
    {
      name: "Priority",
      selector: (row) => row.Priority,
      sortable: false,
      width: "120px",
    },
    {
      name: "Status",
      selector: (row) => row.TaskStatus,
      sortable: false,
      cell: (row) => {
        const status = getStatus(row.TaskStatus);
        return <span style={{ color: status.color }}>{status.text}</span>;
      },
      width: "180px",
    },
    {
      name: "Action",
      cell: (row) => {
        const isTaskPartial =
          row.CompletionPercentage !== -1 && row.CompletionPercentage !== 100;
        return (
          <ButtonGroup variant="outlined" size="small">
            <IconButton>
              <ArchiveOutlined />
            </IconButton>

            <IconButton
              color="primary"
              style={{
                visibility: row.TaskStatus === -1 ? "visible" : "hidden",
              }}
              onClick={() => handleUpdateTaskStatus(row.TaskId, 0)}
            >
              <ThumbUpAltOutlined />
            </IconButton>

            <IconButton color="info">
              <BarChartOutlined />
            </IconButton>

            <IconButton
              color="error"
              onClick={() => {
                setSelectedTask(row.TaskId);
                setIsConfirmOpen(true);
              }}
            >
              <DeleteForeverOutlined />
            </IconButton>

            <IconButton
              color="secondary"
              style={{ visibility: isTaskPartial ? "visible" : "hidden" }}
              onClick={() => handleUpdateTaskStatus(row.TaskId, 100)}
            >
              <CheckCircleOutline />
            </IconButton>

            <IconButton
              color="success"
              style={{ visibility: isTaskPartial ? "visible" : "hidden" }}
              onClick={() => {
                setSelectedTask(row.TaskId);
                setIsPartialTaskModalOpen(true);
              }}
            >
              <AccessTime />
            </IconButton>
          </ButtonGroup>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "180px"
    },
  ];

  const handleConfirmDelete = () => {
    if (selectedTask) dispatch(deleteTask(selectedTask));
    setSelectedTask(null);
    setIsConfirmOpen(false);
  };

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

  return (
    <Box style={{ overflowX: "auto" }}>
      <DataTable
        columns={columns}
        data={tasks}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalCount}
        onChangePage={(page) =>
          onPaginationModelChange({ ...paginationModel, page })
        }
        onChangeRowsPerPage={(perPage) =>
          onPaginationModelChange({ ...paginationModel, pageSize: perPage })
        }
        persistTableHead
        highlightOnHover
        responsive
        striped
        customStyles={{
          rows: {
            style: {
              fontSize: "13px",
              cursor: "pointer",
            },
          },
          headCells: {
            style: {
              fontSize: "14px",
            },
          },
        }}
      />

      <PartialCompleteModal
        isOpen={isPartialTaskModalOpen}
        handleClose={() => setIsPartialTaskModalOpen(false)}
        taskId={selectedTask}
        handleUpdateTaskStatus={handleUpdateTaskStatus}
      />

      <ConfirmModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message="Do you want to delete this Task?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </Box>
  );
};

export default TaskTable;
