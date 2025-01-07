import React, { useEffect, useState } from "react";
import "./styles/styles.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import { Todo, AirtableResponse } from "./utils/types";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Airtable API response:", data);

      setTodoList(
        data.records.map((record: AirtableResponse) => ({
          id: record.id,
          title: record.fields.title,
        }))
      );
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching data:", error.message);
      }
      setIsLoading(false);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${import.meta.env.VITE_TABLE_NAME}`;
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            title: title,
          },
        }),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setTodoList((prevTodoList) => [
        ...prevTodoList,
        { id: data.id, title: title },
      ]);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding todo:", error.message);
      }
    }
  };

  const removeTodo = async (id: string) => {
    try {
      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${import.meta.env.VITE_TABLE_NAME}/${id}`;
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting todo:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
