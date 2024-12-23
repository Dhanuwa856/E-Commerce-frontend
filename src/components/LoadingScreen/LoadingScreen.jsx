import React from "react";

const LoadingScreen = (props) => {
  return (
    <div className="relative left-1/2 -translate-x-1/2 translate-y-[150%] w-full inset-0 z-50">
      <div className="flex flex-col items-center space-y-2">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#0A5EB0]"></div>

        {/* Text */}
        <p className="text-black text-xl font-semibold tracking-wide">
          Loading, please wait...
        </p>

        {/* Additional Hint */}
        <p className="text-gray-700 text-sm italic">
          {/* Preparing your dashboard... */}
          {props.additional_hint}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
