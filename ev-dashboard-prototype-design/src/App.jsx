import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Fonts: Inter + Roboto (add to index.html)
   <link href="https://fonts.googleapis.com/css2?
     family=Inter:wght@400;500;600;700;800&
     family=Roboto:wght@400;500&display=swap"
     rel="stylesheet">
───────────────────────────────────────────── */

// ── SVG Map ────────────────────────────────────────────────────────
function MapArea() {
  return (
    <div
      style={{
        position: "absolute",
        width: 442,
        height: 593,
        left: 45,
        top: 62,
        background: "#fff",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* Map background */}
      <svg width="442" height="593" viewBox="0 0 442 593" style={{ display: "block" }}>
        <rect width="442" height="593" fill="#e8ecf0" />
        {/* Blocks */}
        <rect x="0" y="80" width="442" height="90" fill="#d4d8de" opacity="0.7" />
        <rect x="160" y="0" width="90" height="593" fill="#d4d8de" opacity="0.7" />
        <rect x="0" y="240" width="442" height="60" fill="#d4d8de" opacity="0.5" />
        <rect x="60" y="0" width="60" height="300" fill="#d4d8de" opacity="0.4" />
        <rect x="290" y="140" width="152" height="55" fill="#d4d8de" opacity="0.4" />
        <rect x="20" y="350" width="110" height="60" fill="#c8ccd2" opacity="0.5" />
        <rect x="280" y="310" width="140" height="80" fill="#c8ccd2" opacity="0.5" />
        {/* Route line */}
        <polyline
          points="205,0 205,160 340,160 340,593"
          stroke="#6366F1"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        {/* Current position */}
        <circle cx="205" cy="300" r="12" fill="#6366F1" opacity="0.3" />
        <circle cx="205" cy="300" r="8" fill="#6366F1" />
        <circle cx="205" cy="300" r="4" fill="#fff" />
        {/* Labels */}
        <text x="170" y="395" fill="#6b7280" fontSize="11" fontFamily="Inter,sans-serif">Rock Road</text>
        <text x="290" y="200" fill="#6b7280" fontSize="10" fontFamily="Inter,sans-serif">Wisma Saberkas</text>
        <text x="15" y="136" fill="#6b7280" fontSize="10" fontFamily="Inter,sans-serif">Layang-Layang Rd</text>
        {/* Destination pin */}
        <circle cx="340" cy="540" r="10" fill="#f59e0b" opacity="0.95" />
        <text x="300" y="565" fill="#f59e0b" fontSize="10" fontFamily="Inter,sans-serif">Vivacity Mall</text>
      </svg>

      {/* Turn instruction badge */}
      <div
        style={{
          position: "absolute",
          width: 234,
          top: 22,
          left: 28,
          background: "#F5F5F5",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.25)",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 16px",
        }}
      >
        {/* Arrow icon */}
        <div
          style={{
            width: 48,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
            <path d="M8 36V16L24 4" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 4h10v10" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 40, lineHeight: "48px", color: "#4B4E53" }}>750m</div>
          <div style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "#4B4E53" }}>Turn Right</div>
        </div>
      </div>

      {/* Speed circle */}
      <div
        style={{
          position: "absolute",
          width: 145,
          height: 145,
          left: 18,
          top: 431,
          background: "#fff",
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
          borderRadius: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: "Inter", fontWeight: 800, fontSize: 48, lineHeight: "58px", color: "#000" }}>80</div>
        <div style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 14, color: "#808080" }}>km/h</div>
      </div>

      {/* Max speed badge */}
      <div
        style={{
          position: "absolute",
          width: 75,
          height: 75,
          left: 183,
          top: 473,
          background: "#fff",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
          borderRadius: 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 16, color: "rgba(128,128,128,0.8)", lineHeight: "19px" }}>MAX</div>
        <div style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 24, color: "rgba(0,0,0,0.8)", lineHeight: "29px" }}>90</div>
      </div>
    </div>
  );
}

