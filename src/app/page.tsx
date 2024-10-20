import Link from "next/link";
import React from "react";
import prisma from "../utils/db";
import StatusBadge from "../components/StatusBadge";

export const dynamic = "force-dynamic"; //make the page refresh auto and because that we remove the revalidate path
//change the page to dynamic route
// export const revalidate=10;//refresh every 10 second and make the page still in static side generation route  
const HomePage = async () => {
  const data = await prisma.task.findMany();

  return (
    <section>
      <h1 className="text-4xl font-semibold">Tasks List App</h1>
      <div className="flex items-center justify-end mb-20">
        <Link
          href={"/task/add"}
          className="transition-colors text-black py-1 px-2 text-xl font-semibold rounded-sm bg-cyan-300 hover:bg-cyan-400 "
        >
          Add Task
        </Link>
      </div>
      <table className="table w-full text-left mt-5">
        <thead className="border-t-2 border-b-2 border-gray-300 text-xl">
          <tr>
            <td>#</td>
            <td>Task Title</td>
            <td>Task Status</td>

            <td>Task Details</td>
          </tr>
        </thead>
        <tbody>
          {data.map((ele, index) => (
            <tr className="border-b border-gray-500" key={index}>
              <td className="p-4">{index + 1}</td>
              <td>{ele.title}</td>
              <td>
                <StatusBadge status={ele.status} />
              </td>
              <td>
                <Link
                  className="bg-green-500 hover:bg-green-700 transition-colors rounded p-1"
                  href={`/task/${ele.id}`}
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
export default HomePage;
