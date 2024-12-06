import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./styles/styles.css";
import { Todo } from "./types/types";

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

  const removeTodo = (id: number) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  return (
    <React.Fragment>
      <h1>My Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </React.Fragment>
  );
};

export default App;
