import React, { Fragment, useEffect } from "react";
import Header from "../header";
import Footer from "../footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Header />
      <main className="flex">{children}</main>
      <Footer />
    </Fragment>
  );
}
