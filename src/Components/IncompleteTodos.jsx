import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { useUser } from '@clerk/clerk-react';

function IncompleteTodos({ todosList }) {

    const { user } = useUser();

    const [incompleteTodos, setIncompleteTodos] = useState([]);

    useEffect(() => {
        setIncompleteTodos(todosList.filter(todo => !todo.attributes.completed));
    }, [todosList]);

    if (!user) return;

    return (
        <div className="incomplete-todos py-2">
            <p className="font-medium mb-3">Tasks to do - {incompleteTodos.length}</p>
            {/* Todos Items */}
            {
                incompleteTodos.length === 0 ? (
                    <p className="text-center opacity-70">No tasks left to complete.</p>
                ) : (
                    <div className='todos-items space-y-2'>
                        {
                            incompleteTodos.map((todo, index) => (
                                <TodoItem todoItem={todo} key={index} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default IncompleteTodos;