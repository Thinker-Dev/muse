import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const DemoV2 = () => {
  return (
    <section className="flex flex-row pt-28 space-x-16 mr-20">
      <div>
        <Image
          src="/Screenshot.jpg"
          alt="demoV2"
          width={1000}
          height={1000}
          className="object-cover rounded-r-2xl"
        />
      </div>
      <div className="space-y-10 pt-10 w-[40%]">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-b from-gradient-first via-gradient-second to-gradient-third bg-clip-text text-transparent">
            Lorem ipsum dolor
          </h1>
          <h4 className="text-neutral-500 dark:text-neutral-300 text-base">
            There are many variations of passages of Lorem Ipsum available but
            the majority have suffered alteration in some form.
          </h4>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-b from-gradient-first via-gradient-second to-gradient-third bg-clip-text text-transparent">
            Lorem ipsum dolor
          </h1>
          <h4 className="text-neutral-500 dark:text-neutral-300 text-base">
            There are many variations of passages of Lorem Ipsum available but
            the majority have suffered.
          </h4>
        </div>
      </div>
    </section>
  );
};

export default DemoV2;
