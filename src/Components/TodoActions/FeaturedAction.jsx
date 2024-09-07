import React, { useState } from 'react';
import { UPDATE_TODO_API } from '../../Utils/Requests';
import LoadingSpinner from '../LoadingSpinner';
import { useDispatch } from 'react-redux';
import { updateTodoStore } from '../../Store/slices/todosSlice';

function FeaturedAction({ todoItem }) {

    const {
        featured
    } = todoItem.attributes;

    const dispatch = useDispatch();

    const [submitting, setSubmitting] = useState(false);

    const handleFeatured = async () => {
        if (!submitting) {
            setSubmitting(true);
            UPDATE_TODO_API({
                featured: !featured
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
            title={featured ? "Un Featured Todo" : "Featured Todo"}
            disabled={submitting}
            onClick={handleFeatured}
            aria-label='Todo Featured'
            className='action-featured'
        >
            {
                submitting ? (
                    <LoadingSpinner />
                ) : (
                    featured ? (

                        <i className="fa-solid fa-star fa-fw"></i>
                    ) : (
                        <i className="fa-regular fa-star fa-fw"></i>
                    )
                )
            }
        </button>
    )
}

export default FeaturedAction;