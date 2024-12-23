import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import { MdChangeCircle, MdBlock } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = `${import.meta.env.VITE_API_URL}/users/`;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        setUsersLoaded(true);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong.");
        setUsersLoaded(true);
      });
  }, [API_URL, token]);

  if (!usersLoaded) {
    return <LoadingScreen additional_hint="Preparing your user list...." />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleChangeType = async (userEmail, currentType) => {
    const newType = currentType === "admin" ? "user" : "admin";
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to change this user's type to "${newType}".`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it!",
      });

      if (result.isConfirmed) {
        const response = await axios.put(
          `${API_URL}${userEmail}`,
          { type: newType },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(response.data.message);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === userEmail ? response.data.user : user
          )
        );

        Swal.fire(
          "Success!",
          `User type has been changed to ${newType}.`,
          "success"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to change user type",
        "error"
      );
    }
  };

  const handleDisable = async (userEmail, disabled) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to ${disabled ? "disable" : "enable"} this user.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm it!",
      });

      if (result.isConfirmed) {
        const response = await axios.put(
          `${API_URL}${userEmail}`,
          { disabled },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(response.data.message);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === userEmail ? response.data.user : user
          )
        );

        Swal.fire(
          "Success!",
          `User has been ${disabled ? "disabled" : "enabled"}.`,
          "success"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to update user status",
        "error"
      );
    }
  };

  return (
    <div className="p-6 bg-gray-100 max-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin User List</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="h-[450px] overflow-y-auto">
          <table className="min-w-full">
            <thead className="bg-blue-500 text-white sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Last Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Disabled
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="odd:bg-gray-100 even:bg-gray-200 text-gray-700"
                >
                  <td className="px-6 py-4 text-sm">{user.email}</td>
                  <td className="px-6 py-4 text-sm">{user.userName}</td>
                  <td className="px-6 py-4 text-sm">
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-8 h-8 rounded-full shadow-md"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm">{user.firstName}</td>
                  <td className="px-6 py-4 text-sm">{user.lastName}</td>
                  <td className="px-6 py-4 text-sm">{user.type}</td>
                  <td className="px-6 py-4 text-sm">
                    {user.disabled ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 text-lg flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleChangeType(user.email, user.type)}
                      className="text-[#0A97B0] text-lg hover:text-[#0A5EB0]"
                      title="Change Type"
                    >
                      <MdChangeCircle />
                    </button>
                    <button
                      onClick={() => handleDisable(user.email, !user.disabled)}
                      className="text-green-500"
                      title={user.disabled ? "Enable User" : "Disable User"}
                    >
                      {user.disabled ? <MdToggleOff /> : <MdToggleOn />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
