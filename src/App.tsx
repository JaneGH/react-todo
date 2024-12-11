import React, { useEffect, useState } from "react";
import "./styles/styles.css";
import { Todo } from "./utils/types";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

const App: React.FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [todoList, setTodoList] = useState<Todo[]>(() => {
      const savedTodoList = localStorage.getItem("savedTodoList");
      return savedTodoList ? (JSON.parse(savedTodoList) as Todo[]) : [];
    });

    useEffect(() => {
        const fetchData = new Promise<{ data: { todoList: Todo[] } }>((resolve, reject) => {
            try {
                setIsLoading(true);
                setTimeout(() => {
                    resolve({ data: { todoList } });
                }, 2000);
            } catch (error) {
                reject(error);
            }
        });

        fetchData
          .then((result) => {
            setTodoList(result.data.todoList);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error during initialization:", error);
            setIsLoading(false);
          });
    }, [todoList]);

     useEffect(() => {
       if (!isLoading) {
         localStorage.setItem("savedTodoList", JSON.stringify(todoList));
       }
     }, [todoList]);

  const addTodo = (newTodo: Todo) => {
      setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  };

  const removeTodo = (id: number) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  return (
    <React.Fragment>
      <h1>My Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </React.Fragment>
  );
};

export default App;
