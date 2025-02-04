export interface Todo {
  id: string;
  title: string;
}

export interface TodoListItemProps {
  todo: Todo;
  onRemoveTodo: (id: string) => void;
}

export interface TodoListProps {
  todoList: Todo[];
  onRemoveTodo: (id: string) => void;
}

export interface AddTodoFormProps {
  onAddTodo: (title: string) => void;
}

export interface InputWithLabelProps {
  value: string;
  children: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Todo {
  title: string;
  createdTime: string;
}

export interface AirtableResponse {
  id: string;
  fields: {
    title: string;
  };
  createdTime: string;
}

