import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PageError = {
  error?: string;
  description?: string;
};

export type ErrorPageState = {
  pageError: PageError;
};

const initialState: ErrorPageState = {
  pageError: {
    error: undefined,
    description: undefined,
  },
};

const errorPageSlice = createSlice({
  name: "@ErrorPage",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<PageError>) {
      state.pageError = action.payload;
    },
    clearError(state) {
      state.pageError = { error: undefined, description: undefined };
    },
  },
});

export const { setError, clearError } = errorPageSlice.actions;

export default errorPageSlice.reducer;
