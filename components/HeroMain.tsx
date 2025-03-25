import Image from "next/image";
import React from "react";

const HeroMain = () => {
  return (
    <>
      <div
        id="hero"
        className="grid grid-cols-1 md:grid-cols-2 w-full justify-between lg:items-start overflow-y-hidden max-w-7xl md:mt-10 md:gap-30"
      >
        <div>
          <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left text-pretty">
            Venta y reparaci&oacute;n de{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500  via-pink-500 to-blue-600">
              computadoras
            </span>{" "}
            y m&aacute;s!
          </h1>
          <p className="leading-normal text-white text-base md:text-2xl mb-8 text-center md:text-pretty md:text-left ">
            Te garantizamos productos de calidad y compatibilidad para que
            puedas trabajar sin problemas con tus dispositivos de cualquier
            marca.
          </p>
        </div>

        {/* <!--Left Col--> */}
        <div className="md:absolute md:top-60 md:right-0 md:w-[50%] lg:top-50 xl:top-30 2xl:top-20 2xl:right-[5%] max-w-2xl overflow-hidden md:mb-32 z-1">
          <Image
            src="https://res.cloudinary.com/djdnlogf1/image/upload/v1741820261/Gemini_Generated_Image_ob4d3tob4d3tob4d2_o1k5sz.png"
            className="w-full md:w-10/12 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
            alt="laptop"
            width={800}
            height={700}
          />
        </div>
      </div>
    </>
  );
};

export default HeroMain;
