import React from "react";
import TodoListItem from "./TodoListItem";
import { TodoListProps } from "../utils/types";


const TodoList: React.FC<TodoListProps> = ({ todoList, onRemoveTodo }) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
