import React from "react";
import { TodoListItemProps } from "../utils/types"; 


const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  return <li>{todo.title}</li>;
};

export default TodoListItem;
