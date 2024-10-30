import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const App = () => {
  return (
    <div>
      <h1>My Todo List</h1>
      <TodoList />
      <AddTodoForm />
    </div>
  );
};

export default App;
