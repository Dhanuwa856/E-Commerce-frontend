import React from "react";

const LoadingScreen = (props) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex justify-center items-center z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>

        {/* Text */}
        <p className="text-white text-xl font-semibold tracking-wide">
          Loading, please wait...
        </p>

        {/* Additional Hint */}
        <p className="text-gray-300 text-sm italic">
          {/* Preparing your dashboard... */}
          {props.additional_hint}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;