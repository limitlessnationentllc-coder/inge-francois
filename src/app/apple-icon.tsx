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
          background: "#0b0908",
        }}
      >
        <svg width="108" height="108" viewBox="0 0 64 64" fill="none">
          <path
            d="M32 6 V22 M32 6 C 40 6 44 12 40 18"
            stroke="#c7a768"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="24" cy="38" r="12" fill="#7a1526" />
          <circle cx="40" cy="38" r="12" fill="#7a1526" />
          <circle cx="20.5" cy="33.5" r="3" fill="#c94a5f" opacity="0.55" />
          <circle cx="36.5" cy="33.5" r="3" fill="#c94a5f" opacity="0.55" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
