import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../Api/endpoints";

export const GET_TODOS_API = createAsyncThunk("todos/GET_TODOS_API", async ({ userEmail }) => {
    try {
        const res = await fetch(`${endpoints.BASE_URL}${endpoints.TODOS}?filters[user][$eq]=${userEmail}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
});

const todosSlice = createSlice({
    name: "todos",
    initialState: {
        todosData: {
            data: []
        },
        loading: true,
        error: null
    },
    reducers: {
        addTodoStore: (state, action) => {
            state.todosData.data.push(action.payload);
        },
        updateTodoStore: (state, action) => {
            const findIndex = state.todosData.data.findIndex(todo => todo.id === action.payload.id);
            if (findIndex !== -1) { // If Todo Found, update!
                state.todosData.data[findIndex] = action.payload
            }
        },
        deleteTodoStore: (state, action) => {
            state.todosData.data = state.todosData.data.filter(todo => todo.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(GET_TODOS_API.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(GET_TODOS_API.fulfilled, (state, action) => {
            state.todosData = action.payload;
            state.loading = false;
        })
        builder.addCase(GET_TODOS_API.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export default todosSlice.reducer;

export const { addTodoStore, updateTodoStore, deleteTodoStore } = todosSlice.actions;