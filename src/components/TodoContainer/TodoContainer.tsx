import React, { useEffect, useState } from "react";
import { Todo, AirtableResponse, TodoContainerProps } from "../../utils/types"; // Import the types
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoList from "../TodoList/TodoList";

const TodoContainer: React.FC<TodoContainerProps> = ({ tableName }) => {
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
    }/${tableName}`;

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
        dueDate: record.fields.dueDate,
        completedAt: record.fields.completedAt,
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

  const addTodo = async ({
    title,
    dueDate,
  }: {
    title: string;
    dueDate: Date | null;
  }) => {
    try {
      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${tableName}`;

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            title: title,
            dueDate: dueDate ? dueDate.toISOString() : null,
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
        dueDate: dueDate,
        completedAt: null,
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


  const toggleComplete = async (id: string, isCompleted: boolean) => {
    try {
      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${tableName}/${id}`;

      const currentDate = new Date();
      const dateString = currentDate.toISOString().split("T")[0];

      const options = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            completedAt: isCompleted ? dateString : null,
          },
        }),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) =>
          todo.id === id
            ? { ...todo, completedAt: isCompleted ? currentDate : null }
            : todo
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating todo:", error.message);
      }
    }
  };


  const removeTodo = async (id: string) => {
    try {
      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${tableName}/${id}`;
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
  }, [tableName]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    setTodoList((prevTodoList) =>
      sortTodoList([...prevTodoList], selectedOption)
    );
  };

  return (
    <div>
      {/* <h1>{tableName}</h1> */}
      <AddTodoForm onAddTodo={addTodo} />
      <div>
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortOption} onChange={handleSortChange}>
          <option value="createdTimeAscending">Time Asc</option>
          <option value="createdTimeDescending">Time Desc</option>
          <option value="titleAscending">Title Asc</option>
          <option value="titleDescending">Title Desc</option>
        </select>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList
          todoList={todoList}
          onRemoveTodo={removeTodo}
          onToggleComplete={toggleComplete}
        />
      )}
    </div>
  );
};

export default TodoContainer;
