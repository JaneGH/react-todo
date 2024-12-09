import { useEffect, useState } from "react";
import { Todo } from "../utils/types";

function useSemiPersistentState(): [
  Todo[],
  React.Dispatch<React.SetStateAction<Todo[]>>
] {
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const savedTodoList = localStorage.getItem("savedTodoList");
    return savedTodoList ? (JSON.parse(savedTodoList) as Todo[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
}

export default useSemiPersistentState;
