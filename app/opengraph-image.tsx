import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Main Street Wealth Open Source — M&A tools for the trades";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundImage:
            "linear-gradient(135deg, #ffffff 0%, #f5f1ff 55%, #ecfff7 100%)",
          color: "#140036",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, #7d2cfb 0%, #8947fc 50%, #02d5bb 100%)",
              color: "white",
              fontWeight: 800,
              fontSize: 24,
            }}
          >
            MS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.4 }}>
              Main Street Wealth
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#7d2cfb",
              }}
            >
              Open Source
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Open source M&amp;A tools for the trades.
          </div>
          <div style={{ fontSize: 28, color: "rgba(20,0,54,0.7)", maxWidth: 900 }}>
            100 calculators, open datasets, and AI tooling for lower middle-market deals.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            color: "rgba(20,0,54,0.55)",
          }}
        >
          <div>opensource.mainstreetwealth.ai</div>
          <div style={{ display: "flex", gap: 20 }}>
            <span>EBITDA · SDE · Rollover · QoE</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
