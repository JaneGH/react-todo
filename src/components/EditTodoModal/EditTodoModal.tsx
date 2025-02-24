import React, { useState } from "react";
import styles from "./EditTodoModal.module.css";
import { EditTodoModalProps } from "../../utils/types";

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  todo,
  onSave,
  onCancel,
}) => {
  const [newTitle, setNewTitle] = useState<string>(todo.title);
  const [newDueDate, setNewDueDate] = useState<string>(todo.dueDate);

  const handleSave = () => {
    if (todo.id) {
      onSave(todo.id, newTitle, newDueDate);
    } else {
      console.error("Todo id is missing");
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDueDate(e.target.value);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edit Todo</h2>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Due Date</label>
          <input
            type="date"
            value={newDueDate}
            onChange={handleDueDateChange}
            className={styles.input}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={onCancel} className={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={handleSave} className={styles.saveBtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
