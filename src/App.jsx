import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import React, { useState } from "react";

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  return (
    <div>
      <h1>My Todo List</h1>
      <TodoList />
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>{newTodo}</p>
    </div>
  );
};

export default App;
