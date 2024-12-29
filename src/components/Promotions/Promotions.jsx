import { Gift } from "lucide-react";
import { Link } from "react-router-dom";

export default function PromoBanner() {
  return (
    <div className="relative w-full max-w-5xl bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg overflow-hidden mx-auto shadow-lg mt-10 ">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-200 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-200 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ping opacity-75"></div>
      </div>

      <div className="relative flex items-center justify-between p-6 md:p-8">
        {/* Left section */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl md:text-6xl font-bold text-[#0A97B0]">
              25
            </span>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-[#0A97B0]">
                %
              </span>
              <span className="text-xl md:text-2xl font-bold text-[#0A5EB0]">
                OFF
              </span>
            </div>
          </div>
          <div className="mt-2">
            <span className="bg-[#FFCFEF] px-3 py-1 text-sm font-semibold rounded-full text-[#2A3335]">
              +FREE SHIPPING
            </span>
          </div>
          <div className="mt-4 text-sm text-gray-300">www.loremipsumdo.com</div>
        </div>

        {/* Center section */}
        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-[#FFCFEF] rounded-full flex items-center justify-center">
            <div className="relative w-20 h-20 md:w-28 md:h-28 bg-[#0A97B0] rounded-lg rotate-45 flex items-center justify-center">
              <div className="absolute -top-4 w-32 h-8">
                <div className="w-full h-full border-t-4 border-l-4 border-r-4 border-gray-200 rounded-full transform -rotate-45"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="relative w-[250px]">
          <div className="border border-[#FFCFEF] rounded p-4 backdrop-blur-sm bg-black/20">
            <p p className="text-sm text-[#FFCFEF]">
              25% discount on skin care products. Hurry, limited time only.
            </p>
            <div className="mt-2 text-xs text-gray-300">
              Valid until: 7th January 2025
            </div>
          </div>

          {/* Button */}
          <div className="mt-4 flex justify-center">
            <Link
              to={"/skinCare"}
              className="bg-[#0A5EB0] text-white px-4 py-2 rounded-md hover:bg-[#0A97B0] transition w-[250px] text-center font-semibold tracking-wide"
            >
              Claim Offer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
