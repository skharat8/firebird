import { tw } from "@/lib/utils";

import icon1x from "/icon-128x128.png";
import iconDefault from "/icon-192x192.png";
import icon2x from "/icon-256x256.png";
import icon4x from "/icon-512x512.png";

type LogoProps = {
  width?: string;
  marginBottom?: string;
  hasHoverEffect?: boolean;
};

function Logo({
  width = "2.2rem",
  marginBottom = "",
  hasHoverEffect = false,
}: LogoProps) {
  let hoverStyles = "";
  if (hasHoverEffect) {
    hoverStyles = tw`hover:drop-shadow-logo transform transition duration-300 will-change-transform
    hover:scale-110 hover:transform`;
  }

  return (
    <img
      className={hoverStyles}
      style={{ width, marginBottom }}
      src={iconDefault}
      srcSet={`${icon1x} 1x, ${iconDefault} 1.5x, ${icon2x} 2x, ${icon4x} 4x`}
      alt="Main App Logo"
    />
  );
}

export default Logo;
