import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/history";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchHistory = createAsyncThunk("history/fetch", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const saveHistory = createAsyncThunk(
  "history/save",
  async (description) => {
    const response = await axios.post(BASE_URL, {
      headers: { "Content-Type": "application/json" },
      description,
    });
    return await response.data;
  }
);

export const deleteHistory = createAsyncThunk("history/delete", async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);

  return await response.data;
});

export const updateHistory = createAsyncThunk("history/update", async (id) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, {
    headers: { "Content-Type": "application/json" },
    isFavourite: true,
  });

  return await response.data;
});

export const historySlice = createSlice({
  name: "histories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchHistory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(saveHistory.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(saveHistory.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.status = "success";
    });
    builder.addCase(saveHistory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(deleteHistory.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteHistory.fulfilled, (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
        state.status = "success";
      }
    });
    builder.addCase(deleteHistory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(updateHistory.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateHistory.fulfilled, (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
        state.status = "success";
      }
    });
    builder.addCase(updateHistory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectAllHistories = (state) => state.history;

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;
