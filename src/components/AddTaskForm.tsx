
"use client";

import { addTask } from "@/utils/Actions";
import React from "react";
import { createTaskSchema } from "@/utils/validationSchema";
import {toast } from "react-toastify";
import { CreateTaskDTO } from "@/utils/dtos";


export const AddTaskForm = () => {
  const clientAction = async (formData: FormData):Promise<void >  => {
    
    try {
      const title = formData.get("title")?.toString();
      const description = formData.get("description")?.toString();
      const validation = createTaskSchema.safeParse({ title, description });
      if (!validation.success) {
         toast.error(validation.error.errors[0].message);
      }
      await addTask({title,description}as CreateTaskDTO);
    } catch (error) {
      toast.error("An error occurred while adding the task.");    
      console.log(error);
        
    }
  
  };
  
  
  
  
  return (
    <form action={clientAction} className={"flex flex-col gap-8"}>
      <input
        type="text"
        name="title"
        placeholder="Task title"
        className="p-2 text-xl rounded-md text-gray-950"
      />
      <textarea
        name="description"
        rows={5}
        placeholder="Task description"
        className="p-2 rounded-md text-gray-950 resize-none"
      ></textarea>
      <button
        className="bg-cyan-300 hover:bg-cyan-400 text-black font-semibold text-xl rounded-md p-3 transition-colors"
        type="submit"
      >
        Add task
      </button>
    </form>
  );
};
