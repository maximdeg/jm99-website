import React from "react";
import { CldImage } from "next-cloudinary";

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
    <div className="flex flex-col items-center justify-center text-white">
      <div>
        <CldImage
          src={image}
          width="500"
          height="500"
          crop={{
            type: "auto",
            source: true,
          }}
          alt="image"
        />
      </div>
      <div className="text-center">
        <h3>{title}</h3>
      </div>
      <div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
