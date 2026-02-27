import { connectDB } from "@/lib/db";
import Todo from "@/lib/models/Todo";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default async function Home() {
  await connectDB();

  const todos = await Todo.find().sort({ createdAt: -1 });

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <TodoForm />
      <TodoList initialTodos={JSON.parse(JSON.stringify(todos))} />
    </div>
  );
}
