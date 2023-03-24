import React from "react";
import Link from "next/link";
import routes from "./routes";
import { map } from "lodash";

const Route = () => {
  return (
    <nav className="ly-nav">
      <ul>
        {map(routes, (item, index) => (
          <li key={index}>
            <Link href={item.url}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Route;
