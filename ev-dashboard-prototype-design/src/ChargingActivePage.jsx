import { useState, useEffect, useRef } from "react";
import BottomNav from "./BottomNav";

const FONT = "'DM Sans', 'Inter', sans-serif";
const GREEN = "#1DB954";
const GREEN_DARK = "#15803d";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const INDIGO = "#6366F1";
const GRAY = "#6B7280";
const CARD_SHADOW = "0 2px 12px rgba(0,0,0,0.07)";

/* ── Top Bar ─────────────────────────────────────────────────────── */
function TopBar({ battery, range }) {
  const battColor = battery < 20 ? RED : battery < 40 ? AMBER : GREEN;
  const filled = Math.max(2, Math.round(32 * battery / 100));

  return (
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1280, height: 58,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", boxSizing: "border-box",
      background: "rgba(255,255,255,0.75)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(0,0,0,0.06)", zIndex: 5,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="28" height="22" viewBox="0 0 34 28" fill="none">
          <path d="M17 22a2 2 0 110 4 2 2 0 010-4z" fill="#111" />
          <path d="M10 16.5a9.9 9.9 0 0114 0" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M4 10.5a17.5 17.5 0 0126 0" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <svg width="20" height="28" viewBox="0 0 24 36" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round">
          <path d="M6 9l12 9-6 5V3l6 5-12 9" />
        </svg>
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: "#fff", borderRadius: 30, padding: "6px 20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        border: `1.5px solid ${battColor}33`,
      }}>
        <svg width="38" height="20" viewBox="0 0 42 24">
          <rect x="1" y="3" width="36" height="18" rx="3" stroke={battColor} strokeWidth="2" fill="none" />
          <rect x="37" y="8" width="4" height="8" rx="2" fill={battColor} />
          <rect x="3" y="5" width={filled} height="14" rx="1" fill={battColor} />
        </svg>
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 17, color: battColor }}>{battery}%</span>
        <span style={{ fontFamily: FONT, fontSize: 16, color: "#CBD5E1" }}>·</span>
        <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 17, color: "#111" }}>{range} km left</span>
      </div>

      <div style={{
        width: 44, height: 44, background: "#F3EDFF", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="2">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </div>
  );
}

