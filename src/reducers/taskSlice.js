import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateAPI } from "../services/privateAPI";
import {
  ADD_TASK,
  DELETE_TASK,
  TASK,
  UPDATE_TASK_STATUS,
} from "../services/apiURL";
import { defaultTaskPayload, formatData } from "../utils/utils";
import toast from "../utils/toast";

const initialState = {
  team: {},
  tasks: [],
  comments: [],
  totalCount: 0,
  filterData: {},
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (payload) => {
    try {
      const response = await privateAPI.post(TASK, payload);
      if (response.data?.status === 404) {
        return {
          tasks: [],
          comments: [],
          totalCount: 0,
        };
      }

      return {
        tasks: response.data.data.TaskList,
        comments: response.data.data.CommentList,
        totalCount: response.data.data.TotalCount,
      };
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

export const addTask = createAsyncThunk(
  "task/addTask",
  async (payload, { dispatch }) => {
    try {
      const data = await formatData(payload);
      await privateAPI.post(ADD_TASK, data);
      toast.success("Task added successfully");
      dispatch(fetchTasks(defaultTaskPayload));
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId, { dispatch }) => {
    try {
      await privateAPI.get(DELETE_TASK + `?taskId=${taskId}`);

      toast.success("Task Deleted successfully");
      dispatch(fetchTasks(defaultTaskPayload));
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

export const updateTaskStatus = createAsyncThunk(
  "task/updateTaskStatus",
  async (data, { dispatch }) => {
    try {
      await privateAPI.post(UPDATE_TASK_STATUS, data);
      toast.success("Task Status updated successfully");
      dispatch(fetchTasks(defaultTaskPayload));
    } catch (error) {
      console.log(error);
      throw error.response.data;
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.comments = action.payload.comments;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTaskStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilterData } = taskSlice.actions;
export default taskSlice.reducer;
