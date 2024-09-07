import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodoStore } from '../Store/slices/todosSlice';
import { UPDATE_TODO_API } from '../Utils/Requests';
import LoadingSpinner from './LoadingSpinner';

function FormEditTodo({ todoItem, editTodo, setEditTodo }) {
    const {
        title,
    } = todoItem.attributes;

    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState(false);
    const [oldTitle] = useState(title);
    const [newTitle, setNewTitle] = useState(title);

    const handleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!submitting && newTitle !== oldTitle) {
            setSubmitting(true);
            UPDATE_TODO_API({
                title: newTitle
            }, todoItem.id).then(res => {
                dispatch(updateTodoStore(res.data))
            }).finally(() => {
                setSubmitting(false);
                setEditTodo(false);
            })
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex items-center gap-2 mt-4'>
            <input
                required
                autoFocus
                type='text'
                id='edit-todo'
                name='edit-todo'
                autoComplete='off'
                defaultValue={title}
                placeholder='Edit Todo'
                onChange={handleChange}
                className='focus:outline-none bg-transparent border border-primary-color rounded-md p-2 w-full'
            />
            <button
                type='submit'
                disabled={submitting}
                className='submit-btn bg-primary-color text-white rounded-md px-4 py-2'
            >
                {
                    submitting ? (
                        <LoadingSpinner />
                    ) : (
                        <i className="fa-solid fa-check fa-fw"></i>
                    )
                }
            </button>
        </form>
    )
}

export default FormEditTodo;