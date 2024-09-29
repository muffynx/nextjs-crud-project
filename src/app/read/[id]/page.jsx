"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


function ReadPostPage({ params }) {
  const { id } = params;
  const [taskData, setTaskData] = useState({}); 


  const router = useRouter();

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newStatus, setNewStatus] = useState(false);
  const [newDueDate, setNewDueDate] = useState(""); 

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; 
  };


  const getPostsById = async (id) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch a post");
      }
      const data = await res.json();
      setTaskData(data.post);
      setNewTitle(data.post.title);
      setNewContent(data.post.content);
      setNewStatus(data.post.status);
      setNewDueDate(formatDate(data.post.dueDate));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newContent,
          newStatus,
          newDueDate
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to update task");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostsById(id); 
  }, [id]);

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold">Update Task</h3>
      <hr className="my-3" />
      <Link href="/" className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2">
        Go back
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Task Title"
        />
        <textarea
          value={newContent}  
          onChange={(e) => setNewContent(e.target.value)}
          cols="30"
          rows="10"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Enter your Detail"
        />
        <div className="flex items-center my-3">
          <label className="mr-3">Status:</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox"
              checked={newStatus}  
              onChange={(e) => setNewStatus(e.target.checked)} 
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {newStatus ? "Completed" : "Not Completed"}
            </span>
          </label>
        </div>

        <div className="my-3">
          <label className="mr-3">Due Date:</label>
          <input
            value={newDueDate}  
            onChange={(e) => setNewDueDate(e.target.value)}  
            type="date"
            className="block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          />
        </div>

        <button type="submit" className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2">
          Update Task
        </button>
      </form>
    </div>
  );
}

export default ReadPostPage;
