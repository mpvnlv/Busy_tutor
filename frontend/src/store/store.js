import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dateReducer from "./slices/DateSlice";
import statusReducer from "./slices/StatusSlice";
import modalReducer from "./slices/ModalSlice";

const rootReducer = combineReducers({
    dateReducer,
    statusReducer,
    modalReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
