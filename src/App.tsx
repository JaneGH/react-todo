import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm"
import TodoList from "./components/TodoList/TodoList";
import { Todo, AirtableResponse } from "./utils/types";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [sortOption, setSortOption] = useState<string>("createdTimeAscending");

  const sortTodoList = (list: Todo[], option: string): Todo[] => {
    const newList = [...list];
    return newList.sort((objectA, objectB) => {
      let comparisonResult = 0;

      let titleA, titleB, createdTimeA, createdTimeB;
      switch (option) {
        case "createdTimeAscending":
          createdTimeA = new Date(objectA.createdTime).getTime();
          createdTimeB = new Date(objectB.createdTime).getTime();
          comparisonResult = createdTimeA - createdTimeB;
          break;
        case "createdTimeDescending":
          createdTimeA = new Date(objectA.createdTime).getTime();
          createdTimeB = new Date(objectB.createdTime).getTime();
          comparisonResult = createdTimeB - createdTimeA;
          break;
        case "titleAscending":
          titleA = objectA.title.toLowerCase();
          titleB = objectB.title.toLowerCase();
          comparisonResult = titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
          break;
        case "titleDescending":
          titleA = objectA.title.toLowerCase();
          titleB = objectB.title.toLowerCase();
          comparisonResult = titleA > titleB ? -1 : titleA < titleB ? 1 : 0;
          break;
        default:
          break;
      }

      return comparisonResult;
    });
  };

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

    //const sortedUrl = `${url}?sort[0][field]=title&sort[0][direction]=asc`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

    
      const data = await response.json();
      console.log("Airtable API response:", data);

      const todoData = data.records.map((record: AirtableResponse) => ({
        id: record.id,
        title: record.fields.title,
        createdTime: record.createdTime,
      }));

      
      const sortedData = sortTodoList(todoData, sortOption);
      setTodoList(sortedData);
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

      const newTodo = {
        id: data.id,
        title: title,
        createdTime: data.createdTime,
      };

      const sortedList = sortTodoList([newTodo, ...todoList], sortOption);
      setTodoList(sortedList);
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

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
     const selectedOption = event.target.value;
       setSortOption(selectedOption);
       setTodoList((prevTodoList) =>
                sortTodoList([...prevTodoList], selectedOption)
      );
  };

  return (
    <BrowserRouter>
      <div className={styles.appContainer}>
        <Routes>
          <Route
            path="/"
            element={
              <React.Fragment>
                <h1>My Todo List</h1>
                <AddTodoForm onAddTodo={addTodo} />
                <div>
                  <label className={styles.sortLabel} htmlFor="sort-select">
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={sortOption}
                    onChange={handleSortChange}
                    className={styles.sortSelect}
                  >
                    <option value="createdTimeAscending">Time Asc</option>
                    <option value="createdTimeDescending">Time Desc</option>
                    <option value="titleAscending">Title Asc</option>
                    <option value="titleDescending">Title Desc</option>
                  </select>
                </div>
                {isLoading ? (
                  <p className={styles.loading}>Loading...</p>
                ) : (
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                )}
              </React.Fragment>
            }
          />
          <Route path="/new" element={<h1>New Todo List</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
