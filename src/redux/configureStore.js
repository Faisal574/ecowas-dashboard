import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import sankeySlice from "./sankey_slice";
import savedSankeyReducer from "./savedSankeySlice";

enableMapSet();

export const store = configureStore({
  reducer: {
    sankeySlice: sankeySlice,
    savedSankeys: savedSankeyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on
