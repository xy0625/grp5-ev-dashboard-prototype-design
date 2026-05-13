import { useState, useEffect, useRef } from "react";
import BottomNav from "./BottomNav";

// homePage

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

/* ── Theme tokens ────────────────────────────────────────────────── */
function tk(theme) {
  const dark = theme === "dark";
  return {
    pageBg: dark ? "#0F1117" : "#F8F9FB",
    cardBg: dark ? "#1C1F2A" : "#fff",
    cardBorder: dark ? "1px solid #2C2F3E" : "none",
    textPrimary: dark ? "#E8EAF0" : "#000",
    textSecond: dark ? "#9CA3AF" : "#808080",
    textMuted: dark ? "#6B7280" : "#AFB7D1",
    iconStroke: dark ? "#9CA3AF" : "#4B4E53",
    divider: dark ? "#2C2F3E" : "#E5E7EB",
    inputBg: dark ? "#252836" : "#fff",
    inputBorder: dark ? "1px solid #3A3F52" : "1px solid #D9D9D9",
    shadow: dark
      ? "0px 6px 20px rgba(0,0,0,0.5)"
      : "0px 6px 20px rgba(0,0,0,0.1)",
    topBarBg: dark ? "rgba(15,17,23,0.85)" : "transparent",
    aiBg: dark ? "rgba(30,33,48,0.85)" : "rgba(255,255,255,0.7)",
    aiBorder: dark
      ? "1px solid rgba(99,102,241,0.3)"
      : "1px solid rgba(255,255,255,0.6)",
    aiText: dark ? "#C4C8D8" : "#4B4E53",
    profileBg: dark ? "#2A1F4A" : "#F3EDFF",
    tripAccentBg: dark ? "rgba(99,102,241,0.2)" : "rgba(243,237,255,0.8)",
    tripBadgeBg: dark ? "#1E2235" : "#fff",
    tripBadgeBorder: dark ? "1px solid #2C2F3E" : "1px solid #EAEAEA",
    chargeBg: dark ? "rgba(254,243,199,0.15)" : "#FEF3C7",
    chargeText: "#F59E0B",
  };
}

/* ── Top Bar ─────────────────────────────────────────────────────── */
function TopBar({ theme }) {
  const t = tk(theme);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1280,
        height: 62,
        background: t.topBarBg,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 45,
          top: 9,
          width: 50,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke={t.iconStroke}
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: 118,
          top: 9,
          width: 50,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="30"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke={t.iconStroke}
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: 500,
          top: 8,
          width: 300,
          height: 48,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "0 18px",
          background: t.aiBg,
          backdropFilter: "blur(14px)",
          border: t.aiBorder,
          borderRadius: 999,
          boxShadow: "0px 4px 20px rgba(99,102,241,0.12)",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#6366F1 0%,#8B5CF6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 0px 12px rgba(99,102,241,0.5)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
          >
            <path d="M12 15a3 3 0 003-3V7a3 3 0 10-6 0v5a3 3 0 003 3z" />
            <path d="M19 11a7 7 0 01-14 0" />
            <line x1="12" y1="18" x2="12" y2="22" />
          </svg>
        </div>
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 16,
            color: t.aiText,
            letterSpacing: "0.2px",
          }}
        >
          Ask EV Assistant...
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#6366F1",
                opacity: 0.5 + i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1176,
          top: 9,
          width: 49,
          height: 49,
          background: t.profileBg,
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

