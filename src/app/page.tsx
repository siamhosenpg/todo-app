import { connectDB } from "@/lib/db";
import Todo from "@/lib/models/Todo";
import TodoForm from "@/components/TodoForm";

import TodoListitems from "@/components/layout/todolist/TodoListItems";

export default async function Home() {
  await connectDB();

  const todos = await Todo.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="  px-18 min-h-screen bg-background-secondary w-full py-8">
      <TodoForm />
      <TodoListitems initialTodos={JSON.parse(JSON.stringify(todos))} />
    </div>
  );
}
