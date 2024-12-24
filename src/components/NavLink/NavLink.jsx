import React from "react";
import { Link } from "react-router-dom";

function NavLink(props) {
  return (
    <Link
      className="text-base uppercase font-medium tracking-wide text-[#0A97B0] hover:text-[#0A5EB0] transition-colors duration-500"
      to={props.link_url}
    >
      {props.link_name}
    </Link>
  );
}

export default NavLink;
