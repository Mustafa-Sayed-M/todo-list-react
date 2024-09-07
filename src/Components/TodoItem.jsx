import React, { useState } from 'react';
import { UPDATE_TODO_API } from '../Utils/Requests';
import LoadingSpinner from './LoadingSpinner';
import DeleteAction from './TodoActions/DeleteAction';
import FeaturedAction from './TodoActions/FeaturedAction';
import { useDispatch } from 'react-redux';
import { updateTodoStore } from '../Store/slices/todosSlice';
import CompletedAction from './TodoActions/CompletedAction';
import EditAction from './TodoActions/EditAction';
import FormEditTodo from './FormEditTodo';

function TodoItem({ todoItem }) {

    const {
        title,
        completed,
        createdAt,
    } = todoItem.attributes;

    const date = new Date(createdAt);

    const dispatch = useDispatch();

    const fullDateDisplay = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    const shortDateDisplay = date.toLocaleDateString('en-US', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });

    const [editTodo, setEditTodo] = useState(false);
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
        <div className='todo-item p-3 bg-todo-item-color rounded-md text-primary-color'>
            {/* Content Todo */}
            <div className='content-todo flex flex-col sm:flex-row items-center justify-between gap-x-1 gap-y-3'>
                {/* Todo Text */}
                <div className='todo-text flex items-center gap-1 w-full sm:w-fit order-1 sm:-order-1'>
                    {/* Loading Spinner or Complete Action */}
                    {
                        submitting ? (
                            <LoadingSpinner />
                        ) : (
                            <CompletedAction todoItem={todoItem} />
                        )
                    }
                    {/* Label Todo Text */}
                    <label className='cursor-pointer' title='Click to Complete This Todo'>
                        {/* Checkbox Input */}
                        <input
                            type='checkbox'
                            className='hidden'
                            name='update-todo-completed'
                            onChange={handleCompleted}
                        />
                        <p className={`line-clamp-1 font-medium transition ${completed ? "text-green-color line-through opacity-80" : "sm:hover:text-green-color sm:hover:opacity-80"}`}>{title}</p>
                    </label>
                </div>
                {/* Todo Actions */}
                <div className='todo-actions flex items-center justify-between sm:justify-start gap-1 w-full sm:w-fit'>
                    {/* Date Display */}
                    <div className='date-display'>
                        <p className='hidden md:block text-nowrap'>{fullDateDisplay}</p>
                        <p className='md:hidden text-nowrap'>{shortDateDisplay.replace(" ", " at ")}</p>
                    </div>
                    {/* Actions */}
                    <div className='actions flex items-center gap-1'>
                        {/* Action Delete */}
                        <DeleteAction todoItem={todoItem} />
                        {/* Action Edit */}
                        <EditAction editTodo={editTodo} setEditTodo={setEditTodo} />
                        {/* Action Featured */}
                        <FeaturedAction todoItem={todoItem} />
                    </div>
                </div>
            </div>
            {/* Edit Todo Form */}
            {
                editTodo && (
                    <FormEditTodo todoItem={todoItem} editTodo={editTodo} setEditTodo={setEditTodo} />
                )
            }
        </div>
    )
}

export default TodoItem;