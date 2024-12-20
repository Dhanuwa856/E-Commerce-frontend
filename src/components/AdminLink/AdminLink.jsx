import React from "react";

function AdminLink({ admin_link_name, Icon }) {
  return (
    <li className="group">
      <button className="w-full text-left flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-white hover:text-[#0A97B0] transition">
        <Icon className="text-xl" /> {/* Icon component */}
        <span>{admin_link_name}</span>
      </button>
    </li>
  );
}

export default AdminLink;
