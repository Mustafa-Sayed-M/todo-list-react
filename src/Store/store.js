import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import todosSlice from "./slices/todosSlice";

export const store = configureStore({
    reducer: {
        app: appSlice,
        todos: todosSlice
    }
});