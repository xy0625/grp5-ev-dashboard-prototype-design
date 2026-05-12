import { useState } from "react";
import BottomNav from "./BottomNav";
/* ─── SVG Icons ──────────────────────────────────────────────────────────── */

function WifiIcon({ active }) {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <path
        d="M27 38a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z"
        fill={active ? "#fff" : "#434343"}
      />
      <path
        d="M14 26.5C17.8 22.6 22.6 20 27 20s9.2 2.6 13 6.5"
        stroke={active ? "#fff" : "#434343"}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M5 17.5C10.8 11.6 18.5 8 27 8s16.2 3.6 22 9.5"
        stroke={active ? "#fff" : "#434343"}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function BluetoothIcon({ active }) {
  return (
    <svg width="44" height="72" viewBox="0 0 44 72" fill="none">
      <path
        d="M8 16L36 36 8 56"
        stroke={active ? "#268BE5" : "#434343"}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 16L8 36l28 20"
        stroke={active ? "#268BE5" : "#434343"}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GpsIcon({ active }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle
        cx="28"
        cy="28"
        r="18"
        stroke={active ? "#fff" : "#434343"}
        strokeWidth="4.5"
      />
      <circle cx="28" cy="28" r="5" fill={active ? "#fff" : "#434343"} />
      <line
        x1="28"
        y1="4"
        x2="28"
        y2="12"
        stroke={active ? "#fff" : "#434343"}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="44"
        x2="28"
        y2="52"
        stroke={active ? "#fff" : "#434343"}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="28"
        x2="12"
        y2="28"
        stroke={active ? "#fff" : "#434343"}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="44"
        y1="28"
        x2="52"
        y2="28"
        stroke={active ? "#fff" : "#434343"}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <path d="M7 14H17L28 7v28L17 28H7V14z" fill="#434343" />
      <path
        d="M32 14c2.5 2 4 4.8 4 7s-1.5 5-4 7"
        stroke="#434343"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M35 9c4 3 6.5 7.5 6.5 12s-2.5 9-6.5 12"
        stroke="#434343"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function BrightnessIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="7" fill="#434343" />
      <path
        d="M18 2v4M18 30v4M2 18h4M30 18h4M6.1 6.1l2.8 2.8M27.1 27.1l2.8 2.8M6.1 29.9l2.8-2.8M27.1 8.9l2.8-2.8"
        stroke="#434343"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle
        cx="24"
        cy="24"
        r="9"
        fill="#FFCC3D"
        stroke="#FFCC3D"
        strokeWidth="2"
      />
      <path
        d="M24 4v6M24 38v6M4 24h6M38 24h6M8.7 8.7l4.2 4.2M35.1 35.1l4.2 4.2M8.7 39.3l4.2-4.2M35.1 12.9l4.2-4.2"
        stroke="#FFCC3D"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path
      d="M18 4C10.3 4 4 10.3 4 18s6.3 14 14 14c7.7 0 14-6.3 14-14 0-.6 0-1.2-.1-1.8-1.5 3.2-4.8 5.4-8.6 5.4-5.2 0-9.5-4.3-9.5-9.5 0-3.8 2.2-7.1 5.4-8.6-.6-.1-1.2-.1-1.8-.1z"
      fill="#FFCC3D"
    />
  </svg>;
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M7 4l6 6-6 6"
        stroke="#888"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuickToggleCard({ label, active, toggle, Icon }) {
  return (
    <button
      onClick={toggle}
      style={{
        width: "175px",
        height: "140px",
        border: "1px solid rgba(255,255,255,0.8)",
        borderRadius: "35px",
        background: active ? "#268BE5" : "#F5F5F5",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        outline: "none",
        transition: "background 0.22s, transform 0.14s, box-shadow 0.14s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0,0,0,0.3)";
      }}
    >
      <Icon active={active} />
      <span
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: active ? "#fff" : "#434343",
          letterSpacing: "0.3px",
        }}
      >
        {label}
      </span>
    </button>
  );
}

function MenuButton({ label, icon, hasArrow, hasBadge, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "336px",
        height: "90px",
        background: "#fff",
        border: "1px solid #fff",
        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        borderRadius: "35px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: "0 18px 0 22px",
        gap: "14px",
        position: "relative",
        outline: "none",
        transition: "box-shadow 0.18s, transform 0.14s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.18)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0px 4px 4px rgba(0,0,0,0.25)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: "44px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <span
        style={{
          flex: 1,
          fontSize: "21px",
          fontWeight: 400,
          color: "#303030",
          textAlign: "left",
          lineHeight: "1.25",
          whiteSpace: "pre-line",
        }}
      >
        {label}
      </span>

      {hasBadge && (
        <div
          style={{
            position: "absolute",
            right: "64px",
            top: "13px",
            width: "12px",
            height: "12px",
            background: "#FF6868",
            borderRadius: "50%",
          }}
        />
      )}

      {hasArrow ? (
        <ChevronRight />
      ) : (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M14 4v15M8 13l6 6 6-6"
            stroke="#FF7B00"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="5"
            y1="24"
            x2="23"
            y2="24"
            stroke="#FF7B00"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

function ResetModal({ onCancel, onReset }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "28px",
          padding: "40px 44px",
          width: "420px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "12px",
          }}
        >
          <ResetIcon />
        </div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#1E1E1E",
            margin: "0 0 10px",
          }}
        >
          Factory Reset
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "#666",
            margin: "0 0 28px",
            lineHeight: 1.5,
          }}
        >
          This will erase all your settings and data.
          <br />
          This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "12px 28px",
              borderRadius: "16px",
              border: "2px solid #ccc",
              background: "#f5f5f5",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              color: "#333",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onReset}
            style={{
              padding: "12px 28px",
              borderRadius: "16px",
              border: "2px solid #FF9999",
              background: "rgba(255,205,205,0.6)",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              color: "#FF0000",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function LanguageIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="15" stroke="#434343" strokeWidth="2.5" />
      <ellipse
        cx="20"
        cy="20"
        rx="7"
        ry="15"
        stroke="#434343"
        strokeWidth="2.5"
      />
      <line x1="5" y1="20" x2="35" y2="20" stroke="#434343" strokeWidth="2.5" />
      <path
        d="M7 13h26M7 27h26"
        stroke="#434343"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DateTimeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect
        x="5"
        y="9"
        width="30"
        height="26"
        rx="3"
        stroke="#434343"
        strokeWidth="2.5"
      />
      <line x1="5" y1="17" x2="35" y2="17" stroke="#434343" strokeWidth="2.5" />
      <line
        x1="13"
        y1="5"
        x2="13"
        y2="13"
        stroke="#434343"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="27"
        y1="5"
        x2="27"
        y2="13"
        stroke="#434343"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="10" y="21" width="6" height="5" rx="1" fill="#434343" />
      <rect x="19" y="21" width="6" height="5" rx="1" fill="#434343" />
      <rect x="24" y="28" width="6" height="5" rx="1" fill="#434343" />
    </svg>
  );
}

function EmergencyIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <circle cx="21" cy="13" r="7" stroke="#434343" strokeWidth="2.5" />
      <path
        d="M7 38c0-7.7 6.3-14 14-14s14 6.3 14 14"
        stroke="#434343"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect
        x="5"
        y="7"
        width="11"
        height="16"
        rx="2"
        stroke="#434343"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M8 11h5M8 15h5M8 19h5"
        stroke="#434343"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OfflineMapsIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <path
        d="M5 9l11-4 10 4 11-4v28l-11 4-10-4-11 4V9z"
        stroke="#434343"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <line x1="16" y1="5" x2="16" y2="33" stroke="#434343" strokeWidth="2" />
      <line x1="26" y1="9" x2="26" y2="37" stroke="#434343" strokeWidth="2" />
      <path
        d="M30 24l-4 5-4-5M26 29V18"
        stroke="#FF7B00"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M3.5 11a7.5 7.5 0 1 0 1.2-4.1"
        stroke="#FF0000"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M3.5 4.5v7H10"
        stroke="#FF0000"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────────────────── */
function Slider({ value, onChange }) {
  const trackW = 264;
  const thumbSize = 35;
  const fillW = (value / 100) * trackW;
  const thumbLeft = Math.max(
    0,
    Math.min(fillW - thumbSize / 2, trackW - thumbSize),
  );

  return (
    <div
      style={{
        position: "relative",
        width: `${trackW}px`,
        height: "40px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: `${trackW}px`,
          height: "20px",
          background: "rgba(255,255,255,0.65)",
          borderRadius: "10px",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: `${fillW}px`,
          height: "20px",
          background: "#80CCFF",
          borderRadius: "10px",
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${thumbLeft}px`,
          top: "50%",
          transform: "translateY(-50%)",
          width: `${thumbSize}px`,
          height: `${thumbSize}px`,
          background: "#80CCFF",
          border: "3px solid #fff",
          borderRadius: "50%",
          boxShadow: "0 4px 8px rgba(0,0,0,0.22)",
          pointerEvents: "none",
        }}
      />
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "pointer",
          margin: 0,
          zIndex: 10,
        }}
      />
    </div>
  );
}

/* ─── SettingsPage ───────────────────────────────────────────────────────── */
export default function SettingsPage({ navActive, setNavActive, theme, setTheme }) {
  const [wifi, setWifi] = useState(true);
  const [bt, setBt] = useState(false);
  const [gps, setGps] = useState(true);
  const [sound, setSound] = useState(30);
  const [bright, setBright] = useState(75);
  const [autoBright, setAuto] = useState(false);
  const [resetModal, setResetModal] = useState(false);

  const rightMenuItems = [
    { label: "Language", icon: <LanguageIcon />, hasArrow: true },
    { label: "Date & Time", icon: <DateTimeIcon />, hasArrow: true },
    { label: "Emergency\nContact", icon: <EmergencyIcon />, hasArrow: true },
    {
      label: "Offline Maps",
      icon: <OfflineMapsIcon />,
      hasArrow: false,
      hasBadge: true,
    },
  ];

  const quickToggleItems = [
    {
      label: "Wi-Fi",
      active: wifi,
      toggle: () => setWifi((v) => !v),
      Icon: WifiIcon,
    },
    {
      label: "Bluetooth",
      active: bt,
      toggle: () => setBt((v) => !v),
      Icon: BluetoothIcon,
    },
    {
      label: "GPS",
      active: gps,
      toggle: () => setGps((v) => !v),
      Icon: GpsIcon,
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "1280px",
        height: "800px",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        userSelect: "none",
        background: "#fff",
      }}
    >
      {/* ── Background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "linear-gradient(160deg,#e8f2f8 0%,#d4e8f0 25%,#c2dce8 45%,#b8d4e2 65%,#dfe8d0 85%,#f0ead8 100%)",
        }}
      >
        {[
          {
            top: "8%",
            left: "28%",
            w: 520,
            h: 200,
            rot: -18,
            c: "rgba(170,205,228,0.45)",
          },
          {
            top: "38%",
            left: "48%",
            w: 420,
            h: 160,
            rot: 14,
            c: "rgba(195,218,185,0.38)",
          },
          {
            top: "62%",
            left: "8%",
            w: 360,
            h: 130,
            rot: -8,
            c: "rgba(205,228,195,0.33)",
          },
          {
            top: "18%",
            left: "68%",
            w: 310,
            h: 120,
            rot: 22,
            c: "rgba(160,198,220,0.32)",
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
              filter: "blur(32px)",
              transform: `rotate(${b.rot}deg)`,
            }}
          />
        ))}
      </div>

      {/* ── Top-right avatar ── */}
      <div
        style={{
          position: "absolute",
          top: "18px",
          right: "28px",
          zIndex: 10,
          width: "44px",
          height: "44px",
          background: "#fff",
          border: "1.5px solid #ccc",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          cursor: "pointer",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="9" r="5" stroke="#4B4E53" strokeWidth="2" />
          <path
            d="M3 24c0-5.5 4.5-10 10-10s10 4.5 10 10"
            stroke="#4B4E53"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── Left Panel ── */}
      <div
        style={{
          position: "absolute",
          width: "708px",
          height: "593px",
          left: "62px",
          top: "68px",
          background: "rgba(234,234,234,0.78)",
          border: "2px solid #D9D9D9",
          borderRadius: "40px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          zIndex: 1,
        }}
      >
        {/* Quick-toggle buttons */}
        <div
          style={{
            position: "absolute",
            left: "95px",
            top: "95px",
            display: "flex",
            flexDirection: "row",
            gap: "40px",
          }}
        >
          {quickToggleItems.map((item) => (
            <QuickToggleCard key={item.label} {...item} />
          ))}
        </div>

        {/* Sliders + Theme */}
        <div
          style={{
            position: "absolute",
            left: "55px",
            top: "310px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            width: "610px",
          }}
        >
          {/* Sound row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              height: "60px",
            }}
          >
            <span
              style={{
                width: "105px",
                textAlign: "right",
                fontSize: "22px",
                color: "#1E1E1E",
              }}
            >
              Sound
            </span>
            <Slider value={sound} onChange={setSound} />
            <div style={{ marginLeft: "10px" }}>
              <SoundIcon />
            </div>
          </div>

          {/* Brightness row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              height: "60px",
            }}
          >
            <span
              style={{
                width: "105px",
                textAlign: "right",
                fontSize: "22px",
                color: "#1E1E1E",
              }}
            >
              Brightness
            </span>
            <Slider value={bright} onChange={setBright} />
            <button
              onClick={() => setAuto((v) => !v)}
              style={{
                marginLeft: "6px",
                width: "52px",
                height: "58px",
                border: `3px solid ${autoBright ? "#268BE5" : "#434343"}`,
                borderRadius: "8px",
                background: autoBright ? "#268BE5" : "transparent",
                cursor: "pointer",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                outline: "none",
              }}
            >
              <BrightnessIcon />
              <span
                style={{
                  position: "absolute",
                  bottom: "3px",
                  right: "5px",
                  fontSize: "13px",
                  fontWeight: 900,
                  color: autoBright ? "#fff" : "#1E1E1E",
                }}
              >
                A
              </span>
            </button>
          </div>

          {/* Theme row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              height: "80px",
            }}
          >
            <span
              style={{
                width: "105px",
                textAlign: "right",
                fontSize: "22px",
                color: "#1E1E1E",
              }}
            >
              Theme
            </span>
            <div
              onClick={() =>
                setTheme((t) => (t === "light" ? "dark" : "light"))
              }
              style={{
                marginLeft: "8px",
                position: "relative",
                width: "176px",
                height: "74px",
                borderRadius: "100px",
                background:
                  theme === "light"
                    ? "linear-gradient(180deg,#FFD739 0%,#FFEA97 100%)"
                    : "linear-gradient(180deg,#2a3555 0%,#111d3a 100%)",
                boxShadow: "inset 0px 4px 4px rgba(0,0,0,0.22)",
                cursor: "pointer",
                transition: "background 0.4s",
              }}
            >
              {/* Label */}
              <span
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "20px",
                  fontWeight: 900,
                  color: theme === "light" ? "#fff" : "#8090b8",
                  transition: "color 0.3s",
                }}
              >
                {theme === "light" ? "Light" : "Dark"}
              </span>
              {/* Knob */}
              <div
                style={{
                  position: "absolute",
                  left: theme === "light" ? "4px" : "calc(100% - 82px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "78px",
                  height: "66px",
                  background: "#fff",
                  borderRadius: "100px",
                  boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "left 0.35s cubic-bezier(.4,0,.2,1)",
                }}
              >
                {theme === "light" ? <SunIcon /> : <MoonIcon />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div
        style={{
          position: "absolute",
          width: "389px",
          height: "593px",
          left: "830px",
          top: "71px",
          background: "rgba(234,234,234,0.78)",
          border: "2px solid #D9D9D9",
          borderRadius: "40px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "22px",
            top: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "348px",
          }}
        >
          {rightMenuItems.map(({ label, icon, hasArrow, hasBadge }) => (
            <MenuButton
              key={label}
              label={label}
              icon={icon}
              hasArrow={hasArrow}
              hasBadge={hasBadge}
              onClick={() => alert(`${label.replace("\n", " ")} settings`)}
            />
          ))}

          {/* Factory Reset */}
          <button
            onClick={() => setResetModal(true)}
            style={{
              alignSelf: "center",
              marginTop: "10px",
              width: "228px",
              height: "55px",
              background: "rgba(255,205,205,0.5)",
              border: "2px solid #FF9999",
              borderRadius: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              outline: "none",
              transition: "background 0.18s, transform 0.14s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,180,180,0.65)";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,205,205,0.5)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ResetIcon />
            <span
              style={{ fontSize: "20px", fontWeight: 400, color: "#FF0000" }}
            >
              Factory Reset
            </span>
          </button>
        </div>
      </div>

      <BottomNav active={navActive} setActive={setNavActive} />

      {resetModal && (
        <ResetModal
          onCancel={() => setResetModal(false)}
          onReset={() => {
            setResetModal(false);
            alert("Factory reset triggered.");
          }}
        />
      )}
    </div>
  );
}
