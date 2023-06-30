import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dateReducer from "./slices/DateSlice";
import statusReducer from "./slices/StatusSlice";
import roleReducer from "./slices/RoleSlice"

const rootReducer = combineReducers({
    dateReducer,
    statusReducer,
    roleReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
