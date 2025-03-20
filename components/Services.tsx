"use client";

import React from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const services = [
    {
      title: "Instalacion de programas",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
      image:
        "https://res.cloudinary.com/djdnlogf1/image/upload/v1741820261/Gemini_Generated_Image_ob4d3tob4d3tob4d2_o1k5sz.png",
    },
    {
      title: "Mantenimineto de software",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
      image:
        "https://res.cloudinary.com/djdnlogf1/image/upload/v1741820261/Gemini_Generated_Image_ob4d3tob4d3tob4d2_o1k5sz.png",
    },
    {
      title: "Mantenimineto de hardware",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
      image:
        "https://res.cloudinary.com/djdnlogf1/image/upload/v1741820261/Gemini_Generated_Image_ob4d3tob4d3tob4d2_o1k5sz.png",
    },
    {
      title: "Comptadoras de escritorio",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
      image:
        "https://res.cloudinary.com/djdnlogf1/image/upload/v1741820261/Gemini_Generated_Image_ob4d3tob4d3tob4d2_o1k5sz.png",
    },
  ];

  return (
    <section className="container mx-auto items-center my-10 md:my-16 py-28 md:py-36">
      <div>
        <h1 className="text-5xl text-white">Servicios</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            image={service.image}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
