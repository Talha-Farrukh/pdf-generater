import { getAllUsers } from "../../actions";
import { UsersTable } from "@/src/components/UsersTable";

async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-4">
        <UsersTable users={users} />
      </div>
    </div>
  );
}
export default UsersPage;
