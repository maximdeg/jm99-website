"use client";

import React from "react";
import { CldImage } from "next-cloudinary";

const ServiceCard = ({
  title,
  description,
  image,
  index,
}: {
  title: string;
  description: string;
  image: string;
  index?: number;
}) => {
  return (
    <article className="service-animation group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-xl">
      <div className="relative flex flex-1 flex-col p-6">
        <div className="mb-4 flex justify-center">
          <div className="relative h-40 w-40 overflow-hidden rounded-xl bg-white/10 md:h-44 md:w-44">
            <CldImage
              src={image}
              className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
              width={280}
              height={280}
              crop={{ type: "fit", source: true }}
              alt={title}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          {index != null && (
            <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
              Servicio {index + 1}
            </span>
          )}
          <h3 className="mb-3 text-center text-xl font-bold tracking-tight text-white md:text-2xl">
            {title}
          </h3>
          <p className="text-center text-sm leading-relaxed text-white/85 md:text-base">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
