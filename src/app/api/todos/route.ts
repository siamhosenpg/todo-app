// app/api/todos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Todo from "@/lib/models/Todo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json([], { status: 401 }); // Not authenticated
  }

  const search = req.nextUrl.searchParams.get("search") || "";

  // শুধুমাত্র logged-in user-এর todo fetch
  const todos = await Todo.find({
    userId: session.user.id,
    title: { $regex: search, $options: "i" },
  })
    .sort({ createdAt: -1 })
    .lean();

  // ObjectId কে string এ convert করা
  const formatted = todos.map((t) => ({ ...t, _id: t._id.toString() }));

  return NextResponse.json(formatted);
}

export async function DELETE(req: NextRequest) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { success: false, error: "Not authenticated" },
      { status: 401 },
    );

  const { id } = await req.json();

  // শুধুমাত্র logged-in user-এর todo delete হবে
  const deleted = await Todo.findOneAndDelete({
    _id: id,
    userId: session.user.id,
  });

  if (!deleted)
    return NextResponse.json(
      { success: false, error: "Todo not found" },
      { status: 404 },
    );

  return NextResponse.json({ success: true });
}
