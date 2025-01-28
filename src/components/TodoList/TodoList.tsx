import React, { useState } from "react";
import styles from "./TodoList.module.css";
import TodoListItem from "../TodoListItem/TodoListItem";
import { TodoListProps } from "../../utils/types";

const TodoList: React.FC<TodoListProps> = ({
  todoList,
  onRemoveTodo,
  onToggleComplete,
}) => {
  const [todos, setTodos] = useState(todoList);
   const itemsPerPage = 7;
   const [currentPage, setCurrentPage] = useState(1);
   const totalPages = Math.ceil(todoList.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentItems = todoList.slice(startIndex, startIndex + itemsPerPage);


   const handlePageChange = (page: number) => {
     if (page >= 1 && page <= totalPages) {
       setCurrentPage(page);
     }
   };

  const handleEditTodo = (
    id: string,
    newTitle: string,
    newDueDate: Date | null
  ) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            title: newTitle,
            dueDate: newDueDate,
          }
        : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <ul className={styles.todoList}>
        {currentItems.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onToggleComplete={onToggleComplete}
            onEditTodo={handleEditTodo}
          />
        ))}
      </ul>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${styles.pageButton} ${styles.prevButton}`}
        >
          &lt;
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.activePage : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${styles.pageButton} ${styles.nextButton}`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TodoList;
