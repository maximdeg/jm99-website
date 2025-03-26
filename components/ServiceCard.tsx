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
    <div className="grid grid-cols-1 grid-rows-2 text-white service-animation service-card  ">
      <div className="max-w-[300px] md:max-w-[250px]  justify-self-center self-center border border-white rounded-full">
        <CldImage
          src={image}
          className="image-hover "
          width="500"
          height="500"
          crop={{
            type: "fit",
            source: true,
          }}
          alt="image"
        />
      </div>
      <div>
        <div className="text-center">
          <h3 className="text-3xl mb-2">{title.toLocaleUpperCase()}</h3>
        </div>
        <div>
          <p className="text-center text-lg text-balance">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
