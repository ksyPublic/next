"use client";

import Image from "next/image";
import "./scss/main.scss";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  children: React.ReactNode;
}

export default function Home({ children }: HomeProps) {
  return <main className="ly-main">{children}</main>;
}
