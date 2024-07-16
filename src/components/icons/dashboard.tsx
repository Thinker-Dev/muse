import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";

export const Dashboard = ({ active }: { active: boolean }) => {
  return (
    <div className={`${active && " bg-sidebar-active"} p-2 rounded-xl`}>
      <LuLayoutDashboard
        className={`w-8 h-8 hover:text-primary ${active ? "text-primary" : "text-[#5d5b81]"
          }`}
      />
    </div>
  );
};
