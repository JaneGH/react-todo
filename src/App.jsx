import React from 'react';

const todoList = [
  { id: 1, title: "Read a book" },
  { id: 2, title: "Prepare a dinner" },
  { id: 3, title: "Learn 5 spanish words" }
];

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;