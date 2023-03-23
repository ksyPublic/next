"use client";
import React from "react";
import Head from "./head";
import Header from "./header";
import Footer from "./footer";
import Container from "./container";
import Contents from "./contents";
import { store } from "./store/store";
import { Provider } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            light: "#fff9e7",
            main: "#fff8e1",
            dark: "#b2ad9d",
          },
          secondary: {
            light: "#ffd6c9",
            main: "#ffccbc",
            dark: "#b28e83",
          },
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <html lang="ko">
      <Head />
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <Container>
              <Header />
              <Contents>{children}</Contents>
              <Footer />
            </Container>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
