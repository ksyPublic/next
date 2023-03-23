"use client";

import React from "react";
import { useRouter } from "next/router";

export default function Category() {
  const router = useRouter();
  const { pid } = router.query;

  return <p>Post: {pid}</p>;
}
