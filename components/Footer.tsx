import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full pt-16 pb-6 text-sm text-center fade-in">
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
