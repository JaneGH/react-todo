import React from "react";
import styles from "./TodoListItem.module.css"; 
import { TodoListItemProps } from "../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"; 

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onRemoveTodo }) => {
  const handleRemoveClick = () => {
    onRemoveTodo(todo.id);
  };

  return (
    <li className={styles.todoListItem}>
      <span className={styles.todoListItemText}>{todo.title}</span>
      <button className={styles.removeBtn} onClick={handleRemoveClick}>
        <FontAwesomeIcon icon={faTrashAlt} className={styles.removeIcon} />
        <span className={styles.removeText}>Remove</span>
      </button>
    </li>
  );
};

export default TodoListItem;