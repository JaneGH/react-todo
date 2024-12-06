import React, { useState, ChangeEvent, FormEvent } from "react";
import InputWithLabel from "./InputWithLabel";
import { AddTodoFormProps, Todo } from "./types/types";

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState<string>("");

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (todoTitle.trim() !== "") {
      const newTodo: Todo = {
        title: todoTitle,
        id: Date.now(),
      };
      onAddTodo(newTodo);
      setTodoTitle("");
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel value={todoTitle} onChange={handleTitleChange}>
        Title
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
