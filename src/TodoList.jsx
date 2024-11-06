import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

function TodoList({ todoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TodoList;