/* ── Map Area ────────────────────────────────────────────────────── */
function MapArea({ theme }) {
  const t = tk(theme);
  const dark = theme === "dark";
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const tileRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }
    if (window.L) {
      setReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = LEAFLET_JS;
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!ready || !containerRef.current || mapRef.current) return;
    const L = window.L;
    const map = L.map(containerRef.current, {
      center: [1.5295, 110.3592],
      zoom: 15,
      zoomControl: false,
      attributionControl: true,
      dragging: true,
    });

    const tileUrl = dark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    tileRef.current = L.tileLayer(tileUrl, {
      attribution: "© OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const youIcon = L.divIcon({
      html: `<div style="
        width:20px;height:20px;border-radius:50%;
        background:#0078FF;border:3px solid #fff;
        box-shadow:0 0 0 6px rgba(0,120,255,0.2);
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      className: "",
    });

    const arrowIcon = L.divIcon({
      html: `<div style="
        width:0;height:0;
        border-left:12px solid transparent;
        border-right:12px solid transparent;
        border-bottom:30px solid #0078FF;
        filter:drop-shadow(0 0 6px rgba(0,120,255,0.7));
      "></div>`,
      iconSize: [24, 30],
      iconAnchor: [12, 15],
      className: "",
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          map.setView([lat, lng], 16, { animate: true });
          L.marker([lat, lng], { icon: arrowIcon }).addTo(map);
        },
        () => {
          L.marker([1.5295, 110.3592], { icon: arrowIcon }).addTo(map);
        },
      );
    } else {
      L.marker([1.5295, 110.3592], { icon: arrowIcon }).addTo(map);
    }

    mapRef.current = map;
  }, [ready]);

  useEffect(() => {
    if (!mapRef.current || !tileRef.current) return;
    const L = window.L;
    mapRef.current.removeLayer(tileRef.current);
    const tileUrl = dark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    tileRef.current = L.tileLayer(tileUrl, {
      attribution: "© OpenStreetMap",
      maxZoom: 19,
    }).addTo(mapRef.current);
  }, [dark]);

  return (
    <div
      style={{
        position: "absolute",
        width: 442,
        height: 593,
        left: 45,
        top: 62,
        boxShadow: t.shadow,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* Leaflet */}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {/* turn overlay */}
      <div
        style={{
          position: "absolute",
          width: 234,
          top: 22,
          left: 28,
          zIndex: 1000,
          background: dark ? "rgba(28,31,42,0.92)" : "#F5F5F5",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.25)",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 16px",
        }}
      >
        <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
          <path
            d="M8 36V16L24 4"
            stroke={t.textPrimary}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 4h10v10"
            stroke={t.textPrimary}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          <div
            style={{
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: 40,
              lineHeight: "48px",
              color: t.textPrimary,
            }}
          >
            750m
          </div>
          <div
            style={{
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: 16,
              color: t.textPrimary,
            }}
          >
            Turn Right
          </div>
        </div>
      </div>

      {/* speed overlay */}
      <div
        style={{
          position: "absolute",
          width: 145,
          height: 145,
          left: 18,
          top: 431,
          zIndex: 1000,
          background: dark ? "#1C1F2A" : "#fff",
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
          borderRadius: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: 800,
            fontSize: 48,
            lineHeight: "58px",
            color: t.textPrimary,
          }}
        >
          80
        </div>
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 14,
            color: t.textSecond,
          }}
        >
          km/h
        </div>
      </div>

      {/* max speed overlay */}
      <div
        style={{
          position: "absolute",
          width: 75,
          height: 75,
          left: 183,
          top: 473,
          zIndex: 1000,
          background: dark ? "#1C1F2A" : "#fff",
          boxShadow: t.shadow,
          borderRadius: 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 16,
            color: t.textSecond,
          }}
        >
          MAX
        </div>
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: 24,
            color: t.textPrimary,
          }}
        >
          90
        </div>
      </div>

      <style>{`
        .leaflet-map-pane         { z-index: 1 !important; }
        .leaflet-tile-pane        { z-index: 1 !important; }
        .leaflet-control-zoom     { margin-right:8px !important; margin-bottom:8px !important; }
        .leaflet-control-zoom a   { width:28px !important; height:28px !important; line-height:28px !important; font-size:15px !important; }
        .leaflet-control-attribution { font-size:9px !important; }
      `}</style>
    </div>
  );
}

