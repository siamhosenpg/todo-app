import { connectDB } from "@/lib/db";
import Todo from "@/lib/models/Todo";

import TodosClient from "@/components/layout/TodosClient";

export default async function Home() {
  await connectDB();

  const todos = await Todo.find().sort({ createdAt: -1 }).lean();
  const formatted = todos.map((t: any) => ({
    ...t,
    _id: t._id.toString(),
  }));
  return (
    <div className=" px-8 md:px-18 min-h-screen bg-background-secondary w-full py-8">
      <TodosClient initialTodos={formatted} />
    </div>
  );
}
