import React, { useState, useEffect } from "react";
import styles from "./TodoListItem.module.css";
import { TodoListItemProps } from "../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  onRemoveTodo,
  onToggleComplete,
}) => {
  const [completedAt, setCompletedAt] = useState<Date | null>(todo.completedAt);

  useEffect(() => {
    setCompletedAt(todo.completedAt);
  }, [todo.completedAt]);

  const formattedDueDate =
    todo.dueDate instanceof Date
      ? todo.dueDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      : todo.dueDate;

  const handleRemoveClick = () => {
    onRemoveTodo(todo.id);
  };

  const handleCompleteClick = () => {
    const newStatusCompleted = completedAt == null;
    const newStatus = completedAt ? null : new Date();
    setCompletedAt(newStatus);
    onToggleComplete(todo.id, newStatusCompleted);
  };

  return (
    <tr
      className={`${styles.todoListItem} ${
        completedAt ? styles.completed : ""
      }`}
    >
      <td>
        <button className={styles.completeBtn} onClick={handleCompleteClick}>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className={`${styles.checkIcon} ${
              completedAt ? styles.checked : styles.empty
            }`}
          />
        </button>
      </td>
      <td
        className={`${styles.todoListItemText} ${
          completedAt ? styles.completedText : ""
        }`}
      >
        {todo.title}
      </td>
      <td className={styles.dueDateText}>{formattedDueDate}</td>
      <td>
        <button className={styles.removeBtn} onClick={handleRemoveClick}>
          <FontAwesomeIcon icon={faTrashAlt} className={styles.removeIcon} />
          <span className={styles.removeText}>Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default TodoListItem;
