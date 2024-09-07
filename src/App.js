import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header";
import AddTodo from "./Components/AddTodo";
import CompletedTodos from "./Components/CompletedTodos";
import IncompleteTodos from "./Components/IncompleteTodos";
import { GET_TODOS_API } from "./Store/slices/todosSlice";
import { useUser } from "@clerk/clerk-react";
import ConfirmDeleteTodo from "./Components/ConfirmDeleteTodo";

function App() {

  const { user } = useUser();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch(GET_TODOS_API({ userEmail: user.primaryEmailAddress.emailAddress }));
  }, [dispatch, user]);

  const { todosData: { data } } = useSelector(state => state.todos);

  return (
    <div className="App bg-black-color text-white min-h-screen flex items-center justify-center px-5">
      {/* Todos Container */}
      <div className="todos-container w-full md:w-[650px] rounded-md bg-primary-color/20 relative">
        {/* Confirm Delete */}
        <ConfirmDeleteTodo />
        {/* Head parP */}
        <div className={`space-y-10 bg-primary-color/20 p-3 md:p-5 ${user ? "rounded-t-md" : "rounded-md"} backdrop-blur-sm`}>
          {/* Header */}
          <Header />
          {/* Add Todo */}
          <AddTodo />
        </div>
        {/* Main Content */}
        <main className={`space-y-10 ${user && "p-3 md:p-5"} max-h-[400px] overflow-y-auto`}>
          {/* Incomplete Todos */}
          <IncompleteTodos todosList={data} />
          {/* Completed Todos */}
          <CompletedTodos todosList={data} />
        </main>
      </div>
    </div>
  );
}

export default App;
