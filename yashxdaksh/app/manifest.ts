import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YashxDaksh — Premium Digital Agency",
    short_name: "YashxDaksh",
    description:
      "Immersive digital experiences that elevate brands and drive growth.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090D",
    theme_color: "#08090D",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
