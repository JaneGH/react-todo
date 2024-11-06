import React from "react";
import PropTypes from "prop-types";

function TodoListItem({todo}) {
  return <li>{todo.title}</li>;
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoListItem;
