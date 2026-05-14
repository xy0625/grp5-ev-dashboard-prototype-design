import { useState } from "react";
import BottomNav from "./BottomNav";

// settingsPage.jsx — with dark mode support

/* ── Theme tokens ────────────────────────────────────────────────── */
function tk(theme) {
  const dark = theme === "dark";
  return {
    pageBg: dark
      ? "#0F1117"
      : "linear-gradient(135deg, #E6F3F0 0%, #EBF6F5 50%, #EFF3F8 100%)",
    cardBg: dark ? "rgba(28,31,42,0.92)" : "rgba(255,255,255,0.65)",
    cardBorder: dark ? "1px solid #2C2F3E" : "1px solid rgba(255,255,255,0.6)",
    cardBackdrop: "blur(25px)",
    textPrimary: dark ? "#E8EAF0" : "#444",
    textSecond: dark ? "#9CA3AF" : "#9AA1B1",
    textMuted: dark ? "#6B7280" : "#9AA1B1",
    iconStroke: dark ? "#9CA3AF" : "#9AA1B1",
    divider: dark ? "#2C2F3E" : "rgba(154,161,177,0.12)",
    inputBg: dark ? "#252836" : "rgba(244,247,250,0.85)",
    shadow: dark
      ? "0px 25px 60px rgba(0,0,0,0.5)"
      : "0px 25px 60px rgba(0,0,0,0.06)",
    menuBg: dark ? "rgba(30,33,48,0.85)" : "rgba(255,255,255,0.65)",
    menuBorder: dark ? "1px solid #2C2F3E" : "1px solid rgba(255,255,255,0.6)",
    menuShadow: dark
      ? "0 4px 12px rgba(0,0,0,0.4)"
      : "0 4px 12px rgba(0,0,0,0.04)",
    toggleOff: dark ? "rgba(45,50,65,0.9)" : "rgba(244,247,250,0.85)",
    toggleBorder: dark
      ? "1px solid #3A3F52"
      : "1px solid rgba(154,161,177,0.25)",
    sliderTrack: dark ? "rgba(255,255,255,0.1)" : "rgba(154,161,177,0.2)",
    blobA: dark ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.35)",
    blobB: dark ? "rgba(47,128,237,0.05)" : "rgba(47,128,237,0.07)",
    avatarBg: dark ? "rgba(30,33,48,0.85)" : "rgba(255,255,255,0.7)",
    avatarBorder: dark
      ? "1px solid #2C2F3E"
      : "1px solid rgba(255,255,255,0.6)",
    resetBg: dark ? "rgba(255,107,107,0.12)" : "rgba(255,107,107,0.08)",
    resetBorder: dark
      ? "1px solid rgba(255,107,107,0.3)"
      : "1px solid rgba(255,107,107,0.25)",
    modalBg: dark ? "rgba(20,22,32,0.95)" : "rgba(255,255,255,0.92)",
    modalBorder: dark ? "1px solid #2C2F3E" : "1px solid rgba(255,255,255,0.7)",
    cancelBg: dark ? "rgba(45,50,65,0.9)" : "rgba(244,247,250,0.8)",
    cancelBorder: dark
      ? "1px solid #3A3F52"
      : "1px solid rgba(154,161,177,0.3)",
    cancelText: dark ? "#9CA3AF" : "#666",
  };
}

/* ─── Press Effect Hook ──────────────────────────────────────────────────── */
function usePressEffect() {
  return {
    onMouseDown: (e) => {
      e.currentTarget.style.transform = "scale(0.94)";
      e.currentTarget.style.opacity = "0.82";
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
      e.currentTarget.style.opacity = "0.82";
    },
    onTouchEnd: (e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.opacity = "1";
    },
  };
}

