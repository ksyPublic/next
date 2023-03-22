import React, { useEffect } from "react";
import Head from "./head";
import Header from "./header";
import Footer from "./footer";
import Container from "./container";
import Contents from "./contents";

interface pageProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: pageProps) {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => setMounted(true), []);
  // if (!mounted) return null;

  return (
    <html lang="ko">
      <Head />
      <body>
        <Container>
          <Header />
          <Contents>{children}</Contents>
          <Footer />
        </Container>
      </body>
    </html>
  );
}
