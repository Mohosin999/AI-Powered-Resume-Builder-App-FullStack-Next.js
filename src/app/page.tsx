import { getDbUserId, syncUser } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const { userId } = await auth();
  if (userId) await syncUser();
  console.log(await getDbUserId());

  return (
    <div>
      <h1>This is home page</h1>
      <br />
      <SignedOut>
        <SignInButton />
        <SignUpButton mode="modal">
          <Button variant="outline">Sign Up</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
};

export default Home;
