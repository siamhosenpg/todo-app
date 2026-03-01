"use server";

import { connectDB } from "@/lib/db";
import Todo from "@/lib/models/Todo";
import { todoSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// -------------------- CREATE TODO --------------------
export async function createTodo(
  _prevState: any,
  data: { title: string; description?: string },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { error: "Not authenticated" };

  await connectDB();

  const result = todoSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const todo = await Todo.create({
    title: data.title,
    description: data.description,
    completed: false,
    userId: session.user.id, // link todo to user
  });

  revalidatePath("/"); // refresh server component
  return { todo };
}

// -------------------- TOGGLE TODO --------------------
export async function toggleTodo(id: string, completed: boolean) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Not authenticated");

  await connectDB();

  const todo = await Todo.findOneAndUpdate(
    { _id: id, userId: session.user.id }, // only allow own todos
    { completed },
    { new: true },
  );

  revalidatePath("/");
  return { todo };
}

// -------------------- DELETE TODO --------------------
export async function deleteTodo(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Not authenticated");

  await connectDB();

  const deleted = await Todo.findOneAndDelete({
    _id: id,
    userId: session.user.id,
  });

  revalidatePath("/");
  return { deleted };
}
