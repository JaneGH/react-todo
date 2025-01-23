import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./AddTodoForm.module.css";
import { AddTodoFormProps } from "../../utils/types";
import InputWithLabel from "../InputWithLabel/InputWithLabel";

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTodoTitle(event.target.value);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedDate = event.target.value
      ? new Date(event.target.value)
      : null;
    setDueDate(selectedDate);
  };

  const handleAddTodo = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const todoTitleStr = todoTitle.trim();
    if (todoTitleStr !== "") {
      onAddTodo({
        title: todoTitleStr,
        dueDate,
      });
      setTodoTitle("");
      setDueDate(null);
    }
  };

  return (
    <form onSubmit={handleAddTodo} className={styles["add-todo-form"]}>
      <InputWithLabel value={todoTitle} onChange={handleTitleChange}>
        Title
      </InputWithLabel>

      <label htmlFor="dueDate" className="inputLabel">
        Due Date
      </label>
      <input
        type="date"
        id="dueDate"
        value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
        onChange={handleDateChange}
        className="inputField"
      />

      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
