"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/store/authContext";
import { signOut } from "@/store/firebase";
import { firebaseAuth } from "@/store/auth";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const auth = useContext(AuthContext);
  const user = auth?.user;

  const logoutHandler = () => {
    signOut(firebaseAuth)
      .then(() => {
        console.log("로그아웃 성공");
      })
      .catch((error) => {
        console.error("로그아웃 실패", error);
      });
  };

  return (
    <header className="flex">
      <div className="h-20 px-10 w-full flex items-center justify-between border-b-[1px]">
        <h1>
          <Link className="font-semibold text-xl" href="/">
            FrontDev.
          </Link>
        </h1>

        {user ? (
          <ul className="flex items-center">
            <li>
              <Image
                className="rounded-full"
                alt="user profile"
                width={40}
                height={40}
                src={`${user?.photoURL}`}
              />
            </li>
            <li className="mr-4 ml-4 font-medium">
              환영합니다 {`${user?.displayName}`} 님
            </li>
            <li className="last:mr-0">
              <button type="button" onClick={logoutHandler}>
                로그아웃
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center">
            <li>
              <Link href="/login">로그인</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
