import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full pt-16 pb-6 text-sm text-center fade-in">
      <div className="flex w-1/8 justify-end content-center">
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
      <Link className="text-white no-underline hover:no-underline" href="#">
        &copy; App 2025
      </Link>
      @Copyright{" "}
      <Link
        className="text-white no-underline hover:no-underline"
        href="https://www.linkedin.com/in/maxim-degtiarev"
      >
        {" "}
        JM99
      </Link>
    </footer>
  );
};

export default Footer;
