import React from "react";
import { LuClipboardList } from "react-icons/lu";

export const Logs = ({ active }: { active: boolean }) => {
  return (
    <div className={`${active && " bg-sidebar-active"} p-2 rounded-xl`}>
      <LuClipboardList
        className={`w-8 h-8 hover:text-primary ${active ? "text-primary" : "text-[#5d5b81]"
          }`}
      />
    </div>
  );
};
