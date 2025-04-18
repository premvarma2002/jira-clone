import { getCurrent } from "@/features/auth/server/actions";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  return (
   <div className="bg-neutral-500 p-4 h-full">
      <CreateWorkspaceForm/>
   </div>
  );
};
