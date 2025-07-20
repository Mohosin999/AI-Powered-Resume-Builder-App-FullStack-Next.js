import React from "react";
import HomePage from "@/components/home-page";
import { auth } from "@clerk/nextjs/server";

const Home = async () => {
  const { userId } = await auth();
  const isAuthenticated = Boolean(userId);

  return (
    <div>
      <HomePage isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default Home;
