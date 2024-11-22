import React from "react";
import { Todo } from "./types";

interface TodoListItemProps {
  todo: Todo;
  onRemoveTodo: (id: number) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onRemoveTodo }) => {
  const handleRemoveClick = () => {
    onRemoveTodo(todo.id);
  };

  return (
    <li className="todo-list-item">
      <span>{todo.title}</span>
      <button className="remove-btn" onClick={handleRemoveClick}>
        Remove
      </button>
    </li>
  );
};

export default TodoListItem;
