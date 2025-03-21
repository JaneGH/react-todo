import React, { useEffect, useState } from "react";
import { Todo, AirtableResponse, TodoContainerProps } from "../../utils/types"; // Import the types
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoList from "../TodoList/TodoList";
import styles from "./TodoContainer.module.css";

const TodoContainer: React.FC<TodoContainerProps> = ({ tableName }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [sortOption, setSortOption] = useState<string>("createdTimeAscending");
  const [filterOption, setFilterOption] = useState<string>("all");

  const sortTodoList = (list: Todo[], option: string): Todo[] => {
    const newList = [...list];
    return newList.sort((objectA, objectB) => {
      let comparisonResult = 0;
      let titleA, titleB, createdTimeA, createdTimeB;
      switch (option) {
        case "dueTimeAscending":
          if (objectA.dueDate && objectB.dueDate) {
            const timestampA = new Date(objectA.dueDate).getTime();
            const timestampB = new Date(objectB.dueDate).getTime();
            comparisonResult = timestampA - timestampB;
          } else if (objectA.dueDate && !objectB.dueDate) {
            comparisonResult = 1;
          } else if (!objectA.dueDate && objectB.dueDate) {
            comparisonResult = -1;
          } else {
            comparisonResult = 0;
          }
          break;
        case "dueTimeDescending":
          if (objectA.dueDate && objectB.dueDate) {
            const timestampA = new Date(objectA.dueDate).getTime();
            const timestampB = new Date(objectB.dueDate).getTime();
            comparisonResult = timestampB - timestampA;
          } else if (objectA.dueDate && !objectB.dueDate) {
            comparisonResult = -1;
          } else if (!objectA.dueDate && objectB.dueDate) {
            comparisonResult = 1;
          } else {
            comparisonResult = 0;
          }
          break;
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

  const editTodo = async (
    id: string,
    newTitle: string,
    newDueDate: Date | null
  ) => {
    try {
      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${tableName}/${id}`;

      const options = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            title: newTitle,
            dueDate: newDueDate ? newDueDate.toISOString() : null,
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
            ? { ...todo, title: newTitle, dueDate: newDueDate }
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
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

  const filteredTodoList = todoList.filter((todo) => {
    switch (filterOption) {
      case "completed":
        return todo.completedAt != null;
      case "inProgress":
        return todo.completedAt == null;
      case "all":
      default:
        return true;
    }
  });

  return (
    <div className={styles.container}>
      <AddTodoForm onAddTodo={addTodo} />

      <div className={styles.filterSortWrapper}>
        <div className={styles.filterSortItem}>
          <label htmlFor="filter-select" className={styles.labelStyle}>
            Filter by:
          </label>
          <select
            id="filter-select"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className={styles.selectStyle}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="inProgress">In Progress</option>
          </select>
        </div>

        <div className={styles.filterSortItem}>
          <label htmlFor="sort-select" className={styles.labelStyle}>
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={handleSortChange}
            className={styles.selectStyle}
          >
            {/* <option value="createdTimeAscending">Time Asc</option> */}
            {/* <option value="createdTimeDescending">Time Desc</option> */}
            <option value="dueTimeAscending">Due Asc</option>
            <option value="dueTimeDescending">Due Desc</option>
            <option value="titleAscending">Title Asc</option>
            <option value="titleDescending">Title Desc</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList
          todoList={filteredTodoList}
          onRemoveTodo={removeTodo}
          onToggleComplete={toggleComplete}
          onEditTodo={editTodo}
        />
      )}
    </div>
  );
};

export default TodoContainer;
