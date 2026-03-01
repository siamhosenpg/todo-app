import { connectDB } from "@/lib/db";
import Todo from "@/lib/models/Todo";
import TodoListItems from "@/components/layout/todolist/TodoListItems";

export default async function completed() {
  await connectDB();

  // শুধুমাত্র completed tasks fetch করা
  const todos = await Todo.find({ completed: true })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="px-18 min-h-screen bg-background-secondary w-full py-8">
      <h2 className="text-2xl font-semibold mb-4">Completed Tasks</h2>

      <TodoListItems initialTodos={JSON.parse(JSON.stringify(todos))} />
    </div>
  );
}
