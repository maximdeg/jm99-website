import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-full ">
      {/* <!--Nav--> */}
      <header className="w-full container mx-auto z-10">
        <div className="w-full flex items-center justify-between">
          <Link
            className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="#"
          >
            <Image
              src="https://res.cloudinary.com/djdnlogf1/image/upload/v1741792376/logo_leo_jm-01_peoycz.png"
              alt="JM99-logo"
              width={150}
              height={150}
            ></Image>
          </Link>

          <div className="flex w-1/2 justify-end content-center">
            <Link
              className="inline-block text-[#350D70] no-underline hover:text-pink-500 hover:text-underline text-center md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
              href="https://www.tiktok.com/@jm99computers"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 46 46"
                className="fill-current h-10"
              >
                <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"></path>
              </svg>
            </Link>
            <Link
              className="inline-block text-[#350D70] no-underline hover:text-pink-500 hover:text-underline text-center md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
              href="https://www.instagram.com/jm99computers"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0 0 22 22"
                className="fill-current h-10"
              >
                <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* <!--Main--> */}
      <section className="container pt-6 md:pt-10 mx-auto items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-between lg:items-start overflow-y-hidden max-w-7xl md:mt-10 md:gap-30">
          <div>
            <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left text-pretty">
              Venta y reparaci&oacute;n de{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500  via-pink-500 to-blue-600">
                computadoras
              </span>{" "}
              y m&aacute;s!
            </h1>
            <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-pretty md:text-left ">
              Te garantizamos productos de calidad y compatibilidad para que
              puedas trabajar y jugar sin problemas con tus dispositivos de
              cualquier marca.
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

        {/* <!--FORM--> */}
        <div className="w-full overflow-hidden flex justify-center align-center mt-32">
          <form className="bg-gray-300 opacity-75 w-full md:w-3/5 py-6 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-[#350D70] py-2 font-bold mb-2"
                htmlFor="emailaddress"
              >
                Escribinos por cualquier consulta que tengas
              </label>
              <input
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="emailaddress"
                type="text"
                placeholder="tuemail@email.com"
              />
              <label
                className="block text-[#350D70] py-2 font-bold mb-2"
                htmlFor="emailaddress"
              ></label>
              <textarea
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="emailaddress"
                placeholder="Consulta"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out !self-end"
                type="button"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>

        {/* <!--Footer--> */}
        <footer className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
          <Link className="text-white no-underline hover:no-underline" href="#">
            &copy; App 2025
          </Link>
          - @Copyright{" "}
          <Link
            className="text-white no-underline hover:no-underline"
            href="https://www.linkedin.com/in/maxim-degtiarev"
          >
            {" "}
            JM99
          </Link>
        </footer>
      </section>
    </section>
  );
}
