import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleConfirmDeleteTodoStore } from '../Store/slices/appSlice';
import { DELETE_TODO_API } from '../Utils/Requests';
import { deleteTodoStore } from '../Store/slices/todosSlice';
import LoadingSpinner from './LoadingSpinner';

// Cancel Action
const Cancel = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(handleConfirmDeleteTodoStore({
            ask: false,
            todoItem: null
        }));
    };

    return (
        <button
            type='button'
            title='Cancel Todo'
            onClick={handleClick}
            aria-label='Cancel Todo'
            className='py-2 px-4 bg-primary-color rounded-md'
        >
            Cancel
        </button>
    )
};

// Delete Action
const Delete = () => {

    const dispatch = useDispatch();

    const { confirmDeleteTodo: { todoItem } } = useSelector(state => state.app);

    const [submitting, setSubmitting] = useState(false);

    const handleClick = async () => {
        if (!submitting) {
            setSubmitting(true);
            DELETE_TODO_API(todoItem.id).then(res => {
                dispatch(deleteTodoStore(res.data));
            }).finally(() => {
                setSubmitting(false);
                dispatch(handleConfirmDeleteTodoStore({
                    ask: false,
                    todoItem: null
                }));
            })
        }
    };

    return (
        <button
            type='button'
            title='Delete Todo'
            onClick={handleClick}
            aria-label='Delete Todo'
            className='py-2 px-4 bg-red-500 rounded-md'
        >
            {
                submitting ? (
                    <LoadingSpinner />
                ) : (
                    "Delete"
                )
            }
        </button>
    )
};

function ConfirmDeleteTodo() {

    const dispatch = useDispatch();

    const { confirmDeleteTodo: { ask } } = useSelector(state => state.app);

    useEffect(() => {
        const clickOutSide = () => {
            dispatch(handleConfirmDeleteTodoStore({
                ask: false,
                todoItem: null
            }));
        };
        document.addEventListener('click', clickOutSide);
        return () => {
            document.removeEventListener('click', clickOutSide);
        };
    }, [dispatch]);

    if (!ask) return;

    return (
        <div className='confirm-delete-todo rounded-md absolute z-[1000] bg-black/40 backdrop-blur-sm w-full h-full left-0 top-0 flex items-center justify-center'>
            <div className='font-medium p-5 bg-white rounded-md' onClick={e => e.stopPropagation()}>
                {/* Ask */}
                <p className='text-black font-medium mb-3'>Are You Sure to Delete This Todo?</p>
                {/* Actions */}
                <div className='actions flex items-center justify-center gap-2'>
                    {/* Cancel */}
                    <Cancel />
                    {/* Delete */}
                    <Delete />
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteTodo;