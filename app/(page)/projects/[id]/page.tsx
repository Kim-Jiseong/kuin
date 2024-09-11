import React from "react";
type Props = {
  params: {
    id: string;
  };
};
async function ProjectDetail({ params }: Props) {
  return <div>{params.id}</div>;
}

export default ProjectDetail;
