import React from "react";
import prisma from "@/utils/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { deleteTask } from "@/utils/Actions";

interface Props {
  params: { id: string };
}

const TaskDetails = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) {
    notFound();
  }

// const deleteTaskHandler=deleteTask.bind(null,task.id);

  return (
    <section>
      <div className="flex items-center justify-between">
        <Link className="underline" href={"/"}>
          {"<< "}Back to task table
        </Link>
        <div className="flex items-center">
          <Link
            className="transition-colors rounded-lg py-1 px-2  bg-green-600 hover:bg-green-700 text-xl mr-2"
            href={`${params.id}/edit`}
          >
            Edit
          </Link>
          <form action={deleteTask}>
            <input type="hidden" name="id" value={task.id}/>
            <button
              className="bg-red-700 hover:bg-red-600 transition-colors rounded-lg px-2 text-xl py-1"
              type="submit"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
      <div className="mt-16 p-5 rounded-lg bg-gray-600">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-3xl">{task.title}</h2>
          <StatusBadge status={task.status} />
        </div>
        <small className="text-yellow-400">{new Date(task.createdAt).toDateString()}</small>
    <p className="mt-5 text-xl">{task.description}</p>
      </div>
    </section>
  );
};
export default TaskDetails;
