import React from "react";
import Nav from "./navigation";

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <header className="ly-header">
      <Nav />
    </header>
  );
}
