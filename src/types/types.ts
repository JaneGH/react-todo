export interface Todo {
  title: string;
  id: number;
}

export interface TodoListItemProps {
  todo: Todo;
  onRemoveTodo: (id: number) => void;
}

export interface TodoListProps {
  todoList: Todo[];
  onRemoveTodo: (id: number) => void;
}

export interface AddTodoFormProps {
  onAddTodo: (todo: Todo) => void;
}

export interface InputWithLabelProps {
  value: string;
  children: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}