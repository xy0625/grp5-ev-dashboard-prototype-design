import React from 'react';

/* ── Theme tokens ──────────────────────────────────────────────── */
function tk(theme) {
  const dark = theme === "dark";
  return {
    iconColor:  dark ? "#9CA3AF" : "#444",
    avatarBg:   dark ? "#252836" : "#ddd",
    brandColor: dark ? "#C9A84C" : "#8a6010",
  };
}

export default function TopBar({ theme = "light", onGoToAccount, center }) {
  const t = tk(theme);

  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 80, zIndex: 50 }}>

      {/* LEFT: WiFi + Bluetooth */}
      <div style={{ position: 'absolute', top: 20, left: 60, display: 'flex', alignItems: 'center', gap: '25px' }}>
        {/* WiFi */}
        <svg width="36" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M5 12.55a11 11 0 0 1 14 0"        stroke={t.iconColor} strokeWidth="2" strokeLinecap="round"/>
          <path d="M1.42 9a16 16 0 0 1 21.16 0"      stroke={t.iconColor} strokeWidth="2" strokeLinecap="round"/>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"     stroke={t.iconColor} strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="20" r="1"               fill={t.iconColor}/>
        </svg>

        {/* Bluetooth */}
        <svg width="20" height="30" viewBox="0 0 24 24" fill="none">
          <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"
            stroke={t.iconColor} strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* CENTER: slot for EVAssistant or any other content */}
      {center && (
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          height: 80, display: 'flex', alignItems: 'center',
        }}>
          {center}
        </div>
      )}

      {/* RIGHT: Avatar → Account Page */}
      <div
        style={{ position: 'absolute', top: 8, right: 60, cursor: 'pointer', zIndex: 10 }}
        onClick={onGoToAccount}
      >
        <div style={{
          width: 50, height: 50, borderRadius: '50%',
          background: t.avatarBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24,
        }}>👤</div>
      </div>

    </div>
  );
}