import { getUserInfo } from "@/actions/user";
import UserInfoForm from "@/components/UserInfoForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function UserInfoPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userInfo = await getUserInfo();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">User Information</h1>
      <UserInfoForm userInfo={userInfo} />
    </div>
  );
}
