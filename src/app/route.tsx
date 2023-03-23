import React from "react";
import Link from "next/link";
import { map } from "lodash";
import routes from "./routes";

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
