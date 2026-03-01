import { connectDB } from "@/lib/db";
import Todo from "@/lib/models/Todo";
import TodosClient from "@/components/layout/TodosClient";
import ProtectedRoute from "./ProtectedRoute";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  await connectDB();

  // Current logged-in user session
  const session = await getServerSession(authOptions);

  // শুধু current user's todos fetch করা
  const todos = await Todo.find({ userId: session?.user.id })
    .sort({ createdAt: -1 })
    .lean();

  // _id string-এ convert করা
  const formatted = todos.map((t: any) => ({
    ...t,
    _id: t._id.toString(),
  }));

  return (
    <ProtectedRoute>
      <div className="px-8 md:px-18 min-h-[calc(100vh-72px)] bg-background-secondary w-full py-8">
        <TodosClient initialTodos={formatted} />
      </div>
    </ProtectedRoute>
  );
}
