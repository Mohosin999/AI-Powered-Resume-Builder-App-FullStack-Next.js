import React from "react";

interface PersonalDetailsPageProps {
  params: {
    id: string;
    slug: string;
  };
}

const PersonalDetailsPage = ({ params }: PersonalDetailsPageProps) => {
  const { id, slug } = params;
  console.log("id from personal details page ", id, slug);
  return <div>PersonalDetailsPage</div>;
};

export default PersonalDetailsPage;
