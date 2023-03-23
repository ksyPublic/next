"use client";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { useSSR, CssBaseline } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";
import Head from "./head";
import Header from "./header";
import Footer from "./footer";
import Container from "./container";
import Contents from "./contents";

const lightTheme = createTheme({
  type: "light",
  // theme: {
  //   colors: {...}, // optional
  // }
});

const darkTheme = createTheme({
  type: "dark",
  // theme: {
  //   colors: {...}, // optional
  // }
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { isBrowser } = useSSR();
  return (
    <html lang="ko">
      <Head />
      <body>
        <NextThemesProvider
          defaultTheme="light"
          attribute="class"
          value={{
            light: lightTheme.className,
            dark: darkTheme.className,
          }}
        >
          <NextUIProvider>
            {isBrowser && (
              <Container>
                <Header />
                <Contents>{children}</Contents>
                <Footer />
              </Container>
            )}
          </NextUIProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
};

export default RootLayout;
