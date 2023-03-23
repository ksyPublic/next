import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

import { styled } from "@nextui-org/react";

export const Box = styled("div", {
  boxSizing: "border-box",
});

const Container = ({ children }: ContainerProps) => {
  return (
    <Box
      css={{
        maxW: "100%",
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
