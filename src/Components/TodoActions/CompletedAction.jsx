import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UPDATE_TODO_API } from '../../Utils/Requests';
import { updateTodoStore } from '../../Store/slices/todosSlice';
import LoadingSpinner from '../LoadingSpinner';

function CompletedAction({ todoItem }) {

    const {
        completed
    } = todoItem.attributes;

    const dispatch = useDispatch();

    const [submitting, setSubmitting] = useState(false);

    const handleCompleted = async () => {
        if (!submitting) {
            setSubmitting(true);
            UPDATE_TODO_API({
                completed: !completed
            }, todoItem.id).then(res => {
                dispatch(updateTodoStore(res.data))
            }).finally(() => {
                setSubmitting(false);
            })
        }
    };

    return (
        <button
            type='button'
            title={completed ? "Incomplete Todo" : "Completed Todo"}
            disabled={submitting}
            onClick={handleCompleted}
            aria-label='Todo Completed'
            className='action-completed'
        >
            {
                submitting ? (
                    <LoadingSpinner />
                ) : (
                    completed ? (
                        <i className="fa-solid fa-check-square fa-fw"></i>
                    ) : (
                        <i className="fa-regular fa-square-minus fa-fw"></i>
                    )
                )
            }
        </button>
    )
}

export default CompletedAction;