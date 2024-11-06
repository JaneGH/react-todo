import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import React, { useState } from "react";

const App = () => {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (newTodo) => {
    setTodoList((todoList) => [...todoList, newTodo]);
  };

  return (
    <div>
      <h1>My Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
};

export default App;
