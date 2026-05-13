import { useState } from "react";
import BottomNav from "./BottomNav";

/* ─── Press Effect Hook ──────────────────────────────────────────────────── */
function usePressEffect() {
  return {
    onMouseDown: (e) => {
      e.currentTarget.style.transform = "scale(0.94)";
      e.currentTarget.style.opacity = "0.85";
    },
    onMouseUp: (e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.opacity = "1";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.opacity = "1";
    },
    onTouchStart: (e) => {
      e.currentTarget.style.transform = "scale(0.94)";
      e.currentTarget.style.opacity = "0.85";
    },
    onTouchEnd: (e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.opacity = "1";
    },
  };
}

/* ─── SVG Icons ──────────────────────────────────────────────────────────── */

function WifiIcon({ active }) {
  const c = active ? "#fff" : "#434343";
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <path d="M27 38a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z" fill={c} />
      <path
        d="M14 26.5C17.8 22.6 22.6 20 27 20s9.2 2.6 13 6.5"
        stroke={c}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M5 17.5C10.8 11.6 18.5 8 27 8s16.2 3.6 22 9.5"
        stroke={c}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* Fix 3: Bluetooth icon visible when active — use white stroke on blue bg */
function BluetoothIcon({ active }) {
  const c = active ? "#fff" : "#434343";

  return (
    <svg
      width="50"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" />
    </svg>
  );
}

function GpsIcon({ active }) {
  const c = active ? "#fff" : "#434343";
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="18" stroke={c} strokeWidth="4.5" />
      <circle cx="28" cy="28" r="5" fill={c} />
      <line
        x1="28"
        y1="4"
        x2="28"
        y2="12"
        stroke={c}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="28"
        y1="44"
        x2="28"
        y2="52"
        stroke={c}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="4"
        y1="28"
        x2="12"
        y2="28"
        stroke={c}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="44"
        y1="28"
        x2="52"
        y2="28"
        stroke={c}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Fix 4: Sound icon changes based on muted/sound level */
function SoundIcon({ muted }) {
  if (muted) {
    return (
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
        <path d="M7 14H17L28 7v28L17 28H7V14z" fill="#434343" />
        <line
          x1="32"
          y1="14"
          x2="42"
          y2="28"
          stroke="#434343"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="42"
          y1="14"
          x2="32"
          y2="28"
          stroke="#434343"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
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

/* Fix 4: Auto brightness icon - clean square button with sun + A */
function AutoBrightnessIcon({ active }) {
  const c = active ? "#fff" : "#434343";

  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <circle cx="14" cy="13" r="5" fill={c} />
      <path
        d="M14 2v3M14 21v3M3 13h3M22 13h3M5.9 5.9l2.1 2.1M19.9 19.9l2.1 2.1M5.9 20.1l2.1-2.1M19.9 6.1l2.1-2.1"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="20"
        y="33"
        fontSize="13"
        fontWeight="900"
        fill={c}
        fontFamily="Inter,sans-serif"
      >
        A
      </text>
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

/* Fix 2: MoonIcon — fixed missing return statement */
function MoonIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path
        d="M18 4C10.3 4 4 10.3 4 18s6.3 14 14 14c7.7 0 14-6.3 14-14 0-.6 0-1.2-.1-1.8-1.5 3.2-4.8 5.4-8.6 5.4-5.2 0-9.5-4.3-9.5-9.5 0-3.8 2.2-7.1 5.4-8.6-.6-.1-1.2-.1-1.8-.1z"
        fill="#FFCC3D"
      />
    </svg>
  );
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

/* Fix 6: No hover effects, press effect only */
function QuickToggleCard({ label, active, toggle, Icon }) {
  const press = usePressEffect();
  return (
    <button
      onClick={toggle}
      {...press}
      style={{
        width: "175px",
        height: "160px",
        border: "1px solid rgba(255,255,255,0.8)",
        borderRadius: "28px",
        background: active ? "#268BE5" : "#F0F0F0",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.12)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        outline: "none",
        transition: "transform 0.1s, opacity 0.1s, background 0.22s",
      }}
    >
      <Icon active={active} />
      <span
        style={{
          fontSize: "14px",
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

/* Fix 6: MenuButton — no hover, only press */
function MenuButton({
  label,
  icon,
  hasArrow,
  hasBadge,
  onClick,
  rightContent,
}) {
  const press = usePressEffect();
  return (
    <button
      onClick={onClick}
      {...press}
      style={{
        width: "100%",
        height: "78px",
        background: "#fff",
        border: "none",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        borderRadius: "22px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: "0 18px 0 20px",
        gap: "14px",
        position: "relative",
        outline: "none",
        transition: "transform 0.1s, opacity 0.1s",
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
          fontSize: "19px",
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
            right: "12px",
            top: "12px",
            width: "11px",
            height: "11px",
            background: "#FF6868",
            borderRadius: "50%",
          }}
        />
      )}
      {rightContent || (hasArrow ? <ChevronRight /> : null)}
    </button>
  );
}

function ResetModal({ onCancel, onReset }) {
  const pressCancel = usePressEffect();
  const pressReset = usePressEffect();
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
            {...pressCancel}
            style={{
              padding: "12px 28px",
              borderRadius: "16px",
              border: "2px solid #ccc",
              background: "#f5f5f5",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              color: "#333",
              transition: "transform 0.1s, opacity 0.1s",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onReset}
            {...pressReset}
            style={{
              padding: "12px 28px",
              borderRadius: "16px",
              border: "2px solid #FF9999",
              background: "rgba(255,205,205,0.6)",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              color: "#FF0000",
              transition: "transform 0.1s, opacity 0.1s",
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

function SystemIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      {/* outer circle */}
      <circle cx="21" cy="21" r="16" stroke="#434343" strokeWidth="2.5" />

      {/* dot of "i" */}
      <circle cx="21" cy="14" r="1.8" fill="#434343" />

      {/* stem of "i" */}
      <path
        d="M21 18v12"
        stroke="#434343"
        strokeWidth="2.5"
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12a8 8 0 1 0 2.3-5.7"
        stroke="#FF0000"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      <path
        d="M4 3v6h6"
        stroke="#FF0000"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Fix 5: Download icon with loading/done states */
function DownloadStateIcon({ state }) {
  if (state === "loading") {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        style={{ animation: "spin 1s linear infinite" }}
      >
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        <circle
          cx="14"
          cy="14"
          r="10"
          stroke="#268BE5"
          strokeWidth="3"
          strokeDasharray="40 20"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (state === "done") {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" fill="#22C55E" />
        <path
          d="M8 14l4 4 8-8"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // default download icon
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
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
  );
}

/* ─── Slider ─────────────────────────────────────────────────────────────── */
function Slider({ value, onChange }) {
  const trackW = 300;
  const thumbSize = 32;
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
      {/* Track bg */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: `${trackW}px`,
          height: "18px",
          background: "rgba(255,255,255,0.7)",
          borderRadius: "9px",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08)",
        }}
      />
      {/* Fill */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: `${Math.max(fillW, 0)}px`,
          height: "18px",
          background: "#80CCFF",
          borderRadius: "9px",
          pointerEvents: "none",
        }}
      />
      {/* Thumb */}
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
          boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
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
export default function SettingsPage({
  navActive,
  setNavActive,
  theme,
  setTheme,
}) {
  const [wifi, setWifi] = useState(true);
  const [bt, setBt] = useState(false);
  const [gps, setGps] = useState(true);
  const [sound, setSound] = useState(30);
  const [bright, setBright] = useState(75);
  const [autoBright, setAuto] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  /* Fix 5: download state */
  const [mapState, setMapState] = useState("idle"); // idle | loading | done

  const pressReset = usePressEffect();

  function handleDownloadMap() {
    if (mapState !== "idle") return;
    setMapState("loading");
    setTimeout(() => setMapState("done"), 2500);
  }

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
      {/* ── Background (Fix 7: preserved) ── */}
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

      {/* ── Fix 1: Left Panel — proper layout matching Image 2 ── */}
      <div
        style={{
          position: "absolute",
          left: "36px",
          top: "68px",
          width: "700px",
          height: "560px",
          background: "rgba(225,228,232,0.82)",
          border: "1.5px solid rgba(255,255,255,0.6)",
          borderRadius: "32px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          zIndex: 1,
        }}
      >
        {/* Quick-toggle buttons — centered row */}
        <div
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            top: "40px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "36px",
          }}
        >
          {quickToggleItems.map((item) => (
            <QuickToggleCard key={item.label} {...item} />
          ))}
        </div>

        {/* Sliders + Theme — bottom section */}
        <div
          style={{
            position: "absolute",
            left: "52px",
            right: "52px",
            top: "280px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Sound row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              height: "52px",
            }}
          >
            <span
              style={{
                width: "110px",
                textAlign: "right",
                fontSize: "20px",
                color: "#1E1E1E",
                fontWeight: 500,
              }}
            >
              Sound
            </span>
            <Slider value={sound} onChange={setSound} />
            {/* Fix 4: sound icon changes when muted */}
            <div
              style={{
                marginLeft: "8px",
                width: "42px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SoundIcon muted={sound === 0} />
            </div>
          </div>

          {/* Brightness row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              height: "52px",
            }}
          >
            <span
              style={{
                width: "110px",
                textAlign: "right",
                fontSize: "20px",
                color: "#1E1E1E",
                fontWeight: 500,
              }}
            >
              Brightness
            </span>
            <Slider value={bright} onChange={setBright} />
            {/* Fix 4: auto brightness button — cleaner look */}
            <button
              onClick={() => setAuto((v) => !v)}
              {...usePressEffect()}
              style={{
                marginLeft: "8px",
                width: "52px",
                height: "52px",
                border: "none",
                borderRadius: "12px",
                background: autoBright ? "#268BE5" : "#ffffff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                outline: "none",
                transition: "transform 0.1s, opacity 0.1s, background 0.2s",
                flexShrink: 0,
              }}
            >
              <AutoBrightnessIcon active={autoBright} />
            </button>
          </div>

          {/* Theme row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              height: "80px",
            }}
          >
            <span
              style={{
                width: "110px",
                textAlign: "right",
                fontSize: "20px",
                color: "#1E1E1E",
                fontWeight: 500,
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
                width: "180px",
                height: "70px",
                borderRadius: "100px",
                /* Fix 2: Dark mode toggle looks correct */
                background:
                  theme === "light"
                    ? "linear-gradient(180deg,#FFD739 0%,#FFEA97 100%)"
                    : "linear-gradient(180deg,#2E29AF 0%,#9170FF 100%)",
                boxShadow: "inset 0px 3px 6px rgba(0,0,0,0.25)",
                cursor: "pointer",
                transition: "background 0.4s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  right: theme === "light" ? "35px" : "100px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "18px",
                  fontWeight: 800,
                  color: theme === "light" ? "#fff" : "#ffffff",
                  transition: "color 0.3s",
                }}
              >
                {theme === "light" ? "Light" : "Dark"}
              </span>
              {/* Fix 2: Knob sizing correct */}
              <div
                style={{
                  position: "absolute",
                  left: theme === "light" ? "4px" : "calc(100% - 70px)",
                  top: "50%",
                  transform: "translateY(-50%) translateX(-10%)",
                  width: "80px",
                  height: "80px",
                  background: "#fff",
                  borderRadius: "100px",
                  boxShadow: "0px 3px 6px rgba(0,0,0,0.22)",
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

      {/* ── Fix 1: Right Panel ── */}
      <div
        style={{
          position: "absolute",
          left: "820px",
          top: "68px",
          width: "424px",
          height: "560px",
          background: "rgba(225,228,232,0.82)",
          border: "1.5px solid rgba(255,255,255,0.6)",
          borderRadius: "32px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "20px",
            right: "20px",
            top: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Language */}
          <MenuButton
            label="Language"
            icon={<LanguageIcon />}
            hasArrow
            onClick={() => alert("Language settings")}
          />

          {/* Date & Time */}
          <MenuButton
            label="Date & Time"
            icon={<DateTimeIcon />}
            hasArrow
            onClick={() => alert("Date & Time settings")}
          />

          {/* Fix 5: Offline Maps with download state */}
          <MenuButton
            label="Offline Maps"
            icon={<OfflineMapsIcon />}
            hasBadge={mapState === "idle"}
            onClick={handleDownloadMap}
            rightContent={<DownloadStateIcon state={mapState} />}
          />

          {/* System */}
          <MenuButton
            label={"System"}
            icon={<SystemIcon />}
            hasArrow
            onClick={() => alert("System info and updates")}
          />

          {/* Factory Reset */}
          <button
            onClick={() => setResetModal(true)}
            {...pressReset}
            style={{
              alignSelf: "center",
              marginTop: "8px",
              width: "240px",
              height: "58px",
              background: "rgba(255,205,205,0.5)",
              border: "1.5px solid #FF9999",
              borderRadius: "22px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              outline: "none",
              transition: "transform 0.1s, opacity 0.1s",
            }}
          >
            <ResetIcon />
            <span
              style={{ fontSize: "19px", fontWeight: 500, color: "#FF0000" }}
            >
              Factory Reset
            </span>
          </button>
        </div>
      </div>

      {/* Fix 7: BottomNav preserved */}
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
