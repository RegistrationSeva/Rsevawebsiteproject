import React from "react";
import { FaStar } from "react-icons/fa";
import { GiSuitcase } from "react-icons/gi";
import { MdEmojiEmotions } from "react-icons/md";

function ServiceBannerCard() {
  return (
    <div className="flex items-center gap-2 my-7 w-[80%] flex-wrap md:flex-nowrap">
      <div className="flex items-end gap-2">
        <GiSuitcase className="text-4xl md:text-6xl text-green-800" />
        <p className="text-sm md:text-lg text-green-800 font-bold">
          10,000+ Startups and MSMEs Served
        </p>
      </div>
      <div className="flex items-end gap-2">
        <FaStar className="text-4xl md:text-6xl text-green-800" />
        <p className="text-sm md:text-lg text-green-800 font-bold">
          4.5/5 Google Review
        </p>
      </div>
      <div className="flex items-end gap-2">
        <MdEmojiEmotions className="text-4xl md:text-6xl text-green-800" />
        <p className="text-sm md:text-lg text-green-800 font-bold">
          100% Satisfaction Guarantee Policy
        </p>
      </div>
    </div>
  );
}

export default ServiceBannerCard;
