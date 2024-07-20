import React from "react";
import BreadCrumb from "./bread-crumb";
import { featuresData } from "@/lib/constant";

const Features = () => {
  return (
    <section>
      <BreadCrumb
        title="Main Features"
        subtitle="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
      />
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 mx-20">
        {featuresData.map((feature, index) => (
          <div className="w-full" key={index}>
            <div>
              <div className="mb-10 flex h-[60px] w-[60px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                {/* {icon} */}
              </div>
              <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-xl lg:text-lg xl:text-xl">
                {feature.title}
              </h3>
              <p className="pr-[10px] text-base font-medium leading-relaxed text-neutral-500 dark:text-neutral-300">
                {feature.paragraph}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
