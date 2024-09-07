import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { useUser } from '@clerk/clerk-react';

function CompletedTodos({ todosList }) {

    const { user } = useUser();

    const [completeTodos, setCompleteTodos] = useState([]);

    useEffect(() => {
        setCompleteTodos(todosList.filter(todo => todo.attributes.completed));
    }, [todosList]);

    if (!user) return;

    return (
        <div className="completed-todos py-2">
            <p className="font-medium mb-3">Done - {completeTodos.length}</p>
            {/* Todos Items */}
            {
                completeTodos.length === 0 ? (
                    <p className='text-center opacity-70'>No completed todos found. Add some tasks to see them here.</p>
                ) : (
                    <div className='todos-items space-y-2'>
                        {
                            completeTodos.map((todo, index) => (
                                <TodoItem todoItem={todo} key={index} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default CompletedTodos;