import React from "react";

interface ContentsProps {
  children: React.ReactNode;
}

const Contents = ({ children }: ContentsProps) => {
  return <div className="ly-contents">{children}</div>;
};

export default Contents;
