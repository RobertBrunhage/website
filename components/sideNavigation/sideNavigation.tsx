import React, { useState, useEffect } from "react";
import Link from "next/link";

interface SideNavProps {
  menu: Array<string>;
  module: string;
  slug: string;
}

const SideNavigation = ({ menu, module, slug }: SideNavProps) => {

  return (
    <div>
      <ul>
        {menu.map((item, index) => (
          <li
            style={{ padding: "8px 0", color: item === slug ? "blue" : "" }}
            key={index}
          >
            <Link
              href={`/course/${module}/${item}/`}
              as={`/course/${module}/${item}/`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavigation;
