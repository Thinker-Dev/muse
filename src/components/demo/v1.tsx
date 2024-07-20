import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const Demo = () => {
  return (
    <section className="flex flex-row pt-28 space-x-16 ml-20">
      <div className="space-y-4 pt-10 w-[40%]">
        <h1 className="text-5xl font-bold bg-gradient-to-b from-gradient-first via-gradient-second to-gradient-third bg-clip-text text-transparent">
          Lorem ipsum dolor
        </h1>
        <h4 className="text-neutral-500 dark:text-neutral-300 text-base">
          There are many variations of passages of Lorem Ipsum available but the
          majority have suffered alteration in some form.
        </h4>
        <Button className="hover:bg-white hover:shadow-xl hover:shadow-neutral-500 duration-500 transition-all">
          Get Started
        </Button>
      </div>
      <div>
        <Image
          src="/Screenshot.jpg"
          alt="demo"
          width={1000}
          height={1000}
          className="object-cover rounded-l-2xl"
        />
      </div>
    </section>
  );
};

export default Demo;
