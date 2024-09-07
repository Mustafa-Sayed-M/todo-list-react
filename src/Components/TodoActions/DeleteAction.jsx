import React from 'react'
import { useDispatch } from 'react-redux';
import { handleConfirmDeleteTodoStore } from '../../Store/slices/appSlice';

function DeleteAction({ todoItem }) {

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.stopPropagation();
        dispatch(handleConfirmDeleteTodoStore({
            ask: true,
            todoItem
        }));
    };

    return (
        <button
            type='button'
            title='Delete Todo'
            onClick={handleClick}
            aria-label='Todo Delete'
            className='action-delete'
        >
            <i className="fa-solid fa-trash-can fa-fw"></i>
        </button>
    )
}

export default DeleteAction;