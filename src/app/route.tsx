import React from "react";
import Link from "next/link";
import routes from "./routes";
import { map } from "lodash";

const Route = () => {
  return (
    <ul>
      {map(routes, (item, index) => (
        <li key={index}>
          <Link href={item.url} />
        </li>
      ))}
    </ul>
  );
};

export default Route;
