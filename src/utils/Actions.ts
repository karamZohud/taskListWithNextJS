"use server"; //no rendering

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "./db";
import { CreateTaskDTO } from "./dtos";
import { Status } from "@prisma/client";

//Create Task
export async function addTask(newTask: CreateTaskDTO) {
  if (typeof newTask.title !== "string" || newTask.title.length < 3) {
    return;
  }
  if (
    typeof newTask.description !== "string" ||
    newTask.description.length < 7
  ) {
    return;
  }
  try {
    await prisma.task.create({
      data: {
        title: newTask.title,
        description: newTask.description,
      },
    });
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Could not create the task, please try again.");
  }

  revalidatePath("/"); //cause our app is static app with out rendaring this methode to refersh the page before redirct to it
  redirect("/");
}
export async function deleteTask(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) {
    return;
  }
  try {
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("No task to delete, please try again.");
  }

  revalidatePath("/"); //cause our app is static app with out rendaring this methode to refersh the page before redirct to it
  redirect("/");
}

export async function editTask(formData: FormData) {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const status = formData.get("status") as Status;
  const idTask = formData.get("id")?.toString();
console.log(typeof idTask);

  if (typeof title !== "string" || title.length < 3) {

  
    return;
  }
  if (typeof description !== "string" || description.length < 7) {

    return;
  }
  if (!status) {

    return;
  }
  if (typeof idTask !== "string") {
    
    return;
  }
  try {
    await prisma.task.update({
      where: { id: parseInt(idTask) },
      data: {
        title,
        description,
        status,
      },
   
      
    }
  );
  }  catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Could not update the task, please try again.");
  }

  //we remove  this revalidatepath because we change the static page to dynamic page (home page)

  revalidatePath("/"); //cause our app is static app with out rendaring this method to refresh the page before redirct to it
  
  
  
  revalidatePath(`task/${idTask}`); //cause our app is static app with out rendaring this methode to refersh the page before redirct to it
  redirect(`/task/${idTask}`);
}
