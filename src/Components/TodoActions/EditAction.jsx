import React from 'react';

function EditAction({ editTodo, setEditTodo }) {

    const handleClick = () => {
        setEditTodo(!editTodo);
    };

    return (
        <button
            type='button'
            onClick={handleClick}
            aria-label='Edit Todo'
            className='action-edit'
        >
            <i className="fa-solid fa-pen-to-square fa-fw"></i>
        </button>
    )
}

export default EditAction;