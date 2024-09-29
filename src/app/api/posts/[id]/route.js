import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const post = await Post.findOne({ _id: id });
  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { newTitle, newContent, newStatus, newDueDate  } = await req.json();
  await connectMongoDB();
  await Post.findByIdAndUpdate(id, {
    title: newTitle,
    content: newContent,
    status: newStatus,
    dueDate: newDueDate,
  });
  return NextResponse.json({ message: "Task updated" }, { status: 200 });
}
