import React, { useState } from "react";
import PropTypes from "prop-types";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault(event);
    if (todoTitle.trim() !== "") {
      const newTodo = {
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

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
