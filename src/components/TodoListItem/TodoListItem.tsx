import React, { useState } from "react";
import styles from "./TodoListItem.module.css";
import { TodoListItemProps } from "../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheckCircle, faPen } from "@fortawesome/free-solid-svg-icons";
import EditTodoModal from "../EditTodoModal/EditTodoModal";

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  onRemoveTodo,
  onToggleComplete,
  onEditTodo,
}) => {
  const [completedAt, setCompletedAt] = useState<Date | null>(todo.completedAt);
  const [isEditing, setIsEditing] = useState(false);

  const handleRemoveClick = () => {
    onRemoveTodo(todo.id);
  };

  const handleCompleteClick = () => {
    const newStatusCompleted = completedAt == null;
    const newStatus = completedAt ? null : new Date();
    setCompletedAt(newStatus);
    onToggleComplete(todo.id, newStatusCompleted);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleModalSave = (
    id: string,
    newTitle: string,
    newDueDate: string
  ) => {
    const parsedDueDate = newDueDate ? new Date(newDueDate) : null;
    onEditTodo(id, newTitle, parsedDueDate);
    setIsEditing(false);
  };

  const handleModalCancel = () => {
    setIsEditing(false);
  };

  const formattedDueDate =
    todo.dueDate instanceof Date
      ? todo.dueDate.toISOString().split("T")[0] 
      : todo.dueDate || "";
  return (
    <>
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
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.btn} ${styles.editBtn}`}
              onClick={handleEditClick}
            >
              <FontAwesomeIcon icon={faPen} className={styles.icon} />
            </button>
            <button
              className={`${styles.btn} ${styles.removeBtn}`}
              onClick={handleRemoveClick}
            >
              <FontAwesomeIcon icon={faTrashAlt} className={styles.icon} />
            </button>
          </div>
        </td>
      </tr>

      {isEditing && (
        <EditTodoModal
          todo={{
            id: todo.id,
            title: todo.title,
            dueDate: formattedDueDate,
          }}
          onSave={handleModalSave}
          onCancel={handleModalCancel}
        />
      )}
    </>
  );
};

export default TodoListItem;
