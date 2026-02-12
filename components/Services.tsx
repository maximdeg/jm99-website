"use client";

import React from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const services = [
    {
      title: "Actualización de complementos para computadoras",
      description:
        "Mejoramos el rendimiento de tu equipo actualizando componentes como memoria RAM, disco duro (a unidades SSD más rápidas), tarjeta gráfica y otros, para que puedas trabajar o jugar sin problemas.",
      image:
        "https://res.cloudinary.com/djdnlogf1/image/upload/v1743016663/e7ac78917c86b878445b85e1dfe117a1_cj9bko.png",
    },
    {
      title: "Instalación de Hardware",
      description:
        "Instalamos y configuramos nuevos componentes de hardware en tu computadora, como placas madre, procesadores, tarjetas de video, fuentes de alimentación y más.",
      image:
        "https://res.cloudinary.com/djdnlogf1/image/upload/v1742931801/5226bcc6e9538bb75e6c62576cf17ae6_sayb9c.png",
    },
    {
      title: "Instalación de Programas y Aplicaciones",
      description:
        "Te ayudamos a instalar y configurar programas y aplicaciones en tu computadora, asegurándonos de que funcionen correctamente y sean compatibles con tu sistema operativo.",
      image:
        "https://res.cloudinary.com/djdnlogf1/image/upload/v1743017384/4cf7ea7a6fd93d39290027b11b28db66_iqpkob.png",
    },
    {
      title: "Reparación de Hardware",
      description:
        "Diagnosticamos y reparamos fallas en componentes físicos de tu computadora, como pantallas rotas, problemas de carga, teclados defectuosos y más.",
      image:
        "https://res.cloudinary.com/djdnlogf1/image/upload/v1743017739/7d4d16b798551be72cc25b74bb57b183_xgeumd.png",
    },
  ];

  return (
    <section
      id="services"
      className="container mx-auto scroll-mt-20 px-5 py-20 md:px-10 md:py-28 lg:py-32"
    >
      <header className="mx-auto mb-14 max-w-2xl text-center animate-none md:mb-16">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-white/70">
          Lo que hacemos
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow-sm md:text-5xl lg:text-6xl">
          Nuestros servicios
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
          Soluciones de venta y reparación para que tu equipo rinda al máximo.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            image={service.image}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
