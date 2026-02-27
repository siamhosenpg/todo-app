import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Todo from "@/lib/models/Todo";

export async function GET(req: NextRequest) {
  await connectDB();

  const search = req.nextUrl.searchParams.get("search");

  const todos = await Todo.find({
    title: { $regex: search, $options: "i" },
  }).sort({ createdAt: -1 });

  return NextResponse.json(todos);
}

export async function DELETE(req: NextRequest) {
  await connectDB();

  const { id } = await req.json();

  await Todo.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
