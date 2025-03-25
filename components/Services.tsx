"use client";

import React from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const services = [
    // {
    //   title: "Eliminación de Virus",
    //   description:
    //     "Nos encargamos de limpiar tu computadora de software malicioso como virus, spyware y ransomware, asegurando que tu sistema vuelva a funcionar de manera segura y eficiente.",
    //   image: "virus_removal.jpg",
    // },
    {
      title: "Actualización de complementos para computadoras",
      description:
        "Mejoramos el rendimiento de tu equipo actualizando componentes como memoria RAM, disco duro (a unidades SSD más rápidas), tarjeta gráfica y otros, para que puedas trabajar o jugar sin problemas.",
      image:
        "https://res.cloudinary.com/djdnlogf1/image/upload/v1742931803/sv311dc8c5082d5406b49fc32cab2e353dc_fpm7us.png",
    },
    // {
    //   title: "Recuperación de Datos",
    //   description:
    //     "Si perdiste archivos importantes por borrado accidental, fallas de disco u otros problemas, utilizamos herramientas especializadas para intentar recuperar tu información valiosa.",
    //   image: "data_recovery.jpg",
    // },
    {
      title: "Instalación de Hardware",
      description:
        "Instalamos y configuramos nuevos componentes de hardware en tu computadora, como placas madre, procesadores, tarjetas de video, fuentes de alimentación y más.",
      image:
        "https://res.cloudinary.com/djdnlogf1/image/upload/v1742931801/5226bcc6e9538bb75e6c62576cf17ae6_sayb9c.png",
    },
    // {
    //   title: "Clases personalizadas de uso de programas",
    //   description:
    //     "Aprendé a tu ritmo y según tus necesidades. Te enseñamos a manejar los programas que te interesan para potenciar tu trabajo, estudio o hobbies. ¡Vos elegís qué querés aprender!",
    //   image: "hardware_installs.jpg",
    // },
    // {
    //   title: "Redes",
    //   description:
    //     "Configuramos y mantenemos tus redes informáticas, ya sea en tu hogar o empresa. Esto incluye routers, switches, cableado estructurado y soluciones de Wi-Fi para una conexión estable y segura.",
    //   image: "networking.jpg",
    // },
    {
      title: "Instalación de Software",
      description:
        "Te ayudamos a instalar y configurar programas y aplicaciones en tu computadora, asegurándonos de que funcionen correctamente y sean compatibles con tu sistema operativo.",
      image:
        "https://res.cloudinary.com/djdnlogf1/image/upload/v1742931801/01of63aebe5e9ebd65b6f05bd116c0017e9_qljsyq.png",
    },
    // {
    //   title: "Instalación de Windows",
    //   description:
    //     "Realizamos instalaciones limpias o reinstalaciones del sistema operativo Windows, incluyendo la configuración de drivers y actualizaciones para un rendimiento óptimo.",
    //   image: "windows_installs.jpg",
    // },
    // {
    //   title: "Desbloqueo de Contraseñas",
    //   description:
    //     "Si olvidaste la contraseña de tu cuenta de Windows, podemos ayudarte a recuperarla o restablecerla para que puedas acceder nuevamente a tu computadora.",
    //   image: "password_unlock.jpg",
    // },
    {
      title: "Reparación de Hardware",
      description:
        "Diagnosticamos y reparamos fallas en componentes físicos de tu computadora, como pantallas rotas, problemas de carga, teclados defectuosos y más.",
      image:
        "https://res.cloudinary.com/djdnlogf1/image/upload/v1742931804/528979d92ed9fb5c97b1f52f990f3d38_s5kdzh.png",
    },
    // {
    //   title: "Reparación de Software",
    //   description:
    //     "Solucionamos problemas y errores de software que puedan estar afectando el funcionamiento de tu computadora, como pantallazos azules, programas que no responden o conflictos entre aplicaciones.",
    //   image: "software_repair.jpg",
    // },
    // {
    //   title: "Copia de Seguridad de Datos",
    //   description:
    //     "Implementamos soluciones de respaldo para proteger tus archivos importantes. Esto puede incluir copias en discos externos, servicios en la nube o configuraciones automáticas para evitar la pérdida de información.",
    //   image: "data_backup.jpg",
    // },
    // {
    //   title: "Reparaciones Remotas",
    //   description:
    //     "Muchos problemas de software pueden solucionarse de forma remota, sin necesidad de que traigas tu equipo. Utilizamos herramientas seguras para acceder a tu computadora y brindarte soporte técnico desde donde estés.",
    //   image: "remote_repairs.jpg",
    // },
    // {
    //   title: "Configuración de Correo Electrónico",
    //   description:
    //     "Te ayudamos a configurar tus cuentas de correo electrónico en diferentes dispositivos y programas, asegurando que puedas enviar y recibir mensajes sin problemas.",
    //   image: "email_setup.jpg",
    // },
    // {
    //   title: "Mantenimiento General",
    //   description:
    //     "Ofrecemos servicios de mantenimiento preventivo para tu computadora, incluyendo limpieza de archivos temporales, optimización del sistema, actualizaciones y revisiones para asegurar un funcionamiento fluido y prolongar la vida útil de tu equipo.",
    //   image: "general_maintenance.jpg",
    // },
  ];

  return (
    <section
      id="services"
      className="container mx-auto items-center my-10 md:my-16 py-28 md:py-36 px-5 md:px-10"
    >
      <div className="text-center mb-10 md:mb-16">
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
