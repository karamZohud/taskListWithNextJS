import { editTask } from "@/utils/Actions";
import prisma from "@/utils/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
interface Props {
  params: { id: string };
}
const EditTaskPage = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!task) {
    notFound();
  }

  return (
    <section>
      <Link href={`/task/${task.id}`} className="underline block mb-10">
        {"<<"} Back to tasks details
      </Link>
      <div className="w-2/3 mx-auto rounded-md p-5 bg-slate-800 border-2 border-gray-300">
        <h1 className="mb-7 font-bold text-3xl">Edit Your Task</h1>
        <form action={editTask} className={"flex flex-col gap-8"}>
          <input
            type="text"
            name="title"
            defaultValue={task.title}
            placeholder="Task title"
            className="p-2 text-xl rounded-md text-gray-950"
          />
            <input
            type="hidden"
            name="id"
            defaultValue={task.id}
                     />
          <textarea
            name="description"
            rows={5}
            defaultValue={task.description}
            placeholder="Task description"
            className="p-2 rounded-md text-gray-950 resize-none"
          ></textarea>
          <select
            name="status"
            defaultValue={task.status}
            className="p-2 text-xl rounded-md text-gray-950"
          >
            <option value="TODO">TODO</option>
            <option value={"IN_PROGRESS"}>IN PROGRESS</option>
            <option value={"COMPLETE"}>COMPLETE</option>
          </select>
          <button
            className="bg-cyan-300 hover:bg-cyan-400 text-black font-semibold text-xl rounded-md p-3 transition-colors"
            type="submit"
          >
            Edit Task
          </button>
        </form>
      </div>
    </section>
  );
};
export default EditTaskPage;
