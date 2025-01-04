import React from "react";
import { Link, NavLink } from "react-router-dom";

function Nav_Link(props) {
  return (
    <div className="nav-link">
      <NavLink
        className="text-base uppercase font-medium tracking-wide text-[#0A97B0] hover:text-[#0A5EB0] transition-colors duration-500"
        to={props.link_url}
      >
        {props.link_name}
        <hr className="h-[1px] bg-[#0a5eb0] w-[75%] outline-0 border-0 mx-auto mt-1 hidden duration-700" />
      </NavLink>
    </div>
  );
}

export default Nav_Link;
