import dynamic from "next/dynamic";
import React from "react";

const Resume = dynamic(() => import("../components/Resume"), { ssr: false });

export default function resume() {
  return <Resume />;
}
