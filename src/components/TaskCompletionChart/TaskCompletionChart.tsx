import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { format } from "date-fns";
import { TaskCompletionChartProps, Todo } from "../../utils/types";
import styles from "./TaskCompletionChart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TaskCompletionChart: React.FC<TaskCompletionChartProps> = ({ todos }) => {
  const groupByDate = (todos: Todo[]) => {
    return todos.reduce((acc, todo) => {
      if (todo.completedAt) {
        const dateStr = format(new Date(todo.completedAt), "yyyy-MM-dd");
        acc[dateStr] = (acc[dateStr] || 0) + 1;
      }
      return acc;
    }, {} as { [date: string]: number });
  };

  const groupedData = groupByDate(todos);
  const dates = Object.keys(groupedData);
  const counts = Object.values(groupedData);

  const borderColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--chart-border-color")
    .trim();
  const backgroundColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--chart-background-color")
    .trim();

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Completed tasks",
        data: counts,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Completion Date",
        },
        type: "category" as const,
      },
      y: {
        title: {
          display: true,
          text: "Number of Tasks",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Completed Tasks Chart</h2>
      <div className={styles.chartWrapper}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TaskCompletionChart;
