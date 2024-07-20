import React from "react";
import { Separator } from "../ui/separator";
import { footer } from "@/lib/constant";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-24 w-full">
      <Separator />
      <div className="m-20 flex">
        <div className="w-[40%] flex-col flex">
          <span className="text-2xl font-bold">Muse</span>
          <span className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
            © 2024 Muse. All rights reserved.
          </span>
        </div>
        <div className="w-[60%]">
          <div className="mb-5 flex flex-row space-x-10">
            {footer.map((footer, index) => (
              <div className="flex flex-col" key={index}>
                <h1>{footer.name}</h1>
                {footer.items.map((item, index) => (
                  <Link href={item.link} key={index} className="">
                    <div className="transition-all dark:hover:text-white text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
