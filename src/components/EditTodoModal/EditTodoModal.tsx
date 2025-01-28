import React, { useState } from "react";
import styles from "./EditTodoModal.module.css";
import { EditTodoModalProps } from "../../utils/types";

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  todo,
  onSave,
  onCancel,
}) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDueDate, setNewDueDate] = useState(todo.dueDate);

  const handleSave = () => {
    onSave(todo.id, newTitle, newDueDate);
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
            onChange={(e) => setNewTitle(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Due Date</label>
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
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
