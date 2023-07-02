import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dateReducer from "./slices/DateSlice";
import statusReducer from "./slices/StatusSlice";

const rootReducer = combineReducers({
    dateReducer,
    statusReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