/* ── Animated Battery Gauge ──────────────────────────────────────── */
function BatteryGauge({ percent = 65 }) {
  const [displayed, setDisplayed] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    let start = null;
    const duration = 1200;
    const step = ts => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplayed(Math.round(progress * percent));
      if (progress < 1) animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [percent]);

  const cx = 175, cy = 175, r = 152, sw = 18;
  const startAngle = 135, sweepAngle = 270;

  const polarToXY = (angle, radius) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };
  const arcPath = (start, sweep, radius) => {
    const s = polarToXY(start, radius), e = polarToXY(start + sweep, radius);
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${sweep > 180 ? 1 : 0} 1 ${e.x} ${e.y}`;
  };

  const filledSweep = (displayed / 100) * sweepAngle;
  const fillColor = displayed >= 50 ? GREEN : displayed >= 20 ? AMBER : RED;
  const tipPos = polarToXY(startAngle + filledSweep, r);

  return (
    <div style={{ position: "absolute", width: 350, height: 350, left: 48, top: 65 }}>
      <svg width="350" height="350" viewBox="0 0 350 350">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fillColor} />
            <stop offset="100%" stopColor={displayed >= 50 ? "#6EE7B7" : displayed >= 20 ? "#FCD34D" : "#FCA5A5"} />
          </linearGradient>
        </defs>

        {/* Track */}
        <path d={arcPath(startAngle, sweepAngle, r)} fill="none" stroke="#E5E7EB" strokeWidth={sw} strokeLinecap="round" />

        {/* Filled arc */}
        {filledSweep > 0 && (
          <path
            d={arcPath(startAngle, filledSweep, r)}
            fill="none" stroke="url(#gaugeGrad)"
            strokeWidth={sw} strokeLinecap="round"
            style={{ transition: "all 0.05s linear" }}
          />
        )}

        {/* Glowing tip */}
        {filledSweep > 2 && (
          <circle cx={tipPos.x} cy={tipPos.y} r={sw / 2 + 3} fill={fillColor} opacity="0.85" />
        )}

        {/* Outer decorative ring */}
        <circle cx={cx} cy={cy} r={r + sw / 2 + 5} fill="none" stroke={fillColor} strokeWidth="1" opacity="0.12" />
      </svg>

      {/* Center text */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: 350, height: 350,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 108, color: "#0D0D0D", lineHeight: "130px" }}>{displayed}</span>
          <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 36, color: "#0D0D0D", marginTop: 24 }}>%</span>
        </div>
        <span style={{ fontFamily: FONT, fontWeight: 400, fontSize: 28, color: GRAY, marginTop: -12 }}>Battery</span>

        {/* Low battery urgency alert */}
        {displayed < 20 && (
          <div style={{
            marginTop: 10, background: RED, color: "#fff",
            borderRadius: 10, padding: "4px 14px", fontSize: 12, fontWeight: 700,
          }}>⚠ Low — charge soon</div>
        )}
      </div>
    </div>
  );
}

/* ── Charging Sparks ─────────────────────────────────────────────── */
function ChargingSparks() {
  return (
    <div style={{ position: "absolute", left: 48, top: 65, width: 350, height: 350, pointerEvents: "none" }}>
      <svg width="350" height="350" viewBox="0 0 350 350">
        {[0, 1, 2, 3].map(i => {
          const angle = (i * 90 + 22.5) * Math.PI / 180;
          const x = 175 + 175 * Math.cos(angle - Math.PI / 2);
          const y = 175 + 175 * Math.sin(angle - Math.PI / 2);
          return (
            <circle key={i} cx={x} cy={y} r="4" fill={GREEN} opacity="0">
              <animate attributeName="opacity" values="0;0.8;0" dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              <animate attributeName="r" values="4;8;4" dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </circle>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Status Info Card ────────────────────────────────────────────── */
function InfoCard({ label, value, sub, icon, bg, style }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 20, padding: "16px 22px",
      boxShadow: CARD_SHADOW, border: "1.5px solid #E5E7EB",
      display: "flex", alignItems: "center", gap: 18, ...style,
    }}>
      <div style={{
        width: 60, height: 60, background: bg, borderRadius: 14,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: 14, color: GRAY }}>{label}</div>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 30, color: "#0D0D0D", lineHeight: "36px" }}>{value}</div>
        {sub && <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: 13, color: "#B0B5BF" }}>{sub}</div>}
      </div>
    </div>
  );
}

/* ── Live Estimated Full Clock ───────────────────────────────────── */
function useLiveClock(addMinutes = 65) {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const est = new Date(t.getTime() + addMinutes * 60 * 1000);
  const hh = est.getHours() % 12 || 12;
  const mm = String(est.getMinutes()).padStart(2, "0");
  const ap = est.getHours() >= 12 ? "PM" : "AM";
  return [`${String(hh).padStart(2, "0")}:${mm}`, ap];
}

/* ── Stop Button ─────────────────────────────────────────────────── */
function StopButton({ onStop }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onStop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%", height: 72, background: hovered ? "#CC0000" : "#EF4444",
        border: "none", borderRadius: 16,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        cursor: "pointer",
        boxShadow: hovered ? "0 8px 24px rgba(239,68,68,0.5)" : "0 4px 14px rgba(239,68,68,0.3)",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "all 0.18s",
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
        <rect x="6" y="6" width="12" height="12" rx="2" />
      </svg>
      <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 22, color: "#fff" }}>Stop Charging</span>
    </button>
  );
}

/* ── Page Root ───────────────────────────────────────────────────── */
export default function ChargingActivePage({ battery = 65, navActive, setNavActive }) {
  const [stopped, setStopped] = useState(false);
  const [estTime, estAP] = useLiveClock(65);
  const range = Math.round(battery * 4.3);

  return (
    <div style={{
      position: "relative", width: 1280, height: 800,
      background: "linear-gradient(135deg,#e8f5e9 0%,#f0f9ff 50%,#faf5ff 100%)",
      overflow: "hidden", fontFamily: FONT,    backgroundImage: "url('/car.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    overflow: "hidden"
    }}>
      {/* Ambient blobs */}
      <div style={{ position: "absolute", width: 500, height: 500, left: -60, top: 80, borderRadius: "50%", background: "radial-gradient(circle,rgba(29,185,84,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, right: 40, top: -50, borderRadius: "50%", background: "radial-gradient(circle,rgba(14,210,247,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />

      <TopBar battery={battery} range={range} />
      <BatteryGauge percent={battery} />
      <ChargingSparks />

      {/* Right panel */}
      <div style={{ position: "absolute", left: 900, top: 70, width: 356 }}>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 22, color: "#111", marginBottom: 16 }}>
          Charging Status
        </div>

        {/* Charging Rate */}
        <InfoCard
          label="Charging Rate" bg="#EBFFEE"
          value={<>75 <span style={{ fontSize: 20, fontWeight: 400 }}>kW</span></>}
          sub="Fast Charging"
          icon={<svg width="30" height="30" viewBox="0 0 24 24" fill={GREEN}><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          style={{ marginBottom: 12 }}
        />

        {/* Duration */}
        <InfoCard
          label="Duration" bg="#E7F3FF"
          value={<>1<span style={{ fontSize: 20, fontWeight: 400 }}> h </span>05<span style={{ fontSize: 20, fontWeight: 400 }}>m</span></>}
          icon={
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" stroke="#0088FF" strokeWidth="3" />
              <circle cx="16" cy="16" r="2" fill="#0088FF" />
              <line x1="16" y1="16" x2="16" y2="8" stroke="#0088FF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="16" y1="16" x2="22" y2="16" stroke="#0088FF" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          }
          style={{ marginBottom: 12 }}
        />

        {/* Estimated Full */}
        <InfoCard
          label="Estimated Full" bg="#EDE9FE"
          value={estTime}
          sub={`${estAP} · Today`}
          icon={
            <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
              <rect x="2" y="5" width="26" height="23" rx="4" stroke="#CB30E0" strokeWidth="2" />
              <line x1="2" y1="12" x2="28" y2="12" stroke="#CB30E0" strokeWidth="2" />
              <line x1="9" y1="2" x2="9" y2="8" stroke="#CB30E0" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="21" y1="2" x2="21" y2="8" stroke="#CB30E0" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="7" y="17" width="5" height="4" rx="1" fill="#CB30E0" opacity="0.5" />
              <rect x="13" y="17" width="5" height="4" rx="1" fill="#CB30E0" opacity="0.5" />
              <rect x="7" y="23" width="5" height="4" rx="1" fill="#CB30E0" opacity="0.3" />
            </svg>
          }
          style={{ marginBottom: 20 }}
        />

        {/* Stop / Stopped */}
        {!stopped
          ? <StopButton onStop={() => setStopped(true)} />
          : (
            <div style={{
              width: "100%", height: 72, background: "#F3F4F6", borderRadius: 16,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 18, color: "#9CA3AF" }}>Charging Stopped</span>
            </div>
          )
        }

        {!stopped && (
          <div style={{
            marginTop: 12, background: "rgba(29,185,84,0.07)", borderRadius: 12,
            padding: "10px 14px", display: "flex", alignItems: "center", gap: 8,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill={GREEN}>
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span style={{ fontFamily: FONT, fontSize: 13, color: GREEN_DARK, fontWeight: 500 }}>
              +{Math.round(battery * 0.15)}% per 10 min · Full in ~65 min
            </span>
          </div>
        )}
      </div>

      <BottomNav active={navActive} setActive={setNavActive} />
    </div>
  );
}