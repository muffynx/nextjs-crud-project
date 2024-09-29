import { get } from "mongoose";
import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";

import { NextResponse } from "next/server";

export async function POST(req){
    const {title,content,status,dueDate} = await req.json();
    console.log(title,content,status,dueDate);

  

    await connectMongoDB();
    await Post.create({title,content,status,dueDate});
    return NextResponse.json({message: "Post created"},{status: 201});
}

// ดึง post จาก database เพื่อมาแสดง
export async function GET(){
    await connectMongoDB();
    const tasks = await Post.find({});
    return NextResponse.json({tasks});
}

export async function DELETE(req){
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({message: "Task deleted"},{status:200})
}