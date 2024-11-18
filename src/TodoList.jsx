import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const todoList = [
    { id: 1, title: "Read a book" },
    { id: 2, title: "Prepare a dinner" },
    { id: 3, title: "Learn 5 spanish words" },
  ];

  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
