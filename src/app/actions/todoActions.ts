"use server";

import { connectDB } from "@/lib/db";
import Todo from "@/lib/models/Todo";
import { todoSchema } from "@/lib/validations";

export async function createTodo(prevState: any, formData: FormData) {
  await connectDB();

  const title = formData.get("title");

  const result = todoSchema.safeParse({ title });

  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
    };
  }

  await Todo.create({
    title,
  });

  return { success: true };
}

export async function toggleTodo(id: string, completed: boolean) {
  await connectDB();

  await Todo.findByIdAndUpdate(id, {
    completed,
  });
}
