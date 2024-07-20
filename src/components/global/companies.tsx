import { clients } from "@/lib/constant";
import Image from "next/image";
import React from "react";

const Companies = () => {
  return (
    <div className="mt-[550px]">
      <div className="text-neutral-500 dark:text-neutral-300 text-center text-base font-medium mb-10 flex justify-center">
        <span className="w-[500px] ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque ea
          quo voluptatum vitae ipsa
        </span>
      </div>
      <div className="grid grid-cols-5 gap-10 items-center">
        {clients.map((item, idx) => (
          <div key={idx}>
            <Image
              width={170}
              height={1}
              src={item.href}
              alt={item.href}
              className=" relative rounded-2xl  object-contain opacity-50"
              key={item.href}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