// ── Battery / Charging Card ────────────────────────────────────────
function ChargingCard() {
  const [status, setStatus] = useState(0);

  const states = [
    {
      label: "Not connected",
      sub: "Last charged 2h ago",
      color: "#9CA3AF",
      fill: 0,
    },
    {
      label: "Connected",
      sub: "Ready to charge",
      color: "#F59E0B",
      fill: 40,
    },
    {
      label: "Charging",
      sub: "Fast charging active",
      color: "#49E83D",
      fill: 78,
    },
  ];

  const current = states[status];

  return (
    <div
      onClick={() => setStatus((s) => (s + 1) % 3)}
      style={{
        position: "absolute",
        width: 356,
        height: 240,
        left: 512,
        top: 64,
        background: "#fff",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
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
        }}
      >
        Battery
      </div>

      {/* Battery */}
      <div style={{ position: "absolute", left: 30, top: 55 }}>
        <svg width="120" height="60" viewBox="0 0 120 60">
          <rect
            x="2"
            y="8"
            width="104"
            height="44"
            rx="6"
            stroke={current.color}
            strokeWidth="3"
            fill="none"
          />
          <rect x="106" y="20" width="10" height="20" rx="3" fill={current.color} />
          <rect
            x="6"
            y="12"
            width={current.fill}
            height="36"
            rx="4"
            fill={current.color}
          />
        </svg>
      </div>

      {/* Percentage */}
      <div
        style={{
          position: "absolute",
          left: 199,
          top: 65,
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: 36,
        }}
      >
        {current.fill}%
      </div>

      {/* Range */}
      <div
        style={{
          position: "absolute",
          left: 45,
          top: 145,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: current.color,
          }}
        />
        <span
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 20,
            color: current.color,
          }}
        >
          {Math.round(current.fill * 4)} km available
        </span>
      </div>

      {/* Divider */}
      <div
        style={{
          position: "absolute",
          left: 37,
          top: 194,
          width: 283,
          height: 1,
          background: "rgba(128,128,128,0.3)",
        }}
      />

      {/* Status text */}
      <div
        style={{
          position: "absolute",
          left: 45,
          top: 211,
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 15,
          color: "#808080",
        }}
      >
        {current.label} · {current.sub}
      </div>
    </div>
  );
}

