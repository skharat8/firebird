import { tw } from "@/lib/utils";

type LogoProps = {
  width?: string;
  marginBottom?: string;
  hasHoverEffect?: boolean;
};

function Logo({
  width = "3.9rem",
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
      src="icon-192x192.png"
      srcSet="icon-128x128.png 1x, icon-192x192.png 1.5x, icon-256x256.png 2x, icon-512x512.png 4x"
      alt="Main App Logo"
    />
  );
}

export default Logo;
