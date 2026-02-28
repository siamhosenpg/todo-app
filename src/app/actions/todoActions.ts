"use server";

import { connectDB } from "@/lib/db";
import Todo from "@/lib/models/Todo";
import { todoSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

// -------------------- CREATE TODO --------------------
export async function createTodo(
  _prevState: any,
  data: { title: string; description?: string },
) {
  await connectDB();

  // Validate
  const result = todoSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const todo = await Todo.create({
    title: data.title,
    description: data.description,
    completed: false,
  });

  // Revalidate server component path (for SSR lists)
  revalidatePath("/");

  return { todo }; // return created todo for optimistic UI
}

// -------------------- TOGGLE TODO --------------------
export async function toggleTodo(id: string, completed: boolean) {
  await connectDB();

  // Direct update, race condition safe if client always sends last click state
  const todo = await Todo.findByIdAndUpdate(
    id,
    { completed },
    { new: true }, // return updated document
  );

  revalidatePath("/"); // refresh server components

  return { todo };
}

// -------------------- DELETE TODO --------------------
export async function deleteTodo(id: string) {
  await connectDB();

  const deleted = await Todo.findByIdAndDelete(id);

  revalidatePath("/"); // refresh server components

  return { deleted };
}