// ── Climate Card ───────────────────────────────────────────────────
function ClimateCard({ temp, setTemp }) {
  // 第一个永远 true（不能取消）
  const [activeBars, setActiveBars] = useState([true, false, false]);

  const toggleBar = (index) => {
    if (index === 0) return; // ❌ 第一个不能动

    setActiveBars((prev) =>
      prev.map((v, i) => (i === index ? !v : v))
    );
  };

  const bars = [10, 14, 18];

  return (
    <div
      style={{
        position: "absolute",
        width: 356,
        height: 142,
        left: 512,
        top: 325,
        background: "rgba(255,255,255,0.9)",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
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
          color: "#000",
        }}
      >
        Climate
      </div>

      <div
        style={{
          position: "absolute",
          right: 20,
          top: 5,
          fontFamily: "Inter",
          fontSize: 32,
          color: "#000",
        }}
      >
        ›
      </div>

      <div
        style={{
          position: "absolute",
          left: 31,
          top: 51,
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: 16,
          color: "#808080",
        }}
      >
        Auto
      </div>

      {/* Fan block */}
      <div
        style={{
          position: "absolute",
          left: 26,
          top: 78,
          width: 80,
          height: 46,
          background: "#fff",
          border: "1px solid #D9D9D9",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#4B4E53">
          <path d="M12 12c1.5-2 4-3 6-2s3 4 1 6-5 2-7 1c0 2-1 5-3 6s-5 0-5-3 2-5 4-6c-2-1-4-3-3-5s4-2 6-1c1-2 3-4 5-4s4 2 3 4-3 3-5 4h-2z" />
        </svg>

        {/* SPEED BARS */}
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
                background: activeBars[i] ? "#0096FF" : "#D9D9D9",
                transition: "0.2s",
                opacity: i === 0 ? 1 : 0.9,
              }}
            />
          ))}
        </div>
      </div>

      {/* Temp control */}
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
          onClick={() => setTemp((t) => Math.max(16, t - 1))}
          style={{
            width: 44,
            height: 44,
            border: "1px solid #D9D9D9",
            borderRadius: 20,
            background: "#fff",
            fontSize: 20,
            cursor: "pointer",
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
          }}
        >
          {temp}°
        </span>

        <button
          onClick={() => setTemp((t) => Math.min(30, t + 1))}
          style={{
            width: 44,
            height: 44,
            border: "1px solid #D9D9D9",
            borderRadius: 20,
            background: "#fff",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

// ── Trip Card ──────────────────────────────────────────────────────
function TripCard() {
  return (
    <div
      style={{
        position: "absolute",
        width: 356,
        height: 172,
        left: 512,
        top: 488,
        background: "rgba(255,255,255,0.95)",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        borderRadius: 20,
      }}
    >
      {/* Trip icon */}
      <div
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          left: 21,
          top: 8,
          background: "#F3EDFF",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round">
          <path d="M3 17l6-12 6 12" /><path d="M21 7V17" /><path d="M17 7v10" />
        </svg>
      </div>

      {/* Map icon */}
      <div
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          left: 21,
          top: 57,
          background: "#E8F9EF",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      </div>

      <div style={{ position: "absolute", left: 74, top: 19, fontFamily: "Inter", fontWeight: 500, fontSize: 15, color: "#000" }}>Trip</div>
      <div style={{ position: "absolute", left: 74, top: 60, fontFamily: "Inter", fontWeight: 500, fontSize: 14, color: "#000" }}>Vivacity Mall</div>
      <div style={{ position: "absolute", left: 74, top: 78, fontFamily: "Inter", fontWeight: 500, fontSize: 12, color: "rgba(128,128,128,0.8)" }}>Jalan Setia Raja</div>

      {/* Arrow */}
      <div style={{ position: "absolute", right: 18, top: 16, fontFamily: "Inter", fontSize: 22, color: "#000" }}>›</div>

      {/* Stats row */}
      {[
        { left: 21, label: "ETA", value: "03:12", sub: "PM", accent: true },
        { left: 131, label: "Distance", value: "3.2", sub: "km", accent: false },
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
            background: accent ? "rgba(243,237,255,0.8)" : "#fff",
            border: "1px solid #EAEAEA",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
            borderRadius: 16,
          }}
        >
          <div style={{ position: "absolute", left: 14, top: 8, fontFamily: "Inter", fontWeight: 500, fontSize: 10, color: accent ? "#6366F1" : "#AFB7D1" }}>{label}</div>
          <div style={{ position: "absolute", left: 14, top: 20, fontFamily: "Inter", fontWeight: 700, fontSize: 15, color: "#6366F1" }}>{value}</div>
          <div style={{ position: "absolute", left: 14, top: 38, fontFamily: "Inter", fontWeight: 500, fontSize: 10, color: "#AFB7D1" }}>{sub}</div>
        </div>
      ))}
    </div>
  );
}

// ── Clock Card ─────────────────────────────────────────────────────
function ClockCard() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dow = time.getDay();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
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
        background: "#fff",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        borderRadius: 20,
      }}
    >
      {/* GOOD MORNING */}
      <div style={{ position: "absolute", left: 33, top: 28, fontFamily: "Roboto", fontWeight: 500, fontSize: 14, color: "#FFA500" }}>
        GOOD MORNING
      </div>
      {/* Time */}
      <div style={{ position: "absolute", left: 33, top: 50, fontFamily: "Inter", fontWeight: 700, fontSize: 32, color: "#000" }}>
        {String(hh).padStart(2, "0")}:{mm}
      </div>
      {/* AM/PM */}
      <div style={{ position: "absolute", left: 139, top: 57, fontFamily: "Roboto", fontWeight: 500, fontSize: 14, color: "#FFA500" }}>
        {ampm}
      </div>
      {/* Clock icon */}
      <div style={{ position: "absolute", right: 20, top: 20 }}>
        <svg width="52" height="52" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="22" fill="#D9D9D9" opacity="0.5" />
          <circle cx="26" cy="26" r="2" fill="#000" />
          <line x1="26" y1="26" x2="26" y2="10" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="26" y1="26" x2="38" y2="26" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Date */}
      <div style={{ position: "absolute", left: 33, top: 94, fontFamily: "Roboto", fontWeight: 500, fontSize: 14, color: "#000" }}>
        {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dow]}, {time.getDate()} {months[time.getMonth()].slice(0,3)} {time.getFullYear()}
      </div>
      {/* Day strip */}
      <div style={{ position: "absolute", left: 33, top: 120, display: "flex", gap: 14 }}>
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
              background: i === dow ? "rgba(245,245,245,0.5)" : "transparent",
              fontFamily: "Roboto",
              fontWeight: 500,
              fontSize: 14,
              color: i === dow ? "#0078FF" : "#B0A2A2",
            }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Weather Card ───────────────────────────────────────────────────
