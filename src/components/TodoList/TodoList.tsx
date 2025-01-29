import React from "react";
import styles from "./TodoList.module.css";
import TodoListItem from "../TodoListItem/TodoListItem";
import { TodoListProps } from "../../utils/types";

const TodoList: React.FC<TodoListProps> = ({ todoList, onRemoveTodo }) => {
  return (
    <ul className={styles.todoList}>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
