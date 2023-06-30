import React, { Fragment } from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <main className="flex w-full justify-center h-screen">{children}</main>
    </Fragment>
  );
}
