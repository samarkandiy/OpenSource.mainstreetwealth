import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #7d2cfb 0%, #8947fc 50%, #02d5bb 100%)",
          borderRadius: 36,
          color: "white",
          fontWeight: 800,
          fontSize: 92,
          letterSpacing: -2,
          fontFamily: "sans-serif",
        }}
      >
        MS
      </div>
    ),
    { ...size }
  );
}
