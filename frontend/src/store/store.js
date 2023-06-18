import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dateReducer from "./slices/DateSlice";

const rootReducer = combineReducers({
    dateReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
