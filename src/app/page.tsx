import Companies from "@/components/global/companies";
import { ContainerScroll } from "@/components/global/container-scroll-animation";
import Demo from "@/components/demo/v1";
import Features from "@/components/global/features";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import DemoV2 from "@/components/demo/v2";
import Pricing from "@/components/landing/pricing";

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col">
      <Navbar />
      <section className="h-screen w-full  bg-neutral-950 rounded-md  !overflow-visible relative flex flex-col items-center  antialiased">
        <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col">
                <span className="font-medium text-4xl">
                  Suscipit expedita consequu
                </span>
                <h1 className="text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-600 font-sans font-bold">
                  Lorem ipsum dolor
                </h1>
              </div>
            }
          />
        </div>
      </section>
      <Companies />
      <Features />
      <Demo />
      <DemoV2 />
      <Pricing />
      <Footer />
    </main>
  );
}
