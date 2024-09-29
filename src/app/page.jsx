"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  // update btn 
  const[updateStatus, setupdateStatus] = useState(""); 

  console.log(tasks);

  const getTasks = async () => {
    try {
      const res = await fetch("/api/posts", {
        method: "GET",
        cache: "no-store"
      })
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await res.json();

      setTasks(data.tasks);


    } catch (error) {
      console.log("Error loading posts: ", error);
    }
  }

  const updateTaskStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Toggle the status
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus: updatedStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task status");
      }

     
      getTasks();
    } catch (error) {
      console.log("Error updating task: ", error);
    }
  };



  useEffect(() => {
    getTasks();
  }, []);

  return (
    <main className="container mx-auto my-3 dark">
      <h1> NextJs Crud + MongoDB</h1>
      <hr className="my-3" />
      <button className="bg-green-500 p-3 text-white rounded ">
        <Link href="/create">Create Task</Link>
      </button>
      <div className="grid grid-cols-4 mt-3 gap-5">     
        {tasks.map((task) => (
          <div key={task._id} className="shadow-xl my-10 p-10 rounded-xl relative">
            <div className="flex justify-between items-start ">
              <h4 className={task.status ? "line-through" : ""}>{task.title}</h4>

              <Link
                className="bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2 ml-auto"
                href={`/read/${task._id}`} 
              >
                Read
              </Link>
              <DeleteBtn id={task._id}/>
            </div>

            <p>{task.content}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>

            <div className="mt-5 flex space-x-2">
              <button
                onClick={() => updateTaskStatus(task._id, task.status)}
                className={`text-white border py-2 rounded-md text-lg px-3 ${task.status ? "bg-gray-500" : "bg-blue-500"
                  }`}
              >
                {task.status ? "Mark Incomplete" : "Mark Complete"}
              </button>
            </div>
          </div>

        ))}
      </div>
    </main>

  );
}
