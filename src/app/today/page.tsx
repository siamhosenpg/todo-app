import { connectDB } from "@/lib/db";
import Todo from "@/lib/models/Todo";
import TodoListItems from "@/components/layout/todolist/TodoListItems";
import ProtectedRoute from "../ProtectedRoute";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Today() {
  await connectDB();

  // Current logged-in user session
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>Please login to view today's tasks.</p>;
  }

  // আজকের date range
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // শুধু current user's আজকের tasks fetch করা
  const todos = await Todo.find({
    userId: session.user.id,
    createdAt: { $gte: todayStart, $lte: todayEnd },
  })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <ProtectedRoute>
      <div className="px-8 md:px-18 min-h-[calc(100vh-72px)] bg-background-secondary w-full py-8">
        <h2 className="text-2xl font-semibold mb-4">Today's Tasks</h2>

        <TodoListItems initialTodos={JSON.parse(JSON.stringify(todos))} />
      </div>
    </ProtectedRoute>
  );
}
