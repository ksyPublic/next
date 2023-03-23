"use client";

import React from "react";
import Nav from "./navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "./img/logo.png";

const Header = () => {
  return (
    <header className="ly-header">
      <Nav />
    </header>
  );
};

export default Header;
