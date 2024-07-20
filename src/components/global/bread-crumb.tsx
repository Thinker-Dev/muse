import React from "react";

interface Props {
  title: string;
  subtitle: string;
}

const BreadCrumb = ({ title, subtitle }: Props) => {
  return (
    <section className="flex items-center justify-center pt-28 pb-10 flex-col space-y-4">
      <h1 className="text-5xl font-bold bg-gradient-to-b from-gradient-first via-gradient-second to-gradient-third bg-clip-text text-transparent">
        {title}
      </h1>
      <h4 className="text-neutral-500 dark:text-neutral-300 text-base w-[500px] text-center">
        {subtitle}
      </h4>
    </section>
  );
};

export default BreadCrumb;