/* ── Battery Card ────────────────────────────────────────────────── */
function BatteryCard({ onGoToSession, setActive, theme }) {
  const t = tk(theme);
  const [status, setStatus] = useState(0);

  const states = [
    {
      title: "Battery",
      percent: 78,
      color: "#49E83D",
      subColor: "#49E83D",
      text: "312 km available",
      bottom: "Not connected · Last charged 2h ago",
      charging: false,
      completed: false,
    },
    {
      title: "Battery",
      percent: 100,
      color: "#49E83D",
      subColor: "#49E83D",
      text: "Charge Completed",
      bottomLeft: "Last charge\n100%",
      bottomRight: "3h 20m\nToday, 09:15AM",
      charging: false,
      completed: true,
    },
    {
      title: "Charging",
      percent: 22,
      color: "#FF1E1E",
      subColor: theme === "dark" ? "#E8EAF0" : "#000",
      text: "95 km remaining",
      bottom: "Est. full charge in",
      eta: "1h 25m",
      charging: true,
      completed: false,
    },
  ];

  const current = states[status];
  const nextState = () => setStatus((s) => (s + 1) % states.length);

  return (
    <div
      onClick={nextState}
      style={{
        position: "absolute",
        width: 356,
        height: 210,
        left: 512,
        top: 64,
        background: t.cardBg,
        border: t.cardBorder,
        boxShadow: t.shadow,
        borderRadius: 20,
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 30,
          top: 22,
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 24,
          color: t.textPrimary,
        }}
      >
        {current.title}
      </div>
      <button
        onClick={() => setActive(1)}
        style={{
          position: "absolute",
          right: 22,
          top: 10,
          background: "none",
          border: "none",
          fontSize: 28,
          color: t.textPrimary,
          cursor: "pointer",
        }}
      >
        …
      </button>
      <div style={{ position: "absolute", left: 30, top: 55 }}>
        <svg width="120" height="60" viewBox="0 0 120 60">
          <rect
            x="2"
            y="8"
            width="104"
            height="44"
            rx="10"
            stroke={current.color}
            strokeWidth="4"
            fill="none"
          />
          <rect
            x="106"
            y="20"
            width="10"
            height="20"
            rx="3"
            fill={current.color}
          />
          <rect
            x="8"
            y="14"
            width={(current.percent / 100) * 88}
            height="32"
            rx="6"
            fill={current.color}
            style={{
              transition: "0.4s ease",
              filter: current.charging
                ? "drop-shadow(0 0 8px rgba(73,232,61,0.8))"
                : "none",
            }}
          />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: 199,
          top: 65,
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: 36,
          color: t.textPrimary,
        }}
      >
        {current.percent}%
      </div>

      {!current.completed && (
        <div
          style={{
            position: "absolute",
            left: 32,
            top: 122,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {current.charging ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#49E83D">
              <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
            </svg>
          ) : (
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: current.color,
              }}
            />
          )}
          <span
            style={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: 16,
              color: current.subColor,
            }}
          >
            {current.text}
          </span>
        </div>
      )}

      {current.completed && (
        <div
          style={{
            position: "absolute",
            left: 32,
            top: 122,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: "2px solid #49E83D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "#49E83D",
            }}
          >
            ✓
          </div>
          <span
            style={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: 15,
              color: "#49E83D",
            }}
          >
            Charge Completed
          </span>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: 152,
          height: 1,
          background: t.divider,
        }}
      />

      {!current.completed && !current.charging && (
        <div
          style={{
            position: "absolute",
            left: 28,
            right: 28,
            top: 165,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: t.textSecond,
              fontWeight: 500,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1,
            }}
          >
            {current.bottom}
          </span>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onGoToSession?.();
            }}
            style={{
              background: t.chargeBg,
              padding: "8px 14px",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B">
              <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
            </svg>
            <span
              style={{ fontSize: 11, fontWeight: 700, color: t.chargeText }}
            >
              Tap to charge
            </span>
          </div>
        </div>
      )}

      {current.charging && (
        <div
          style={{
            position: "absolute",
            left: 32,
            top: 166,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: `2px solid ${t.divider}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: t.textMuted,
            }}
          >
            ⏱
          </div>
          <span style={{ fontSize: 14, color: t.textMuted, fontWeight: 600 }}>
            {current.bottom}
          </span>
          <span style={{ fontSize: 16, color: "#243CFF", fontWeight: 700 }}>
            {current.eta}
          </span>
        </div>
      )}

      {current.completed && (
        <div
          style={{
            position: "absolute",
            left: 28,
            right: 28,
            top: 162,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: t.textSecond, fontWeight: 600 }}>
              Last charge
            </div>
            <div
              style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary }}
            >
              100%
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.textSecond }}>
              3h 20m
            </div>
            <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>
              Today, 09:15AM
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Climate Card ────────────────────────────────────────────────── */
function ClimateCard({ temp, setTemp, setActive, theme }) {
  const t = tk(theme);
  const [activeBars, setActiveBars] = useState([true, false, false]);
  const toggleBar = (index) => {
    if (index === 0) return;
    setActiveBars((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };
  const bars = [10, 14, 18];

  return (
    <div
      style={{
        position: "absolute",
        width: 356,
        height: 142,
        left: 512,
        top: 300,
        background: t.cardBg,
        border: t.cardBorder,
        boxShadow: t.shadow,
        borderRadius: 20,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 28,
          top: 10,
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 24,
          color: t.textPrimary,
        }}
      >
        Climate
      </div>
      <button
        onClick={() => setActive(3)}
        style={{
          position: "absolute",
          right: 20,
          top: 5,
          background: "none",
          border: "none",
          fontFamily: "Inter",
          fontSize: 32,
          color: t.textPrimary,
          cursor: "pointer",
        }}
      >
        ›
      </button>
      <div
        style={{
          position: "absolute",
          left: 31,
          top: 51,
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: 16,
          color: t.textSecond,
        }}
      >
        Auto
      </div>
      <div
        style={{
          position: "absolute",
          left: 26,
          top: 78,
          width: 80,
          height: 46,
          background: t.inputBg,
          border: t.inputBorder,
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill={t.iconStroke}>
          <path d="M12 12c1.5-2 4-3 6-2s3 4 1 6-5 2-7 1c0 2-1 5-3 6s-5 0-5-3 2-5 4-6c-2-1-4-3-3-5s4-2 6-1c1-2 3-4 5-4s4 2 3 4-3 3-5 4h-2z" />
        </svg>
        <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
          {bars.map((h, i) => (
            <div
              key={i}
              onClick={() => toggleBar(i)}
              style={{
                width: 4,
                height: h,
                borderRadius: 2,
                cursor: i === 0 ? "default" : "pointer",
                background: activeBars[i] ? "#0096FF" : t.divider,
                transition: "0.2s",
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 20,
          top: 72,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <button
          onClick={() => setTemp((t2) => Math.max(16, t2 - 1))}
          style={{
            width: 44,
            height: 44,
            border: t.inputBorder,
            borderRadius: 20,
            background: t.inputBg,
            fontSize: 20,
            cursor: "pointer",
            color: t.textPrimary,
          }}
        >
          −
        </button>
        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: 20,
            minWidth: 50,
            textAlign: "center",
            color: t.textPrimary,
          }}
        >
          {temp}°
        </span>
        <button
          onClick={() => setTemp((t2) => Math.min(30, t2 + 1))}
          style={{
            width: 44,
            height: 44,
            border: t.inputBorder,
            borderRadius: 20,
            background: t.inputBg,
            fontSize: 20,
            cursor: "pointer",
            color: t.textPrimary,
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

/* ── Trip Card ───────────────────────────────────────────────────── */
function TripCard({ setActive, theme }) {
  const t = tk(theme);
  return (
    <div
      style={{
        position: "absolute",
        width: 356,
        height: 180,
        left: 512,
        top: 470,
        background: t.cardBg,
        border: t.cardBorder,
        boxShadow: t.shadow,
        borderRadius: 20,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          left: 21,
          top: 8,
          background: t.tripAccentBg,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6366F1"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M3 17l6-12 6 12" />
          <path d="M21 7V17" />
          <path d="M17 7v10" />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          left: 21,
          top: 57,
          background: theme === "dark" ? "rgba(16,185,129,0.15)" : "#E8F9EF",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: 74,
          top: 19,
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: 15,
          color: t.textPrimary,
        }}
      >
        Trip
      </div>
      <div
        style={{
          position: "absolute",
          left: 74,
          top: 60,
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: 14,
          color: t.textPrimary,
        }}
      >
        Vivacity Mall
      </div>
      <div
        style={{
          position: "absolute",
          left: 74,
          top: 78,
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: 12,
          color: t.textSecond,
        }}
      >
        Jalan Setia Raja
      </div>
      <button
        onClick={() => setActive(2)}
        style={{
          position: "absolute",
          right: 18,
          top: 16,
          background: "none",
          border: "none",
          fontFamily: "Inter",
          fontSize: 22,
          cursor: "pointer",
          color: t.textPrimary,
        }}
      >
        ›
      </button>
      {[
        { left: 21, label: "ETA", value: "03:12", sub: "PM", accent: true },
        {
          left: 131,
          label: "Distance",
          value: "3.2",
          sub: "km",
          accent: false,
        },
        { left: 241, label: "Left", value: "14", sub: "min", accent: false },
      ].map(({ left, label, value, sub, accent }) => (
        <div
          key={label}
          style={{
            position: "absolute",
            width: 92,
            height: 56,
            left,
            top: 107,
            background: accent ? t.tripAccentBg : t.tripBadgeBg,
            border: t.tripBadgeBorder,
            boxShadow: t.shadow,
            borderRadius: 16,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 14,
              top: 8,
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: 10,
              color: accent ? "#6366F1" : t.textMuted,
            }}
          >
            {label}
          </div>
          <div
            style={{
              position: "absolute",
              left: 14,
              top: 20,
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: 15,
              color: "#6366F1",
            }}
          >
            {value}
          </div>
          <div
            style={{
              position: "absolute",
              left: 14,
              top: 38,
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: 10,
              color: t.textMuted,
            }}
          >
            {sub}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Clock Card ──────────────────────────────────────────────────── */
function ClockCard({ theme }) {
  const t = tk(theme);
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dow = time.getDay();
  const hh = time.getHours() % 12 || 12;
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ampm = time.getHours() >= 12 ? "PM" : "AM";
  return (
    <div
      style={{
        position: "absolute",
        width: 332,
        height: 164,
        left: 897,
        top: 64,
        background: t.cardBg,
        border: t.cardBorder,
        boxShadow: t.shadow,
        borderRadius: 20,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 33,
          top: 20,
          fontFamily: "Roboto",
          fontWeight: 500,
          fontSize: 14,
          color: "#FFA500",
        }}
      >
        GOOD MORNING
      </div>
      <div
        style={{
          position: "absolute",
          left: 33,
          top: 50,
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: 32,
          color: t.textPrimary,
        }}
      >
        {String(hh).padStart(2, "0")}:{mm}
      </div>
      <div
        style={{
          position: "absolute",
          left: 139,
          top: 57,
          fontFamily: "Roboto",
          fontWeight: 500,
          fontSize: 14,
          color: "#FFA500",
        }}
      >
        {ampm}
      </div>
      <div style={{ position: "absolute", right: 20, top: 20 }}>
        <svg width="52" height="52" viewBox="0 0 52 52">
          <circle
            cx="26"
            cy="26"
            r="22"
            fill={theme === "dark" ? "#2C2F3E" : "#D9D9D9"}
            opacity="0.5"
          />
          <circle cx="26" cy="26" r="2" fill={t.textPrimary} />
          <line
            x1="26"
            y1="26"
            x2="26"
            y2="10"
            stroke={t.textPrimary}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="26"
            y1="26"
            x2="38"
            y2="26"
            stroke={t.textPrimary}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: 33,
          top: 94,
          fontFamily: "Roboto",
          fontWeight: 500,
          fontSize: 14,
          color: t.textPrimary,
        }}
      >
        {
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ][dow]
        }
        , {time.getDate()} {months[time.getMonth()]} {time.getFullYear()}
      </div>
      <div
        style={{
          position: "absolute",
          left: 33,
          top: 120,
          display: "flex",
          gap: 14,
        }}
      >
        {days.map((d, i) => (
          <div
            key={i}
            style={{
              width: 25,
              height: 27,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              border: i === dow ? "2px solid #0078FF" : "none",
              background:
                i === dow
                  ? theme === "dark"
                    ? "rgba(0,120,255,0.15)"
                    : "rgba(245,245,245,0.5)"
                  : "transparent",
              fontFamily: "Roboto",
              fontWeight: 500,
              fontSize: 14,
              color: i === dow ? "#0078FF" : t.textMuted,
            }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Weather Card ────────────────────────────────────────────────── */
function WeatherCard({ theme }) {
  const t = tk(theme);
  return (
    <div
      style={{
        position: "absolute",
        width: 332,
        height: 138,
        left: 896,
        top: 254,
        background:
          theme === "dark"
            ? "#1C1F2A"
            : "linear-gradient(135deg,#e0f2fe 0%,#f0fdf4 100%)",
        border: t.cardBorder,
        boxShadow: t.shadow,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <img
        src="/weather.png"
        alt="Map"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 25%",
          opacity: theme === "dark" ? 0.4 : 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 16,
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 20,
          color: t.textPrimary,
        }}
      >
        Weather
      </div>
      <div
        style={{
          position: "absolute",
          right: 20,
          top: 18,
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 40,
          color: t.textPrimary,
        }}
      >
        24<span style={{ fontSize: 24, fontWeight: 700 }}>°C</span>
      </div>
      <div
        style={{
          position: "absolute",
          right: 20,
          top: 56,
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: 16,
          color: t.textSecond,
        }}
      >
        Cloudy
      </div>
      <div
        style={{
          position: "absolute",
          right: 20,
          top: 80,
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: 12,
          color: t.textSecond,
        }}
      >
        20°C / 26°C
      </div>
    </div>
  );
}

/* ── Music Card ──────────────────────────────────────────────────── */
function MusicCard({ theme }) {
  const songs = [
    {
      title: "Sunset Drive",
      artist: "Ocean Eyes",
      duration: 225,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400",
    },
    {
      title: "Night Fall",
      artist: "Lowlight",
      duration: 210,
      image:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=400",
    },
  ];

  const [songIndex, setSongIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const currentSong = songs[songIndex];
  const total = currentSong.duration;

  useEffect(() => {
    const id = setInterval(() => {
      if (playing)
        setProgress((p) => {
          if (p >= total) {
            nextSong();
            return 0;
          }
          return p + 1;
        });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, total]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const nextSong = () => {
    setSongIndex((prev) => (prev + 1) % songs.length);
    setProgress(0);
  };
  const prevSong = () => {
    setSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
    setProgress(0);
  };
  const pct = (progress / total) * 100;

  return (
    <div
      style={{
        position: "absolute",
        width: 334,
        height: 229,
        left: 895,
        top: 425,
        background: "linear-gradient(134.6deg,#6A8DFF 1.6%,#B8A6FF 50%)",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 26,
          top: 15,
          fontFamily: "Inter",
          fontWeight: 400,
          fontSize: 14,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        Now Playing
      </div>
      <div
        style={{
          position: "absolute",
          right: 18,
          top: 12,
          display: "flex",
          gap: 3,
        }}
      >
        {[13, 18, 22].map((h, i) => (
          <div
            key={i}
            style={{
              width: 3,
              height: h,
              background: "rgba(255,255,255,0.8)",
              borderRadius: 2,
              alignSelf: "flex-end",
            }}
          />
        ))}
      </div>
      <img
        src={currentSong.image}
        alt=""
        style={{
          position: "absolute",
          left: 26,
          top: 48,
          width: 72,
          height: 72,
          borderRadius: 12,
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 116,
          top: 56,
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: 16,
          color: "#fff",
        }}
      >
        {currentSong.title}
      </div>
      <div
        style={{
          position: "absolute",
          left: 118,
          top: 80,
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: 12,
          color: "#fff",
          opacity: 0.6,
        }}
      >
        {currentSong.artist}
      </div>
      <div
        style={{
          position: "absolute",
          left: 26,
          top: 143,
          width: 281,
          height: 8,
          background: "rgba(255,255,255,0.3)",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${pct}%`,
            height: "100%",
            background: "#fff",
            borderRadius: 4,
            transition: "width 1s linear",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `calc(${pct}% - 5px)`,
            top: -1,
            width: 10,
            height: 10,
            background: "#fff",
            borderRadius: "50%",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 26,
          top: 157,
          fontFamily: "Inter",
          fontWeight: 400,
          fontSize: 11,
          color: "#fff",
        }}
      >
        {fmt(progress)}
      </div>
      <div
        style={{
          position: "absolute",
          right: 26,
          top: 157,
          fontFamily: "Inter",
          fontWeight: 400,
          fontSize: 11,
          color: "#fff",
        }}
      >
        {fmt(total)}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 178,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <button
          onClick={prevSong}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
            <path d="M6 6h2v12H6zm3.5 6L18 18V6z" />
          </svg>
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            border: "2.5px solid rgba(255,255,255,0.6)",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {playing ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          onClick={nextSong}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Page Root ───────────────────────────────────────────────────── */
export default function HomePage({
  navActive,
  setNavActive,
  onGoToSession,
  theme,
}) {
  const [temp, setTemp] = useState(24);
  const t = tk(theme);
  return (
    <div
      style={{
        position: "relative",
        width: 1280,
        height: 800,
        background: t.pageBg,
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        transition: "background 0.3s",
      }}
    >
      {/* ── Background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "linear-gradient(155deg, #EEF4FA 0%, #DFF0F8 30%, #D0E8F4 55%, #C8E0F0 75%, #D8ECD8 90%, #EEF6EE 100%)",
        }}
      >
        {[
          {
            top: "5%",
            left: "35%",
            w: 600,
            h: 220,
            rot: -14,
            c: "rgba(160,200,230,0.40)",
          },
          {
            top: "45%",
            left: "55%",
            w: 450,
            h: 170,
            rot: 12,
            c: "rgba(190,220,185,0.35)",
          },
          {
            top: "60%",
            left: "5%",
            w: 380,
            h: 140,
            rot: -8,
            c: "rgba(200,230,195,0.30)",
          },
          {
            top: "15%",
            left: "72%",
            w: 320,
            h: 130,
            rot: 20,
            c: "rgba(155,195,225,0.28)",
          },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: b.top,
              left: b.left,
              width: `${b.w}px`,
              height: `${b.h}px`,
              background: b.c,
              borderRadius: "50%",
              filter: "blur(35px)",
              transform: `rotate(${b.rot}deg)`,
            }}
          />
        ))}
      </div>
      <TopBar theme={theme} />
      <MapArea theme={theme} />
      <BatteryCard
        onGoToSession={onGoToSession}
        setActive={setNavActive}
        theme={theme}
      />
      <ClimateCard
        temp={temp}
        setTemp={setTemp}
        setActive={setNavActive}
        theme={theme}
      />
      <TripCard setActive={setNavActive} theme={theme} />
      <ClockCard theme={theme} />
      <WeatherCard theme={theme} />
      <MusicCard theme={theme} />
      <BottomNav active={navActive} setActive={setNavActive} />
    </div>
  );
}
