import React from "react";
import { LuSettings } from "react-icons/lu";

export const Settings = ({ active }: { active: boolean }) => {
  return (
    <div className={`${active && " bg-sidebar-active"} p-2 rounded-xl `}>
      <LuSettings
        className={`w-8 h-8 hover:text-primary ${active ? "text-primary" : "text-[#5d5b81]"
          }`}
      />
    </div>
  );
};
