import { Todo } from "./types";
export const countTodosByDate = (todos: Todo[]) => {
  const countByDate: Record<string, number> = {};
  todos.forEach((todo) => {
    if (todo.completedAt) {
      const dateString = todo.completedAt.toISOString().split("T")[0];
       countByDate[dateString] = (countByDate[dateString] || 0) + 1;
    }
  });
  return countByDate;
};