/* ─── SVG Icons ──────────────────────────────────────────────────────────── */
function WifiIcon({ active, theme }) {
  const c = active ? "#fff" : tk(theme).iconStroke;
  return (
    <svg width="44" height="44" viewBox="0 0 54 54" fill="none">
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

function BluetoothIcon({ active, theme }) {
  const c = active ? "#fff" : tk(theme).iconStroke;
  return (
    <svg
      width="40"
      height="46"
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

function GpsIcon({ active, theme }) {
  const c = active ? "#fff" : tk(theme).iconStroke;
  return (
    <svg width="44" height="44" viewBox="0 0 56 56" fill="none">
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

function SoundIcon({ muted, theme }) {
  const c = tk(theme).iconStroke;
  if (muted) {
    return (
      <svg width="32" height="32" viewBox="0 0 42 42" fill="none">
        <path d="M7 14H17L28 7v28L17 28H7V14z" fill={c} />
        <line
          x1="32"
          y1="14"
          x2="42"
          y2="28"
          stroke={c}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="42"
          y1="14"
          x2="32"
          y2="28"
          stroke={c}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg width="32" height="32" viewBox="0 0 42 42" fill="none">
      <path d="M7 14H17L28 7v28L17 28H7V14z" fill={c} />
      <path
        d="M32 14c2.5 2 4 4.8 4 7s-1.5 5-4 7"
        stroke={c}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M35 9c4 3 6.5 7.5 6.5 12s-2.5 9-6.5 12"
        stroke={c}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function AutoBrightnessIcon({ active, theme }) {
  const c = active ? "#fff" : tk(theme).iconStroke;
  return (
    <svg width="26" height="26" viewBox="0 0 36 36" fill="none">
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
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
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
  return (
    <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
      <path
        d="M18 4C10.3 4 4 10.3 4 18s6.3 14 14 14c7.7 0 14-6.3 14-14 0-.6 0-1.2-.1-1.8-1.5 3.2-4.8 5.4-8.6 5.4-5.2 0-9.5-4.3-9.5-9.5 0-3.8 2.2-7.1 5.4-8.6-.6-.1-1.2-.1-1.8-.1z"
        fill="#FFCC3D"
      />
    </svg>
  );
}

function ChevronRight({ theme }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M7 4l6 6-6 6"
        stroke={tk(theme).textMuted}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LanguageIcon({ theme }) {
  const c = tk(theme).iconStroke;
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="15" stroke={c} strokeWidth="2.5" />
      <ellipse cx="20" cy="20" rx="7" ry="15" stroke={c} strokeWidth="2.5" />
      <line x1="5" y1="20" x2="35" y2="20" stroke={c} strokeWidth="2.5" />
      <path
        d="M7 13h26M7 27h26"
        stroke={c}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DateTimeIcon({ theme }) {
  const c = tk(theme).iconStroke;
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
      <rect
        x="5"
        y="9"
        width="30"
        height="26"
        rx="3"
        stroke={c}
        strokeWidth="2.5"
      />
      <line x1="5" y1="17" x2="35" y2="17" stroke={c} strokeWidth="2.5" />
      <line
        x1="13"
        y1="5"
        x2="13"
        y2="13"
        stroke={c}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="27"
        y1="5"
        x2="27"
        y2="13"
        stroke={c}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="10" y="21" width="6" height="5" rx="1" fill={c} />
      <rect x="19" y="21" width="6" height="5" rx="1" fill={c} />
      <rect x="24" y="28" width="6" height="5" rx="1" fill={c} />
    </svg>
  );
}

function SystemIcon({ theme }) {
  const c = tk(theme).iconStroke;
  return (
    <svg width="36" height="36" viewBox="0 0 42 42" fill="none">
      <circle cx="21" cy="21" r="16" stroke={c} strokeWidth="2.5" />
      <circle cx="21" cy="14" r="1.8" fill={c} />
      <path d="M21 18v12" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function OfflineMapsIcon({ theme }) {
  const c = tk(theme).iconStroke;
  return (
    <svg width="36" height="36" viewBox="0 0 42 42" fill="none">
      <path
        d="M5 9l11-4 10 4 11-4v28l-11 4-10-4-11 4V9z"
        stroke={c}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <line x1="16" y1="5" x2="16" y2="33" stroke={c} strokeWidth="2" />
      <line x1="26" y1="9" x2="26" y2="37" stroke={c} strokeWidth="2" />
      <path
        d="M30 24l-4 5-4-5M26 29V18"
        stroke="#2F80ED"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12a8 8 0 1 0 2.3-5.7"
        stroke="#FF6B6B"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M4 3v6h6"
        stroke="#FF6B6B"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadStateIcon({ state }) {
  if (state === "loading") {
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        fill="none"
        style={{ animation: "spin 1s linear infinite" }}
      >
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        <circle
          cx="14"
          cy="14"
          r="10"
          stroke="#2F80ED"
          strokeWidth="3"
          strokeDasharray="40 20"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (state === "done") {
    return (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
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
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 4v15M8 13l6 6 6-6"
        stroke="#2F80ED"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="5"
        y1="24"
        x2="23"
        y2="24"
        stroke="#2F80ED"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────────────────── */
function Slider({ value, onChange, accentColor = "#2F80ED", theme }) {
  const t = tk(theme);
  const trackW = 300;
  const thumbSize = 26;
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
        height: "36px",
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
          height: "10px",
          background: t.sliderTrack,
          borderRadius: "5px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: `${Math.max(fillW, 0)}px`,
          height: "10px",
          background: accentColor,
          borderRadius: "5px",
          pointerEvents: "none",
          opacity: 0.7,
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
          background: theme === "dark" ? "#E8EAF0" : "#fff",
          border: `3px solid ${accentColor}`,
          borderRadius: "50%",
          boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
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

/* ─── Quick Toggle Card ─────────────────────────────────────────────────── */
function QuickToggleCard({ label, active, toggle, Icon, theme }) {
  const t = tk(theme);
  const press = usePressEffect();
  return (
    <button
      onClick={toggle}
      {...press}
      style={{
        flex: 1,
        height: "110px",
        border: active ? "none" : t.toggleBorder,
        borderRadius: "24px",
        background: active
          ? "linear-gradient(135deg, #2F80ED, #56CCF2)"
          : t.toggleOff,
        boxShadow: active
          ? "0 10px 25px rgba(47,128,237,0.3)"
          : "0 4px 12px rgba(0,0,0,0.04)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        outline: "none",
        transition:
          "transform 0.1s, opacity 0.1s, background 0.3s, box-shadow 0.3s",
      }}
    >
      <Icon active={active} theme={theme} />
      <span
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: active ? "#fff" : t.textSecond,
          letterSpacing: "1.2px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </button>
  );
}

/* ─── Menu Row Button ───────────────────────────────────────────────────── */
function MenuButton({
  label,
  icon,
  hasArrow,
  hasBadge,
  onClick,
  rightContent,
  theme,
}) {
  const t = tk(theme);
  const press = usePressEffect();
  return (
    <button
      onClick={onClick}
      {...press}
      style={{
        width: "100%",
        height: "68px",
        background: t.menuBg,
        backdropFilter: "blur(10px)",
        border: t.menuBorder,
        borderRadius: "20px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: "0 18px",
        gap: "14px",
        position: "relative",
        outline: "none",
        transition: "transform 0.1s, opacity 0.1s",
        boxShadow: t.menuShadow,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: "38px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <span
        style={{
          flex: 1,
          fontSize: "17px",
          fontWeight: 600,
          color: t.textPrimary,
          textAlign: "left",
        }}
      >
        {label}
      </span>
      {hasBadge && (
        <div
          style={{
            position: "absolute",
            right: "14px",
            top: "12px",
            width: "10px",
            height: "10px",
            background: "#FF6B6B",
            borderRadius: "50%",
          }}
        />
      )}
      {rightContent || (hasArrow ? <ChevronRight theme={theme} /> : null)}
    </button>
  );
}

/* ─── Reset Modal ───────────────────────────────────────────────────────── */
function ResetModal({ onCancel, onReset, theme }) {
  const t = tk(theme);
  const pressCancel = usePressEffect();
  const pressReset = usePressEffect();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: t.modalBg,
          backdropFilter: "blur(20px)",
          borderRadius: "32px",
          padding: "44px 48px",
          width: "400px",
          boxShadow: t.shadow,
          textAlign: "center",
          border: t.modalBorder,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "rgba(255,107,107,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ResetIcon />
          </div>
        </div>
        <h2
          style={{
            fontSize: "21px",
            fontWeight: 800,
            color: t.textPrimary,
            margin: "0 0 8px",
            letterSpacing: "-0.3px",
          }}
        >
          Factory Reset
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: t.textSecond,
            margin: "0 0 30px",
            lineHeight: 1.6,
          }}
        >
          This will erase all your settings and data.
          <br />
          This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={onCancel}
            {...pressCancel}
            style={{
              padding: "12px 28px",
              borderRadius: "14px",
              border: t.cancelBorder,
              background: t.cancelBg,
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              color: t.cancelText,
              transition: "transform 0.1s, opacity 0.1s",
              outline: "none",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onReset}
            {...pressReset}
            style={{
              padding: "12px 28px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              color: "#fff",
              boxShadow: "0 8px 20px rgba(255,107,107,0.35)",
              transition: "transform 0.1s, opacity 0.1s",
              outline: "none",
            }}
          >
            Reset
          </button>
        </div>
      </div>
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
  const [mapState, setMapState] = useState("idle");

  const t = tk(theme);
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
        background: t.pageBg,
        transition: "background 0.3s",
      }}
    >
      {/* Background accent blobs */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: t.blobA,
          borderRadius: "50%",
          top: "-80px",
          right: "-80px",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: t.blobB,
          borderRadius: "50%",
          bottom: "60px",
          left: "60px",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Top-right avatar */}
      <div
        style={{
          position: "absolute",
          top: "25px",
          right: "60px",
          zIndex: 10,
          width: "50px",
          height: "50px",
          background: t.avatarBg,
          backdropFilter: "blur(10px)",
          border: t.avatarBorder,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: t.menuShadow,
          cursor: "pointer",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="9" r="5" stroke={t.iconStroke} strokeWidth="2" />
          <path
            d="M3 24c0-5.5 4.5-10 10-10s10 4.5 10 10"
            stroke={t.iconStroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── Two Cards Layout ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "48%",
          transform: "translate(-50%, -55%)",
          display: "flex",
          gap: "24px",
          alignItems: "flex-start",
        }}
      >
        {/* ── LEFT CARD ── */}
        <div
          style={{
            background: t.cardBg,
            backdropFilter: t.cardBackdrop,
            borderRadius: "38px",
            border: t.cardBorder,
            width: "600px",
            height: "510px",
            boxShadow: t.shadow,
            display: "flex",
            flexDirection: "column",
            padding: "32px 36px",
            gap: "24px",
            transition: "background 0.3s, border 0.3s",
          }}
        >
          {/* Connectivity toggles */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: t.textMuted,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              CONNECTIVITY
            </span>
            <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
              {quickToggleItems.map((item) => (
                <QuickToggleCard key={item.label} {...item} theme={theme} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{ height: "1px", background: t.divider, flexShrink: 0 }}
          />

          {/* Audio & Display */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: t.textMuted,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              AUDIO & DISPLAY
            </span>

            {/* Sound row */}
            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <span
                style={{
                  width: "90px",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: t.textPrimary,
                  textAlign: "right",
                }}
              >
                Sound
              </span>
              <Slider
                value={sound}
                onChange={setSound}
                accentColor="#2F80ED"
                theme={theme}
              />
              <SoundIcon muted={sound === 0} theme={theme} />
            </div>

            {/* Brightness row */}
            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <span
                style={{
                  width: "90px",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: t.textPrimary,
                  textAlign: "right",
                }}
              >
                Brightness
              </span>
              <Slider
                value={bright}
                onChange={setBright}
                accentColor="#2F80ED"
                theme={theme}
              />
              <button
                onClick={() => setAuto((v) => !v)}
                {...usePressEffect()}
                style={{
                  width: "44px",
                  height: "44px",
                  border: "none",
                  borderRadius: "12px",
                  background: autoBright
                    ? "linear-gradient(135deg,#2F80ED,#56CCF2)"
                    : t.toggleOff,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "none",
                  transition: "transform 0.1s, opacity 0.1s, background 0.2s",
                  boxShadow: autoBright
                    ? "0 6px 16px rgba(47,128,237,0.3)"
                    : "0 2px 6px rgba(0,0,0,0.06)",
                  flexShrink: 0,
                }}
              >
                <AutoBrightnessIcon active={autoBright} theme={theme} />
              </button>
            </div>

            {/* Theme row */}
            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <span
                style={{
                  width: "90px",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: t.textPrimary,
                  textAlign: "right",
                }}
              >
                Theme
              </span>
              <div
                onClick={() =>
                  setTheme((th) => (th === "light" ? "dark" : "light"))
                }
                style={{
                  position: "relative",
                  width: "150px",
                  height: "62px",
                  borderRadius: "100px",
                  background:
                    theme === "light"
                      ? "linear-gradient(180deg,#FFD739 0%,#FFEA97 100%)"
                      : "linear-gradient(180deg,#2E29AF 0%,#9170FF 100%)",
                  boxShadow: "inset 0 3px 6px rgba(0,0,0,0.2)",
                  cursor: "pointer",
                  transition: "background 0.4s",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    right: theme === "light" ? "24px" : "88px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "#fff",
                    transition: "right 0.35s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {theme === "light" ? "Light" : "Dark"}
                </span>
                <div
                  style={{
                    position: "absolute",
                    left: theme === "light" ? "2px" : "calc(100% - 64px)",
                    top: "50%",
                    transform: "translateY(-50%) translateX(-10%)",
                    width: "72px",
                    height: "72px",
                    background: "#fff",
                    borderRadius: "50%",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
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

        {/* ── RIGHT CARD ── */}
        <div
          style={{
            background: t.cardBg,
            backdropFilter: t.cardBackdrop,
            borderRadius: "38px",
            border: t.cardBorder,
            width: "420px",
            height: "510px",
            boxShadow: t.shadow,
            display: "flex",
            flexDirection: "column",
            padding: "32px 28px",
            gap: "12px",
            transition: "background 0.3s, border 0.3s",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: t.textMuted,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            SYSTEM
          </span>

          <MenuButton
            label="Language"
            icon={<LanguageIcon theme={theme} />}
            hasArrow
            onClick={() => alert("Language settings")}
            theme={theme}
          />
          <MenuButton
            label="Date & Time"
            icon={<DateTimeIcon theme={theme} />}
            hasArrow
            onClick={() => alert("Date & Time settings")}
            theme={theme}
          />
          <MenuButton
            label="Offline Maps"
            icon={<OfflineMapsIcon theme={theme} />}
            hasBadge={mapState === "idle"}
            onClick={handleDownloadMap}
            rightContent={<DownloadStateIcon state={mapState} />}
            theme={theme}
          />
          <MenuButton
            label="System"
            icon={<SystemIcon theme={theme} />}
            hasArrow
            onClick={() => alert("System info and updates")}
            theme={theme}
          />

          <div style={{ flex: 1 }} />

          {/* Factory Reset */}
          <button
            onClick={() => setResetModal(true)}
            {...pressReset}
            style={{
              width: "100%",
              height: "56px",
              background: t.resetBg,
              border: t.resetBorder,
              borderRadius: "18px",
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
              style={{ fontSize: "15px", fontWeight: 700, color: "#FF6B6B" }}
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
          theme={theme}
        />
      )}
    </div>
  );
}
