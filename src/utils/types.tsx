export interface Todo {
  id: number;
  title: string;
}

export interface TodoListItemProps {
  todo: Todo;
}

export interface TodoListProps {
  todoList: Todo[];
}

export interface AddTodoFormProps {
  onAddTodo: (todo: Todo) => void;
}
