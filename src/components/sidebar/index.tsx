"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import menuData from "@/lib/data/sidebar";
import { Separator } from "../ui/separator";
import { LuSettings } from "react-icons/lu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Settings } from "../icons/settings";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <nav className=" px-2 bg-black border-r">
      <div className="font-bold w-full h-[75px] justify-center flex  items-center">
        <span>Muse</span>
      </div>
      <div className=" space-y-3">
        <TooltipProvider>
          {menuData.map((menuItem, index) => (
            <ul key={index}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <li className="px-1 ">
                    <Link href={menuItem.path}>
                      <menuItem.Component
                        active={pathName.includes(menuItem.path)}
                      />
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black/10 backdrop-blur-xl"
                >
                  <p className="text-white">{menuItem.title}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>

        <Separator />

        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <div className="px-1">
                <Link href={"/settings"}>
                  <Settings active={pathName === "/settings"} />
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-black/10 backdrop-blur-xl -mt-6"
            >
              <p className="text-white">Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default Sidebar