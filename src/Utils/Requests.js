import { endpoints } from "../Api/endpoints";

export const ADD_TODO_API = async (values) => {
    try {
        const res = await fetch(`${endpoints.BASE_URL}${endpoints.TODOS}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: values
            }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};
export const UPDATE_TODO_API = async (values, todoId) => {
    try {
        const res = await fetch(`${endpoints.BASE_URL}${endpoints.TODOS}/${todoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: values
            }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};
export const DELETE_TODO_API = async (todoId) => {
    try {
        const res = await fetch(`${endpoints.BASE_URL}${endpoints.TODOS}/${todoId}`, {
            method: "DELETE",
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};