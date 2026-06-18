import { ImageResponse } from "next/og";
import { SITE } from "@/lib/data";

export const dynamic = "force-static";
export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(120% 120% at 50% 0%, #161a2e 0%, #08090D 55%)",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, fontWeight: 600 }}>
          Yash
          <span style={{ color: "#8B5CF6", margin: "0 2px" }}>x</span>
          Daksh
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 980,
              letterSpacing: -2,
            }}
          >
            <span style={{ color: "#F8FAFC" }}>We build websites that make brands&nbsp;</span>
            <span style={{ color: "#5B7CFF" }}>impossible to ignore.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#94A3B8" }}>
            Premium digital experiences · Design · Development · 3D
          </div>
        </div>
      </div>
    ),
    size,
  );
}
