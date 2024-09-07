import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        confirmDeleteTodo: {
            ask: false,
            todoItem: null
        }
    },
    reducers: {
        handleConfirmDeleteTodoStore: (state, action) => {
            state.confirmDeleteTodo = action.payload;
        }
    }
});

export default appSlice.reducer;

export const { handleConfirmDeleteTodoStore } = appSlice.actions;