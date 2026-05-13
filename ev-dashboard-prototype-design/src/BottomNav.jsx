import { useState } from "react";

/* ── Theme tokens (same pattern as the rest of the codebase) ────── */
function tk(theme) {
  const dark = theme === "dark";
  return {
    pageBg: dark ? "#0F1117" : "#F8F9FB",
    cardBg: dark ? "rgba(28,31,42,0.97)" : "rgba(255,255,255,0.97)",
    cardBorder: dark ? "1px solid #2C2F3E" : "1px solid rgba(0,0,0,0.06)",
    cardShadow: dark
      ? "0px 4px 20px rgba(0,0,0,0.45)"
      : "0 2px 14px rgba(0,0,0,0.12)",
    textPrimary: dark ? "#E8EAF0" : "#111827",
    textSecond: dark ? "#9CA3AF" : "#6B7280",
    textMuted: dark ? "#6B7280" : "#9CA3AF",
    iconStroke: dark ? "#9CA3AF" : "#6B7280",
    divider: dark ? "#2C2F3E" : "#F3F4F6",
    inputBg: dark ? "rgba(37,40,54,0.97)" : "rgba(255,255,255,0.97)",
    inputBorder: dark ? "#3A3F52" : "rgba(0,0,0,0.06)",
    inputText: dark ? "#E5E7EB" : "#374151",
    shadow: dark
      ? "0px 6px 20px rgba(0,0,0,0.5)"
      : "0px 6px 20px rgba(0,0,0,0.1)",
    sugBg: dark ? "rgba(24,27,38,0.99)" : "rgba(255,255,255,0.98)",
    sugHover: dark ? "rgba(59,130,246,0.12)" : "#EFF6FF",
    sugBorder: dark ? "#2C2F3E" : "#F3F4F6",
    favBg: dark ? "#161922" : "#ffffff",
    favHover: dark ? "rgba(59,130,246,0.10)" : "#F0F9FF",
    favRowBorder: dark ? "#1E2130" : "#F9FAFB",
    iconBg: dark ? "rgba(59,130,246,0.15)" : "#EFF6FF",
    closeBg: dark ? "rgba(255,255,255,0.06)" : "#F9FAFB",
    tabBarBg: dark ? "rgba(15,17,23,0.97)" : "rgba(255,255,255,0.97)",
    tabBarBorder: dark ? "#1E2130" : "rgba(0,0,0,0.06)",
    tabInactive: dark ? "#6B7280" : "#9CA3AF",
    tabHover: dark ? "rgba(255,255,255,0.05)" : "#F3F4F6",
    gaugeTrack: dark ? "#2D3346" : "#F3F4F6",
    barTrack: dark ? "#2D3346" : "#F3F4F6",
    overlay: dark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.35)",
    mapFilter: dark ? "brightness(0.72) saturate(0.8)" : "none",
    errBg: dark ? "#2D1515" : "#FEF2F2",
    errBorder: dark ? "#7F1D1D" : "#FCA5A5",
    errText: dark ? "#FCA5A5" : "#B91C1C",
    xColor: dark ? "#9CA3AF" : "#374151",
    compassSouth: dark ? "#4B5563" : "#D1D5DB",
    compassCenter: dark ? "#E5E7EB" : "#374151",
  };
}

/* ── ICONS ────────────────────────────────────────────────────────── */
const IcoDash = ({ a, t }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="2"
      width="8"
      height="8"
      rx="1.5"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
    />
    <rect
      x="14"
      y="2"
      width="8"
      height="8"
      rx="1.5"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
    />
    <rect
      x="2"
      y="14"
      width="8"
      height="8"
      rx="1.5"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
    />
    <rect
      x="14"
      y="14"
      width="8"
      height="8"
      rx="1.5"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
    />
  </svg>
);
const IcoCharge = ({ a, t }) => (
  <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
    <rect
      x="2"
      y="3"
      width="13"
      height="17"
      rx="2"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
    />
    <path
      d="M15 8h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="5"
      y1="20"
      x2="12"
      y2="20"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="5"
      y1="20"
      x2="5"
      y2="24"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="20"
      x2="12"
      y2="24"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const IcoNavTab = ({ a, t }) => (
  <svg width="20" height="26" viewBox="0 0 20 26" fill="none">
    <path
      d="M10 2C6 2 2 5.7 2 10.5c0 6.8 8 15.5 8 15.5s8-8.7 8-15.5C18 5.7 14 2 10 2z"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
      fill={a ? "rgba(255,255,255,.2)" : "none"}
    />
    <circle
      cx="10"
      cy="10.5"
      r="3"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
    />
  </svg>
);
const IcoWeather = ({ a, t }) => (
  <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
    <circle
      cx="13"
      cy="8"
      r="4.5"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
    />
    <path
      d="M6 16a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect
      x="2"
      y="16"
      width="22"
      height="6"
      rx="3"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
    />
  </svg>
);
const IcoEmg = ({ a, t }) => (
  <svg width="24" height="26" viewBox="0 0 24 26" fill="none">
    <circle
      cx="12"
      cy="9"
      r="4.5"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
    />
    <path
      d="M2 25c0-5.5 4.5-10 10-10s10 4.5 10 10"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const IcoSettings = ({ a, t }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="4"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
    />
    <path
      d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
      stroke={a ? "#fff" : t.tabInactive}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* ── BOTTOM TAB BAR ──────────────────────────────────────────────── */
const TABS = [
  { Icon: IcoDash, label: "Dashboard" },
  { Icon: IcoCharge, label: "Charge" },
  { Icon: IcoNavTab, label: "Navigate" },
  { Icon: IcoWeather, label: "Weather" },
  { Icon: IcoEmg, label: "Emergency" },
  { Icon: IcoSettings, label: "Settings" },
];

export default function BottomNav({ active, setActive, theme = "light" }) {
  const t = tk(theme);
  const [pressed, setPressed] = useState(null);

  return (
    <div
      style={{
        position: "absolute",
        width: 1148,
        height: 108,
        left: "50%",
        transform: "translateX(-50%)",
        top: 662,
        background: t.tabBarBg,
        backdropFilter: "blur(12px)",
        border: `1px solid ${t.tabBarBorder}`,
        borderRadius: 35,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 20px",
        boxShadow: t.shadow,
        zIndex: 10,
        transition: "background 0.3s",
      }}
    >
      {TABS.map(({ Icon, label }, i) => {
        const isActive = active === i;
        const isPressed = pressed === i;
        return (
          <button
            key={i}
            onClick={() => setActive(i)}
            onMouseDown={() => setPressed(i)}
            onMouseUp={() => setPressed(null)}
            onMouseLeave={() => setPressed(null)}
            onTouchStart={() => setPressed(i)}
            onTouchEnd={() => setPressed(null)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "10px 14px",
              borderRadius: 16,
              border: "none",
              cursor: "pointer",
              background: isActive
                ? "#2563EB"
                : isPressed
                  ? t.tabHover
                  : "transparent",
              transform: isPressed
                ? "translateY(1px) scale(0.98)"
                : "translateY(0)",
              transition: "transform 0.15s ease, background 0.15s ease",
              outline: "none",
              minWidth: 68,
            }}
          >
            <Icon a={isActive} t={t} />
            <span
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: 0.4,
                color: isActive ? "#fff" : t.tabInactive,
              }}
            >
              {label.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
