import React from "react";
import PropTypes from "prop-types";

const TodoListItem = (props) => {
  return <li>{props.todo.title}</li>;
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoListItem;
