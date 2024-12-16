import React from "react";
import "./styles/styles.css";
import { Todo } from "./utils/types";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import useSemiPersistentState from "./hooks/useSemiPersistentState";

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
