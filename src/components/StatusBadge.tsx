import { Status } from "@prisma/client";

interface StatusBadgeComp {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeComp) {


  const statusColor =
    status === Status.TODO
      ? { backgroundColor: 'red' }
      : status === Status.IN_PROGRESS
      ? { backgroundColor: 'blue' }
      : { backgroundColor: 'green' }; // Assign the color based on status

     


  return (
<span className="py-1 px-2 rounded font-semibold" style={{ ...statusColor }}>
  {status.toString()}
</span>

  );
}