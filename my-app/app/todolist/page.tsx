import TodoList from "@/components/todolist/TodoList";

interface IParams {
  params: { id: number };
}

export default function TodoListPage({ params }: IParams) {
  return (
      <TodoList  />
  );
}