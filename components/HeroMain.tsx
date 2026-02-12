import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const HeroMain = () => {
  return (
    <section
      id="hero"
      className="relative grid min-h-[70vh] grid-cols-1 content-center gap-8 md:grid-cols-2 md:gap-12 lg:min-h-[75vh] lg:gap-16"
    >
      {/* Content column */}
      <div className="flex flex-col justify-center px-5 md:px-10 md:pl-[calc(20%+1.5rem)]">
        <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-white/70 md:text-left">
          Santa Fe · Reparación y venta
        </p>
        <h1 className="text-pretty text-center text-[1.75rem] font-bold leading-tight text-white drop-shadow-sm min-[480px]:text-3xl sm:text-4xl sm:leading-snug md:text-left md:text-5xl md:leading-[1.2] lg:text-6xl xl:text-7xl xl:leading-[1.15] 2xl:text-7xl">
          Venta y reparación de{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500">
            computadoras
          </span>{" "}
          y más
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-center text-base leading-relaxed text-white/90 md:text-left md:text-lg lg:text-xl">
          Productos de calidad y compatibilidad para que trabajes sin problemas
          con tus dispositivos de cualquier marca.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <Button
            asChild
            size="lg"
            className="rounded-lg bg-[#350D70] px-6 py-6 text-base font-semibold text-white shadow-lg transition hover:bg-[#2a0a5a] hover:shadow-xl"
          >
            <Link href="#services">Ver servicios</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-lg border-2 border-white/50 bg-white/10 px-6 py-6 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 hover:border-white/70"
          >
            <Link href="#contact">Contactar</Link>
          </Button>
        </div>
      </div>

      {/* Image column */}
      <div className="relative flex items-center justify-center md:justify-end">
        <div className="hero-computer-scroll relative w-full max-w-md px-4 md:absolute md:top-1/2 md:max-w-lg md:-translate-y-1/2 md:px-0 lg:max-w-xl 2xl:max-w-2xl">
          <div className="relative drop-shadow-2xl">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-600/20 blur-2xl" />
            <Image
              src="https://res.cloudinary.com/djdnlogf1/image/upload/v1741820261/Gemini_Generated_Image_ob4d3tob4d3tob4d2_o1k5sz.png"
              className="relative w-full transform transition duration-500 ease-out hover:scale-[1.02] hover:-rotate-1 md:-rotate-3"
              alt="Laptop y computadoras - JM99"
              width={800}
              height={700}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMain;
