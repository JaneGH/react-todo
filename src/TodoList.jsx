import React from "react";

const TodoList = () => {
  const todoList = [
    { id: 1, title: "Read a book" },
    { id: 2, title: "Prepare a dinner" },
    { id: 3, title: "Learn 5 spanish words" },
  ];

  return (
    <>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
