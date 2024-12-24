// import React, { useState } from "react";

// const Auth = () => {
//   const [isSignUpMode, setSignUpMode] = useState(false);

//   const toggleMode = () => {
//     setSignUpMode((prev) => !prev);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="relative w-full max-w-4xl h-[500px] overflow-hidden rounded-lg shadow-lg bg-white">
//         {/* Overlay Panel */}
//         <div
//           className={`absolute inset-0 h-full w-full flex transition-transform duration-700 ${
//             isSignUpMode ? "-translate-x-[100%]" : "translate-x-0"
//           }`}
//         >
//           {/* Left Overlay */}
//           <div className="w-1/2 bg-gradient-to-r from-red-400 to-red-600 text-white flex flex-col items-center justify-center px-8">
//             <h2 className="text-3xl font-bold mb-4">
//               {isSignUpMode ? "Welcome Back!" : "Hello, Friend!"}
//             </h2>
//             <p className="text-sm mb-8">
//               {isSignUpMode
//                 ? "To keep connected with us please login with your personal info."
//                 : "Enter your personal details and start your journey with us."}
//             </p>
//             <button
//               className="bg-white text-red-500 px-6 py-2 rounded shadow hover:bg-gray-200"
//               onClick={toggleMode}
//             >
//               {isSignUpMode ? "Sign In" : "Sign Up"}
//             </button>
//           </div>

//           {/* Right Overlay */}
//           <div className="w-1/2 bg-white flex flex-col items-center justify-center px-8">
//             <h2 className="text-3xl font-bold mb-4">
//               {isSignUpMode ? "Create Account" : "Sign In"}
//             </h2>
//             <p className="text-sm mb-4">
//               {isSignUpMode
//                 ? "Use your email for registration"
//                 : "Use your account"}
//               {isSignUpMode
//                 ? " and start your journey with us."
//                 : " and start your journey with us."}
//             </p>

//             {/* Form Fields */}
//             {isSignUpMode ? (
//               <form className="flex flex-col items-center w-full px-8">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="w-full mb-4 p-2 border border-gray-300 rounded"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full mb-4 p-2 border border-gray-300 rounded"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="w-full mb-4 p-2 border border-gray-300 rounded"
//                 />
//                 <button
//                   type="button"
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Sign Up
//                 </button>
//               </form>
//             ) : (
//               <form className="flex flex-col items-center w-full px-8">
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full mb-4 p-2 border border-gray-300 rounded"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="w-full mb-4 p-2 border border-gray-300 rounded"
//                 />
//                 <a
//                   href="#"
//                   className="text-sm text-gray-500 mb-4 hover:underline"
//                 >
//                   Forgot your password?
//                 </a>
//                 <button
//                   type="button"
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Sign In
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import decodeToken from "../DecodeToken/DecodeToken";

const Login = () => {
  const [formData, setFormData] = useState({ input: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login/`,
        formData
      );
      const { token } = response.data; // Assuming API returns { token: "JWT_TOKEN_HERE" }

      // Save token to localStorage
      localStorage.setItem("authToken", token);

      const userData = decodeToken(localStorage.getItem("authToken"));

      if (userData.type === "admin") {
        navigate("/admin");
        toast.success("Welcome Admin!");
      } else {
        navigate("/");
        toast.success("Welcome!");
      }

      // Notify success
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        // Show error message from the server
        toast.error(error.response.data.message || "Invalid credentials");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="input"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Username
            </label>
            <input
              type="text"
              id="input"
              name="input"
              value={formData.input}
              onChange={handleChange}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email or username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white font-semibold ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
