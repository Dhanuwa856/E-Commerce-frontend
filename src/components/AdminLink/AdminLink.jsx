import React from "react";
import { Link } from "react-router-dom";

function AdminLink({ admin_link_name, Icon, link_url }) {
  return (
    <li className="group">
      <Link
        to={link_url}
        className="w-full text-left flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-white hover:text-[#0A97B0] transition"
      >
        <Icon className="text-xl" /> {/* Icon component */}
        <span>{admin_link_name}</span>
      </Link>
    </li>
  );
}

export default AdminLink;
