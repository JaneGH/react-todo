import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

// Define a type for the Todo item
interface Todo {
  id: number;
  title: string;
}

function useSemiPersistentState(): [
  Todo[],
  React.Dispatch<React.SetStateAction<Todo[]>>
] {
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const savedTodoList = localStorage.getItem("savedTodoList");
    return savedTodoList ? (JSON.parse(savedTodoList) as Todo[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
}

const App: React.FC = () => {
  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo: Todo) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  };

  return (
    <React.Fragment>
      <h1>My Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </React.Fragment>
  );
};

export default App;
