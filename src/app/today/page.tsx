import { connectDB } from "@/lib/db";
import Todo from "@/lib/models/Todo";
import TodoListItems from "@/components/layout/todolist/TodoListItems";

export default async function today() {
  await connectDB();

  // আজকের date range
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // শুধু আজকের tasks
  const todos = await Todo.find({
    createdAt: { $gte: todayStart, $lte: todayEnd },
  })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="px-8 md:px-18 min-h-screen bg-background-secondary w-full py-8">
      <h2 className="text-2xl font-semibold mb-4">Today's Tasks</h2>

      <TodoListItems initialTodos={JSON.parse(JSON.stringify(todos))} />
    </div>
  );
}
