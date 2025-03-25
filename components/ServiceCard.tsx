import React from "react";
import { CldImage } from "next-cloudinary";
import "@/app/main.module.css";

const ServiceCard = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-white service-animation service-card">
      <div>
        <CldImage
          src={image}
          className="computer"
          width="500"
          height="500"
          crop={{
            type: "fit",
            source: true,
          }}
          alt="image"
        />
      </div>
      <div className="text-center">
        <h3 className="text-3xl mb-2">{title.toLocaleUpperCase()}</h3>
      </div>
      <div>
        <p className="text-center text-lg text-balance">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
