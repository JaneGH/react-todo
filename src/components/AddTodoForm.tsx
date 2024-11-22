import React, { useState, ChangeEvent, FormEvent } from "react";
import { AddTodoFormProps, Todo } from "../utils/types"; 

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
      <label htmlFor="todoTitle">Title</label>
      <input
        id="todoTitle"
        name="title"
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
