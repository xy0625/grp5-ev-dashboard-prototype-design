import { useState } from "react";
import BottomNav from "./BottomNav";

/* ── Top Bar ─────────────────────────────────────────────────────── */
function TopBar() {
  return (
    <div
      style={{ position: "absolute", left: 0, top: 0, width: 1280, height: 62 }}
    >
      {/* WiFi on */}
      <div
        style={{
          position: "absolute",
          left: 66,
          top: 11,
          width: 50,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="34" height="28" viewBox="0 0 34 28" fill="none">
          <path d="M17 22a2 2 0 110 4 2 2 0 010-4z" fill="#000" />
          <path
            d="M10 16.5a9.9 9.9 0 0114 0"
            stroke="#000"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M4 10.5a17.5 17.5 0 0126 0"
            stroke="#000"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      {/* Bluetooth */}
      <div
        style={{
          position: "absolute",
          left: 139,
          top: 11,
          width: 50,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="28"
          height="36"
          viewBox="0 0 24 36"
          fill="none"
          stroke="#000"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M6 9l12 9-6 5V3l6 5-12 9" />
        </svg>
      </div>
      {/* Battery status pill */}
      <div
        style={{
          position: "absolute",
          left: 402,
          top: 22,
          width: 428,
          height: 48,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <svg width="42" height="24" viewBox="0 0 42 24">
          <rect
            x="1"
            y="3"
            width="36"
            height="18"
            rx="3"
            stroke="#000"
            strokeWidth="2"
            fill="none"
          />
          <rect x="37" y="8" width="4" height="8" rx="2" fill="#000" />
          <rect x="3" y="5" width="7" height="14" rx="1" fill="#22c55e" />
        </svg>
        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: 20,
            color: "#000",
          }}
        >
          Battery: 22% | 95km left &nbsp;›
        </span>
      </div>
      {/* Profile */}
      <div
        style={{
          position: "absolute",
          left: 1165,
          top: 11,
          width: 49,
          height: 49,
          background: "#F3EDFF",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6366F1"
          strokeWidth="2"
        >
          <path
            d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </div>
  );
}

/* ── Map View ────────────────────────────────────────────────────── */
function MapView() {
  return (
    <div
      style={{
        position: "absolute",
        width: 629,
        height: 372,
        left: 66,
        top: 120,
        borderRadius: 20,
        overflow: "hidden",
        background: "#B2DFDB",
      }}
    >
      <svg
        width="629"
        height="372"
        viewBox="0 0 629 372"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="cSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cde8f5" />
            <stop offset="100%" stopColor="#a8d5e8" />
          </linearGradient>
          <linearGradient id="cLand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4e9c8" />
            <stop offset="100%" stopColor="#b8d9a8" />
          </linearGradient>
        </defs>
        <rect width="629" height="372" fill="url(#cSky)" />
        <path
          d="M0 120 Q80 80 160 100 Q240 120 320 90 Q400 60 480 80 Q560 100 629 70 L629 372 L0 372Z"
          fill="url(#cLand)"
        />
        <path
          d="M0 200 Q100 180 200 195 Q300 210 400 185 Q500 160 629 175 L629 220 Q500 210 400 230 Q300 250 200 240 Q100 230 0 250Z"
          fill="#89c4d8"
          opacity="0.7"
        />
        <line
          x1="0"
          y1="230"
          x2="629"
          y2="230"
          stroke="#fff"
          strokeWidth="3"
          opacity="0.6"
        />
        <line
          x1="314"
          y1="0"
          x2="314"
          y2="372"
          stroke="#fff"
          strokeWidth="2.5"
          opacity="0.5"
        />
        <rect x="240" y="225" width="52" height="20" rx="4" fill="#3b82f6" />
        <text
          x="266"
          y="239"
          textAnchor="middle"
          fill="#fff"
          fontSize="10"
          fontFamily="Inter,sans-serif"
          fontWeight="700"
        >
          AH150
        </text>
        <rect x="360" y="270" width="28" height="20" rx="3" fill="#f59e0b" />
        <text
          x="374"
          y="284"
          textAnchor="middle"
          fill="#fff"
          fontSize="11"
          fontFamily="Inter,sans-serif"
          fontWeight="700"
        >
          21
        </text>
        {[
          [200, 200, "Kuching"],
          [60, 195, "Riam"],
          [130, 210, "Lundu"],
          [130, 245, "Serikin"],
          [230, 240, "Siburan"],
          [360, 210, "Kota Samarahan"],
          [420, 190, "Sebuyau"],
          [490, 230, "Lingga"],
          [390, 270, "Serian"],
          [490, 290, "Pantu"],
          [480, 150, "Kabong"],
        ].map(([x, y, label], i) => (
          <text
            key={i}
            x={x}
            y={y}
            fill="#374151"
            fontSize={label === "Kuching" ? 15 : 10}
            fontWeight={label === "Kuching" ? "700" : "500"}
            fontFamily="Inter,sans-serif"
            textAnchor="middle"
          >
            {label}
          </text>
        ))}
        {[
          [250, 195, "#16A34A", "A"],
          [330, 215, "#16A34A", "B"],
          [400, 225, "#16A34A", "C"],
        ].map(([x, y, color, label], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="12" fill={color} />
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              fill="#fff"
              fontSize="9"
              fontWeight="700"
              fontFamily="Inter,sans-serif"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
      {/* Search bar */}
      <div
        style={{
          position: "absolute",
          top: 29,
          left: 38,
          width: 250,
          height: 41,
          background: "#fff",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 14px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(0,0,0,0.7)"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: 18,
            color: "rgba(0,0,0,0.7)",
          }}
        >
          Where to?
        </span>
        <div
          style={{
            marginLeft: "auto",
            width: 30,
            height: 30,
            background: "#fff",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(0,0,0,0.8)"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── A/C Card ────────────────────────────────────────────────────── */
function AcCard() {
  const [on, setOn] = useState(false);
  return (
    <div
      onClick={() => setOn((v) => !v)}
      style={{
        position: "absolute",
        width: 98,
        height: 120,
        left: 68,
        top: 510,
        background: on ? "#e0f2fe" : "#fff",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        borderRadius: 20,
        cursor: "pointer",
        transition: "background 0.2s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 18,
        gap: 6,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke={on ? "#0ea5e9" : "#4B4E53"}
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 14,
            color: "#000",
          }}
        >
          A/C
        </span>
      </div>
      <div
        style={{
          width: 40,
          height: 40,
          background: on ? "#0ea5e9" : "#f3f4f6",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 8,
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke={on ? "#fff" : "#9ca3af"}
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
        </svg>
      </div>
      <span
        style={{
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: 14,
          color: "rgba(0,0,0,0.8)",
          marginTop: 6,
        }}
      >
        {on ? "ON" : "OFF"}
      </span>
    </div>
  );
}

/* ── Eco Mode Card ───────────────────────────────────────────────── */
function EcoCard() {
  const [on, setOn] = useState(false);
  return (
    <div
      onClick={() => setOn((v) => !v)}
      style={{
        position: "absolute",
        width: 98,
        height: 120,
        left: 175,
        top: 510,
        background: on ? "#f0fdf4" : "#fff",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        borderRadius: 20,
        cursor: "pointer",
        transition: "background 0.2s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 18,
        gap: 6,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 14 }}>🌿</span>
        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 13,
            color: "#000",
          }}
        >
          Eco Mode
        </span>
      </div>
      <div
        style={{
          width: 40,
          height: 40,
          background: on ? "#16A34A" : "#f3f4f6",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 8,
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill={on ? "#fff" : "#9ca3af"}
        >
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <span
        style={{
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: 14,
          color: "rgba(0,0,0,0.8)",
          marginTop: 6,
        }}
      >
        {on ? "ON" : "OFF"}
      </span>
    </div>
  );
}

/* ── Estimated Range Card ────────────────────────────────────────── */
function RangeCard() {
  return (
    <div
      style={{
        position: "absolute",
        width: 190,
        height: 130,
        left: 285,
        top: 510,
        background: "rgba(255,255,255,0.95)",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        borderRadius: 20,
        padding: "12px 14px 6px",
      }}
    >
      <div
        style={{
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 16,
          color: "#000",
        }}
      >
        Estimated Range
      </div>
      <div
        style={{
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 24,
          color: "#000",
          marginTop: 2,
        }}
      >
        95<span style={{ fontSize: 14, fontWeight: 500 }}>km</span>
      </div>
      <div
        style={{
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: 10,
          color: "#808080",
          marginBottom: 6,
        }}
      >
        Based on Current Settings
      </div>
      <div style={{ position: "relative", height: 52 }}>
        <svg width="160" height="52" viewBox="0 0 160 52">
          <text x="0" y="12" fontSize="9" fill="#808080" fontFamily="Inter">
            120
          </text>
          <text x="0" y="30" fontSize="9" fill="#808080" fontFamily="Inter">
            60
          </text>
          <text x="0" y="48" fontSize="9" fill="#808080" fontFamily="Inter">
            0
          </text>
          <line
            x1="22"
            y1="8"
            x2="155"
            y2="8"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <line
            x1="22"
            y1="26"
            x2="155"
            y2="26"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <line
            x1="22"
            y1="44"
            x2="155"
            y2="44"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          <path
            d="M22 44 Q55 36 88 24 Q110 16 155 12 L155 44 Z"
            fill="rgba(51,242,127,0.15)"
          />
          <path
            d="M22 44 Q55 36 88 24 Q110 16 155 12"
            stroke="#33F27F"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <text
            x="18"
            y="52"
            fontSize="9"
            fill="#54555A"
            fontFamily="Inter"
            textAnchor="middle"
          >
            Now
          </text>
          <text
            x="88"
            y="52"
            fontSize="9"
            fill="#54555A"
            fontFamily="Inter"
            textAnchor="middle"
          >
            +1h
          </text>
          <text
            x="155"
            y="52"
            fontSize="9"
            fill="#54555A"
            fontFamily="Inter"
            textAnchor="middle"
          >
            +2h
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ── Pre-condition Card ──────────────────────────────────────────── */
function PreCondCard() {
  return (
    <div
      style={{
        position: "absolute",
        width: 167,
        height: 110,
        left: 515,
        top: 510,
        background: "rgba(243,237,255,0.9)",
        border: "1px solid #EAEAEA",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        borderRadius: 16,
        padding: "14px 16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#6366F1">
          <path d="M15 13V5a3 3 0 10-6 0v8a5 5 0 106 0zm-3 5a3 3 0 110-6 3 3 0 010 6z" />
        </svg>
        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 16,
            color: "#000",
          }}
        >
          Pre-condition
        </span>
      </div>
      <div
        style={{
          marginTop: 20,
          fontFamily: "Inter",
          fontWeight: 400,
          fontSize: 14,
          color: "#AFB7D1",
        }}
      >
        Schedule at
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 6,
          marginTop: 4,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6366F1"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l3 3M9 2h6M12 2v3" />
        </svg>
        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 15,
            color: "#6366F1",
          }}
        >
          10:00
        </span>
        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 15,
            color: "#AFB7D1",
          }}
        >
          PM
        </span>
      </div>
    </div>
  );
}

/* ── Station Card — pixel-accurate to Figma image 1 ─────────────── */
function StationCard({
  name,
  distance,
  available,
  total,
  availColor,
  power,
  navColor,
  navigateActive,
  onNavigate,
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        borderRadius: 20,
        padding: "14px 16px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Heart button — top right */}
      <button
        onClick={() => setLiked((v) => !v)}
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={liked ? "#ef4444" : "none"}
          stroke={liked ? "#ef4444" : "#9ca3af"}
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>

      {/* Station name */}
      <div
        style={{
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: 18,
          color: "#000",
          marginBottom: 6,
          paddingRight: 28,
        }}
      >
        {name}
      </div>

      {/* Main row: left info + right nav button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        {/* Left: Fast badge, distance·avail, power */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            minWidth: 0,
          }}
        >
          {/* Fast badge */}
          <div
            style={{
              alignSelf: "flex-start",
              background: "#E8F9EF",
              borderRadius: 35,
              padding: "2px 10px",
            }}
          >
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: 12,
                color: "#16A34A",
              }}
            >
              Fast
            </span>
          </div>

          {/* Distance · availability */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              flexWrap: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 13,
                color: "#000",
                whiteSpace: "nowrap",
              }}
            >
              {distance}
            </span>
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#374151",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <span
              style={{
                background: availColor,
                borderRadius: 8,
                padding: "2px 8px",
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 13,
                color: "#000",
                whiteSpace: "nowrap",
              }}
            >
              {available}/{total} available
            </span>
          </div>

          {/* Power */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#16A34A">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 12,
                color: "#808080",
              }}
            >
              Up to {power}
            </span>
          </div>
        </div>

        {/* Right: Navigate button */}
        <div
          onClick={navigateActive && onNavigate ? onNavigate : undefined}
          style={{
            width: 130,
            height: 72,
            background: navColor,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: navigateActive ? "pointer" : "default",
            boxShadow: navigateActive ? "0px 4px 8px rgba(0,0,0,0.2)" : "none",
            flexShrink: 0,
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => {
            if (navigateActive) e.currentTarget.style.opacity = "0.88";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke={navigateActive ? "#fff" : "#c4c4c4"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Nearby Stations Panel ───────────────────────────────────────── */
function NearbyStations({ onStartSession }) {
  const stations = [
    {
      name: "Station A",
      distance: "12km away",
      available: 2,
      total: 4,
      availColor: "#AEF359",
      power: "120 kW",
      navColor: "#16A34A",
      navigateActive: true,
    },
    {
      name: "Station B",
      distance: "28km away",
      available: 1,
      total: 2,
      availColor: "#AEF359",
      power: "60 kW",
      navColor: "#D9D9D9",
      navigateActive: false,
    },
    {
      name: "Station C",
      distance: "75km away",
      available: 1,
      total: 2,
      availColor: "#AEF359",
      power: "120 kW",
      navColor: "#D9D9D9",
      navigateActive: false,
    },
    {
      name: "Station D",
      distance: "120km away",
      available: 0,
      total: 4,
      availColor: "#FF5300",
      power: "120 kW",
      navColor: "#D9D9D9",
      navigateActive: false,
    },
  ];
  return (
    <div
      style={{
        position: "absolute",
        width: 430,
        left: 756,
        top: 90,
        bottom: 148,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 20,
          color: "#000",
          marginBottom: 10,
        }}
      >
        Nearby Stations
      </div>

      {/* Scrollable list */}
      <div
        style={{
          height: 535,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          paddingRight: 10,
          scrollbarWidth: "thin",
          scrollbarColor: "#c9d0e0 transparent",
        }}
      >
        {stations.map((s) => (
          <StationCard key={s.name} {...s} onNavigate={onStartSession} />
        ))}
      </div>
    </div>
  );
}

/* ── Page Root ───────────────────────────────────────────────────── */
export default function ChargingPage({ navActive, setNavActive }) {
  return (
    <div
      style={{
        position: "relative",
        width: 1280,
        height: 800,
        background:
          "linear-gradient(135deg,#e0f4fb 0%,#eaf6f0 60%,#f0f4ff 100%)",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Ambient blobs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          left: -100,
          top: -100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(186,230,253,0.4) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          right: -80,
          bottom: -80,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(209,250,229,0.35) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <TopBar />
      <MapView />
      <AcCard />
      <EcoCard />
      <RangeCard />
      <PreCondCard />
      <NearbyStations />
      <BottomNav active={navActive} setActive={setNavActive} />
    </div>
  );
}
