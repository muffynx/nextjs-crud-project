"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Add this import

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(false);
  const [dueDate, setDueDate] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) =>{
    e.preventDefault(); // ป้องกัน
    if(!title || !content || !dueDate){
        setError("Please complete all inputs");
        return;
    }
    try {
        const res = await fetch("/api/posts", { // Use relative URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content, status, dueDate }),
        });

        if (res.ok) {
            router.push('/');
        } else {
            const data = await res.json();
            throw new Error(data.message || "Failed to create a post");
        }
    } catch (error) {
        console.error(error);
        setError(error.message);
    }
};

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Create Task</h3>
      <hr className="my-3" />
      <Link href="/" className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2">
        Go back
      </Link>
      
      <form onSubmit={handleSubmit}> 
        <input value={title}onChange={(e) => setTitle(e.target.value)}className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"placeholder="Task Title"/>
        <textarea onChange={(e) =>setContent(e.target.value)} name='' id=''cols="30" rows="10" className='w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2'placeholder='Enter your Detail'></textarea>
        <div className="flex items-center my-3">
          <label className="mr-3">Status:</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)}className="sr-only peer"/>
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {status ? "Completed" : "Not Completed"}
            </span>
          </label>
        </div>

        <div className="my-3">
          <label className="mr-3">Due Date:</label>
          <input
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            type="date"
            className="block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          />
        </div>

    
        <button type="submit" className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2">
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;
