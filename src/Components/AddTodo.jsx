import React, { useRef, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { ADD_TODO_API } from '../Utils/Requests';
import { useDispatch } from 'react-redux';
import { addTodoStore } from '../Store/slices/todosSlice';
import { useUser } from '@clerk/clerk-react';

function AddTodo() {

    const { user } = useUser();

    const dispatch = useDispatch();

    const inputRef = useRef();

    const [todoTitle, setTodoTitle] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (todoTitle && !submitting) {
            setSubmitting(true);
            ADD_TODO_API({
                title: todoTitle,
                user: user.primaryEmailAddress.emailAddress
            }).then(res => {
                dispatch(addTodoStore(res.data))
            }).finally(() => {
                setSubmitting(false);
                setTodoTitle(null);
                inputRef.current.value = '';
                inputRef.current.focus();
            })
        }
    };

    const handleChange = (e) => {
        setTodoTitle(e.target.value);
    };

    if (!user) return;

    return (
        <form className='add-todo flex items-start gap-3 sticky top-0' onSubmit={handleSubmit}>
            {/* Input Add Todo Title */}
            <input
                required
                type='text'
                ref={inputRef}
                id='todo-title'
                name='todo-title'
                autoComplete='off'
                onChange={handleChange}
                placeholder='Add a new todo'
                className='focus:outline-none border border-primary-color rounded-md p-2 bg-transparent w-full focus:placeholder:opacity-0 placeholder:transition'
            />
            {/* Submit */}
            <button
                type='submit'
                disabled={submitting}
                className='submit-btn bg-primary-color text-white rounded-md px-4 py-2'
            >
                {
                    submitting ? (
                        <LoadingSpinner />
                    ) : <i className="fa-solid fa-plus fa-fw"></i>
                }
            </button>
        </form>
    )
}

export default AddTodo;