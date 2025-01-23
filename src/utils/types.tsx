export interface Todo {
  id: string;
  title: string;
  dueDate: Date | null;
  completedAt: Date | null;
}

export interface TodoListItemProps {
  todo: Todo;
  onRemoveTodo: (id: string) => void;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
}

export interface TodoListProps {
  todoList: Todo[];
  onRemoveTodo: (id: string) => void;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
}

export interface AddTodoFormProps {
  onAddTodo: (todo: { title: string; dueDate: Date | null }) => void;
}

export interface InputWithLabelProps {
  value: string;
  children: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Todo {
  title: string;
  dueDate: Date | null;
  createdTime: string;
  completedAt: Date | null;
}

export interface TodoContainerProps {
  tableName: string;
}

export interface AirtableResponse {
  id: string;
  fields: {
    title: string;
    completedAt: Date | null;
    dueDate: Date | null;
  };
  createdTime: string;
}

