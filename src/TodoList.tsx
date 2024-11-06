import React from "react";
import TodoListItem from "./TodoListItem";

interface Todo {
  id: number;
  title: string;
}

interface TodoListProps {
  todoList: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todoList }) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
