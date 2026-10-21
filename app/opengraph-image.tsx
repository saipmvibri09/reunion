import { ImageResponse } from "next/og";

export const alt = "Reunion — Your people are the headliner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#180C2B",
          color: "#F5E7D2",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 5 }}>
          <b>REUNION</b><span>HYDERABAD · DECEMBER 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.86, textTransform: "uppercase" }}>
          <span style={{ fontSize: 112, fontWeight: 800 }}>Your people are</span>
          <span style={{ fontSize: 136, fontWeight: 800, color: "#FFAA2B" }}>the headliner.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <span>The Festival of Friendship</span>
          <span style={{ background: "#EC2D7C", padding: "16px 28px", borderRadius: 999 }}>Join the waitlist</span>
        </div>
      </div>
    ),
    size,
  );
}
