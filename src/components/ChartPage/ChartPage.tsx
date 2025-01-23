import React, { useEffect, useState } from "react";
import TaskCompletionChart from "../TaskCompletionChart/TaskCompletionChart";
import { AirtableResponse, Todo } from "../../utils/types";
import "./ChatPage.module.css";
// import TodoContainer from "../TodoContainer/TodoContainer";

const ChatPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      };

      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${"Default"}`;

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        const todoData = data.records.map((record: AirtableResponse) => ({
          id: record.id,
          title: record.fields.title,
          dueDate: record.fields.dueDate,
          completedAt: record.fields.completedAt,
          createdTime: record.createdTime,
        }));
        console.log("Fetched todos:", todoData);
        setTodos(todoData);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
     <div style={{ width: '100%', height: '100%' }}>
    <div className="chatPage">
      <h1 >Todo Chart Page</h1>
      <div className="taskChartContainer">
        <TaskCompletionChart todos={todos} />
        {/* <TodoContainer tableName={import.meta.env.VITE_TABLE_NAME} /> */}
      </div>
    </div>
     </div>
  );
};

export default ChatPage;
