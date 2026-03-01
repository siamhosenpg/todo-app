import { connectDB } from "@/lib/db";
import Todo from "@/lib/models/Todo";
import ProtectedRoute from "../ProtectedRoute";
import TodoListItems from "@/components/layout/todolist/TodoListItems";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Completed() {
  await connectDB();

  // Get current user session
  const session = await getServerSession(authOptions);
  if (!session) {
    // user login না থাকলে redirect বা empty page দেখাতে পারো
    return <p>Please login to view your completed todos.</p>;
  }

  // শুধু current user's completed todos fetch করা
  const todos = await Todo.find({ completed: true, userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <ProtectedRoute>
      <div className="px-8 md:px-18 min-h-[calc(100vh-72px)] bg-background-secondary w-full py-8">
        <h2 className="text-2xl font-semibold mb-4">Completed Tasks</h2>
        <TodoListItems initialTodos={JSON.parse(JSON.stringify(todos))} />
      </div>
    </ProtectedRoute>
  );
}
