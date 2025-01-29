import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./AddTodoForm.module.css"; 
import { AddTodoFormProps } from "../../utils/types";
import InputWithLabel from "../InputWithLabel/InputWithLabel";

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState<string>("");

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const todoTitleStr = todoTitle.trim();
    if (todoTitleStr !== "") {
      onAddTodo(todoTitleStr);
      setTodoTitle("");
    }
  };

  return (
    <form onSubmit={handleAddTodo} className={styles["add-todo-form"]}>
      <InputWithLabel value={todoTitle} onChange={handleTitleChange}>
        Title
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
