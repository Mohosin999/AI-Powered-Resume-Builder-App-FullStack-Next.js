// import React from "react";
// import HomePage from "@/components/home-page";

// const Home = async () => {
//   return (
//     <div>
//       <HomePage />
//     </div>
//   );
// };

// export default Home;

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
