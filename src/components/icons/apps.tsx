import React from "react";
import { LuCable } from "react-icons/lu";

export const Apps = ({ active }: { active: boolean }) => {
  return (
    <div className={`${active && " bg-sidebar-active"} p-2 rounded-xl`}>
      <LuCable
        className={`w-8 h-8 hover:text-primary  ${active ? "text-primary" : "text-[#5d5b81]"
          }`}
      />
    </div>
  );
};
