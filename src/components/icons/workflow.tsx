import React from "react";
import { LuWorkflow } from "react-icons/lu";

export const Workflow = ({ active }: { active: boolean }) => {
  return (
    <div className={`${active && " bg-sidebar-active"} p-2 rounded-xl `}>
      <LuWorkflow
        className={`w-8 h-8 hover:text-primary ${active ? "text-primary" : "text-[#5d5b81]"
          }`}
      />
    </div>
  );
};
