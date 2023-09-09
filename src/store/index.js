import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authReducer } from "./reducers";

// create root reducer
const rootReducer = {
  auth: authReducer,
};

// setup store
const Store = configureStore({
  reducer: rootReducer,
});

export default Store;
setupListeners(Store.dispatch);
