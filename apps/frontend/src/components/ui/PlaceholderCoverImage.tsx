import React from "react";
import { getPlaceholderImage } from "@/services/apiUser";

function PlaceholderCoverImage() {
  const [placeholderCoverImage, setPlaceholderCoverImage] = React.useState("");

  // BUG: CORS error when sending this request
  React.useEffect(() => {
    getPlaceholderImage("600x400/d64343/fff").then((image) =>
      setPlaceholderCoverImage(image),
    );
  }, []);

  return (
    <div className="bg-card">
      <img
        src={placeholderCoverImage}
        alt="Background Cover for User Profile"
        className="h-[20vh] w-full object-cover"
      />
    </div>
  );
}

export default PlaceholderCoverImage;