function WeatherCard() {
  return (
    <div
      style={{
        position: "absolute",
        width: 332,
        height: 138,
        left: 896,
        top: 254,
        background: "linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 20, top: 16, fontFamily: "Inter", fontWeight: 600, fontSize: 20, color: "#000" }}>Weather</div>
      {/* Temp */}
      <div style={{ position: "absolute", right: 20, top: 8, fontFamily: "Inter", fontWeight: 600, fontSize: 40, color: "#000" }}>
        24<span style={{ fontSize: 24, fontWeight: 700 }}>°C</span>
      </div>
      {/* Weather icon */}
      <div style={{ position: "absolute", left: 20, top: 52, fontSize: 36 }}>🌤</div>
      <div style={{ position: "absolute", right: 20, top: 56, fontFamily: "Inter", fontWeight: 500, fontSize: 16, color: "#808080" }}>Cloudy</div>
      <div style={{ position: "absolute", right: 20, top: 80, fontFamily: "Inter", fontWeight: 500, fontSize: 12, color: "#808080" }}>20°C / 26°C</div>
    </div>
  );
}

// ── Music Card ─────────────────────────────────────────────────────
function MusicCard() {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(84); // 1:24 of 3:45
  const total = 225;

  useEffect(() => {
    const id = setInterval(() => {
      if (playing) setProgress((p) => (p + 1) % total);
    }, 1000);
    return () => clearInterval(id);
  }, [playing]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const pct = (progress / total) * 100;

  return (
    <div
      style={{
        position: "absolute",
        width: 334,
        height: 229,
        left: 895,
        top: 432,
        background: "linear-gradient(134.6deg, #6A8DFF 1.6%, #B8A6FF 50%)",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Now Playing */}
      <div style={{ position: "absolute", left: 26, top: 15, fontFamily: "Inter", fontWeight: 400, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
        Now Playing
      </div>

      {/* Volume icon */}
      <div style={{ position: "absolute", right: 18, top: 12, display: "flex", gap: 3 }}>
        {[13, 18, 22].map((h, i) => (
          <div key={i} style={{ width: 3, height: h, background: "rgba(255,255,255,0.8)", borderRadius: 2, alignSelf: "flex-end" }} />
        ))}
      </div>

      {/* Album art */}
      <div
        style={{
          position: "absolute",
          left: 26,
          top: 47,
          width: 70,
          height: 70,
          background: "linear-gradient(135deg, #ff6b6b, #ffa500)",
          borderRadius: 10,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 28 }}>🎵</span>
      </div>

      {/* Track info */}
      <div style={{ position: "absolute", left: 118, top: 47, fontFamily: "Inter", fontWeight: 700, fontSize: 16, color: "#fff" }}>Sunset Drive</div>
      <div style={{ position: "absolute", left: 118, top: 70, fontFamily: "Inter", fontWeight: 700, fontSize: 12, color: "#fff", opacity: 0.6 }}>Ocean Eyes</div>

      {/* Progress bar */}
      <div style={{ position: "absolute", left: 26, top: 143, width: 281, height: 8, background: "rgba(255,255,255,0.3)", borderRadius: 4 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: `${pct}%`, height: "100%", background: "#fff", borderRadius: 4, transition: "width 1s linear" }} />
        {/* Scrubber dot */}
        <div style={{ position: "absolute", left: `calc(${pct}% - 5px)`, top: -1, width: 10, height: 10, background: "#fff", borderRadius: "50%" }} />
      </div>

      {/* Times */}
      <div style={{ position: "absolute", left: 26, top: 157, fontFamily: "Inter", fontWeight: 400, fontSize: 11, color: "#fff" }}>{fmt(progress)}</div>
      <div style={{ position: "absolute", right: 26, top: 157, fontFamily: "Inter", fontWeight: 400, fontSize: 11, color: "#fff" }}>{fmt(total)}</div>

      {/* Controls */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 178, display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
        {/* Prev */}
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
            <path d="M6 6h2v12H6zm3.5 6L18 18V6z" />
          </svg>
        </button>
        {/* Play/Pause */}
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
        {/* Next */}
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Top Bar ────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1280, height: 62 }}>
      {/* WiFi off icon */}
      <div style={{ position: "absolute", left: 45, top: 9, width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4B4E53" strokeWidth="2" strokeLinecap="round">
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
        </svg>
      </div>
      {/* Bluetooth */}
      <div style={{ position: "absolute", left: 118, top: 9, width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="30" height="36" viewBox="0 0 24 24" fill="none" stroke="#4B4E53" strokeWidth="2.5" strokeLinecap="round">
          <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" />
        </svg>
      </div>
      {/* Say something */}
      <div style={{ position: "absolute", left: 574, top: 7, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#808080" strokeWidth="1.5">
          <circle cx="12" cy="12" r="1.5" fill="#808080" />
          <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" strokeWidth="2" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 621, top: 18, width: 297, height: 30, fontFamily: "Inter", fontWeight: 400, fontSize: 20, color: "#808080" }}>
        Say something...
      </div>
      {/* Profile */}
      <div style={{ position: "absolute", left: 1176, top: 9, width: 49, height: 49, background: "#F3EDFF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </div>
  );
}

// ── Bottom Nav Bar ─────────────────────────────────────────────────
const NAV = [
  { label: "Apps", icon: (a) => <svg width="58" height="58" viewBox="0 0 58 58" fill="none"><rect x="8" y="8" width="18" height="18" rx="3" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="4"/><rect x="32" y="8" width="18" height="18" rx="3" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="4"/><rect x="8" y="32" width="18" height="18" rx="3" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="4"/><rect x="32" y="32" width="18" height="18" rx="3" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="4"/></svg> },
  { label: "EV", icon: (a) => <svg width="60" height="61" viewBox="0 0 60 61" fill={a?"#6366F1":"#4B4E53"}><path d="M34 10v20h16L26 51V31H10z"/></svg> },
  { label: "Nav", icon: (a) => <svg width="39" height="55" viewBox="0 0 39 55" fill="none"><path d="M4 4h31v31H4z" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="4" fill="none"/><path d="M19.5 38v13" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="4"/><path d="M11 51h17" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="4"/><path d="M19.5 4v7M4 19.5h7M28.5 19.5h7M19.5 32v7" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="4"/></svg> },
  { label: "Weather", icon: (a) => <svg width="58" height="58" viewBox="0 0 58 58" fill={a?"#6366F1":"#4B4E53"}><path d="M10 38a10 10 0 010-20c1-5 6-9 12-9 5 0 9 3 11 7a8 8 0 01-1 16H10z"/></svg> },
  { label: "Phone", icon: (a) => <svg width="58" height="58" viewBox="0 0 58 58" fill="none" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="4"><path d="M14 8h8l4 10-5 3a28 28 0 0016 16l3-5 10 4v8a4 4 0 01-4 4C22 47 11 36 11 12a4 4 0 013-4z"/></svg> },
  { label: "Settings", icon: (a) => <svg width="58" height="58" viewBox="0 0 58 58" fill="none" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="4"><circle cx="29" cy="29" r="8"/><path d="M29 5v6M29 47v6M5 29h6M47 29h6M10.1 10.1l4.2 4.2M43.7 43.7l4.2 4.2M47.9 10.1l-4.2 4.2M14.3 43.7l-4.2 4.2"/></svg> },
];

function BottomNav({ active, setActive }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 1148,
        height: 108,
        left: "calc(50% - 574px)",
        top: 664,
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 35,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 20px",
      }}
    >
      {NAV.map((item, i) => (
        <button
          key={item.label}
          onClick={() => setActive(i)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0 10px",
          }}
        >
          {item.icon(active === i)}
          <span style={{ fontFamily: "Inter", fontSize: 11, color: active === i ? "#6366F1" : "#4B4E53", fontWeight: active === i ? 600 : 400 }}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────
export default function EVDashboardHiFi() {
  const [navActive, setNavActive] = useState(1);
  const [temp, setTemp] = useState(24);

  return (
    <div
      style={{
        position: "relative",
        width: 1280,
        height: 800,
        background: "#F8F9FB",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <TopBar />
      <MapArea />
      <ChargingCard />
      <ClimateCard temp={temp} setTemp={setTemp} />
      <TripCard />
      <ClockCard />
      <WeatherCard />
      <MusicCard />
      <BottomNav active={navActive} setActive={setNavActive} />
    </div>
  );
}