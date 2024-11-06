import React from "react";

interface Todo {
  title: string;
}

interface TodoListItemProps {
  todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  return <li>{todo.title}</li>;
};

export default TodoListItem;
