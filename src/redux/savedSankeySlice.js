import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSavedSankeys = createAsyncThunk(
  "savedSankeys/getSavedSankeys",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://sankey.pakexports.pk/getallsankeys"
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSankeyById = createAsyncThunk(
  "deleteSankey/savedSankeys",
  async (sankeyId, thunkAPI) => {
    try {
      // const config = { sankey_id: sankeyId };
      const response = await axios.delete(
        "https://sankey.pakexports.pk/deletesankey",
        {
          data: { sankey_id: sankeyId },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Initial state
const initialState = {
  savedSankeys: [],
  isLoading: false,
  isError: false,
};

const savedSankeysSlice = createSlice({
  name: "savedSankeys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSavedSankeys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSavedSankeys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedSankeys = action.payload;
      })
      .addCase(getSavedSankeys.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteSankeyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSankeyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedSankeys = state.savedSankeys.filter(
          (sankey) => sankey.sankey_id !== action.payload.sankey_id
        );
      })
      .addCase(deleteSankeyById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default savedSankeysSlice.reducer;
