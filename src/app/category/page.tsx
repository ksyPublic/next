"use client";

import React from "react";
import { useRouter } from "next/navigation";
// import AccessToken from "@/pages/api/category";

// console.log("@@@", AccessToken);
export default function Category() {
  const router = useRouter();
  console.log("???", router);
  // const { id } = router.query;

  return <p>Post</p>;
}
