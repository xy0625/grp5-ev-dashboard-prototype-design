import { useState, useEffect, useRef } from "react";
import BottomNav from "./BottomNav";

/* ─── Animated circular battery gauge ──────────────────────────── */
function BatteryGauge({ percent = 65 }) {
  const [displayed, setDisplayed] = useState(0);
  const animRef = useRef(null);

  // Animate count-up on mount
  useEffect(() => {
    let start = null;
    const duration = 1200;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplayed(Math.round(progress * percent));
      if (progress < 1) animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [percent]);

  // SVG arc helpers
  const size = 350;
  const cx = 175, cy = 175, r = 155;
  const strokeW = 18;
  const circumference = 2 * Math.PI * r;

  // Arc goes from 135° to 405° (270° sweep) — bottom-left to bottom-right
  const startAngle = 135;
  const sweepAngle = 270;
  const endAngle = startAngle + sweepAngle;

  const polarToXY = (angle, radius) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const arcPath = (start, sweep, radius) => {
    const s = polarToXY(start, radius);
    const e = polarToXY(start + sweep, radius);
    const large = sweep > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  const filledSweep = (displayed / 100) * sweepAngle;

  // Gradient color: green for >50%, amber for 20-50%, red for <20%
  const fillColor = displayed >= 50 ? "#27AE60" : displayed >= 20 ? "#F59E0B" : "#EF4444";

  // Glow intensity on tip
  const tipPos = polarToXY(startAngle + filledSweep, r);

  return (
    <div style={{ position: "absolute", width: 350, height: 350, left: 48, top: 65 }}>
      <svg width="350" height="350" viewBox="0 0 350 350">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#27AE60" />
            <stop offset="100%" stopColor="#6EE7B7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="outerGlow">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Track */}
        <path
          d={arcPath(startAngle, sweepAngle, r)}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeW}
          strokeLinecap="round"
        />

        {/* Teal accent track (background decoration) */}
        <path
          d={arcPath(startAngle, sweepAngle * 0.15, r)}
          fill="none"
          stroke="#0ED2F7"
          strokeWidth={strokeW * 0.6}
          strokeLinecap="round"
          opacity="0.35"
          style={{ transform: `rotate(0deg)` }}
        />

        {/* Filled arc */}
        {filledSweep > 0 && (
          <path
            d={arcPath(startAngle, filledSweep, r)}
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth={strokeW}
            strokeLinecap="round"
            filter="url(#outerGlow)"
            style={{ transition: "all 0.05s linear" }}
          />
        )}

        {/* Glowing tip dot */}
        {filledSweep > 2 && (
          <circle
            cx={tipPos.x}
            cy={tipPos.y}
            r={strokeW / 2 + 2}
            fill={fillColor}
            filter="url(#glow)"
            opacity="0.9"
          />
        )}

        {/* Outer ring shadow ring */}
        <circle cx={cx} cy={cy} r={r + strokeW / 2 + 4} fill="none" stroke="rgba(39,174,96,0.08)" strokeWidth="8" />
      </svg>

      {/* Center content */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 350, height: 350, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", lineHeight: 1 }}>
          <span style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 128, color: "#000", lineHeight: "155px" }}>{displayed}</span>
          <span style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 40, color: "#000", marginTop: 28 }}>%</span>
        </div>
        <div style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 32, color: "#808080", marginTop: -10 }}>Battery</div>
      </div>
    </div>
  );
}

/* ─── EV Car Illustration (SVG placeholder) ─────────────────────── */
function CarIllustration() {
  return (
    <div style={{ position: "absolute", left: 320, top: 100, width: 560, height: 380, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      {/* Glow under car */}
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", width: 420, height: 40, background: "radial-gradient(ellipse, rgba(39,174,96,0.35) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(8px)" }} />

      {/* Car SVG — clean EV sedan silhouette */}
      <svg width="480" height="220" viewBox="0 0 480 220" fill="none" style={{ filter: "drop-shadow(0px 20px 40px rgba(39,174,96,0.25))" }}>
        {/* Body shadow */}
        <ellipse cx="240" cy="208" rx="210" ry="14" fill="rgba(0,0,0,0.12)" />

        {/* Main body */}
        <path d="M40 155 Q38 130 60 125 L100 80 Q130 55 175 50 L305 50 Q345 50 375 75 L420 125 Q445 130 442 155 L442 175 Q442 185 432 185 L380 185 Q370 170 350 165 Q310 155 270 165 L210 165 Q170 155 130 165 Q110 170 100 185 L48 185 Q38 185 38 175 Z" fill="#F8F8F8" />

        {/* Roof */}
        <path d="M105 80 Q132 52 178 47 L302 47 Q342 47 370 72 L415 120 L65 120 Z" fill="#EFEFEF" />

        {/* Windshield */}
        <path d="M130 118 L155 70 Q168 55 185 52 L240 52 L240 118 Z" fill="rgba(180,220,255,0.5)" stroke="#DDD" strokeWidth="1" />

        {/* Rear window */}
        <path d="M240 52 L295 52 Q312 55 325 70 L350 118 L240 118 Z" fill="rgba(180,220,255,0.5)" stroke="#DDD" strokeWidth="1" />

        {/* Side windows */}
        <rect x="158" y="60" width="4" height="58" rx="2" fill="#CCC" />
        <rect x="318" y="60" width="4" height="58" rx="2" fill="#CCC" />

        {/* Door lines */}
        <line x1="240" y1="122" x2="240" y2="183" stroke="#DDD" strokeWidth="1.5" />
        <line x1="158" y1="122" x2="158" y2="183" stroke="#DDD" strokeWidth="1.5" />
        <line x1="322" y1="122" x2="322" y2="183" stroke="#DDD" strokeWidth="1.5" />

        {/* Front wheel */}
        <circle cx="120" cy="185" r="30" fill="#2D2D2D" />
        <circle cx="120" cy="185" r="20" fill="#444" />
        <circle cx="120" cy="185" r="8"  fill="#666" />
        {[0,60,120,180,240,300].map(a => {
          const rad = a * Math.PI / 180;
          return <line key={a} x1={120 + 10*Math.cos(rad)} y1={185 + 10*Math.sin(rad)} x2={120 + 19*Math.cos(rad)} y2={185 + 19*Math.sin(rad)} stroke="#555" strokeWidth="2.5" />;
        })}

        {/* Rear wheel */}
        <circle cx="360" cy="185" r="30" fill="#2D2D2D" />
        <circle cx="360" cy="185" r="20" fill="#444" />
        <circle cx="360" cy="185" r="8"  fill="#666" />
        {[0,60,120,180,240,300].map(a => {
          const rad = a * Math.PI / 180;
          return <line key={a} x1={360 + 10*Math.cos(rad)} y1={185 + 10*Math.sin(rad)} x2={360 + 19*Math.cos(rad)} y2={185 + 19*Math.sin(rad)} stroke="#555" strokeWidth="2.5" />;
        })}

        {/* Headlight */}
        <path d="M62 140 Q58 138 60 133 L75 130 Q80 132 78 137 Z" fill="#FFFDE7" opacity="0.9" />
        <path d="M58 140 Q40 145 35 160" stroke="rgba(255,253,200,0.4)" strokeWidth="8" strokeLinecap="round" />

        {/* Taillight */}
        <rect x="430" y="135" width="10" height="25" rx="3" fill="#FF4444" opacity="0.8" />

        {/* Charging cable glow */}
        <path d="M442 158 Q490 158 490 158" stroke="#27AE60" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 3" opacity="0.7">
          <animate attributeName="stroke-dashoffset" values="0;-18" dur="0.6s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* Charging station */}
      <svg width="80" height="200" viewBox="0 0 80 200" style={{ position: "absolute", right: 20, bottom: 20 }}>
        {/* Station body */}
        <rect x="15" y="20" width="50" height="140" rx="10" fill="#2D3748" />
        <rect x="20" y="30" width="40" height="50" rx="6" fill="#1A202C" />
        {/* Screen glow */}
        <rect x="22" y="32" width="36" height="46" rx="4" fill="#0ED2F7" opacity="0.15" />
        <rect x="24" y="38" width="32" height="8" rx="2" fill="#27AE60" opacity="0.8" />
        <rect x="24" y="50" width="22" height="4" rx="2" fill="#6EE7B7" opacity="0.6" />
        <rect x="24" y="58" width="28" height="4" rx="2" fill="#6EE7B7" opacity="0.4" />
        {/* Lightning bolt */}
        <path d="M35 95 L45 95 L40 110 L50 110 L38 130 L42 115 L33 115 Z" fill="#27AE60" opacity="0.9" />
        {/* Base */}
        <rect x="10" y="160" width="60" height="12" rx="4" fill="#1A202C" />
        <rect x="5"  y="170" width="70" height="8"  rx="4" fill="#2D3748" />

        {/* Cable */}
        <path d="M65 100 Q80 100 80 100" stroke="#27AE60" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite" />
        </path>

        {/* Ambient glow */}
        <circle cx="40" cy="100" r="35" fill="rgba(39,174,96,0.08)" />
      </svg>
    </div>
  );
}

/* ─── Status Info Card ──────────────────────────────────────────── */
function InfoCard({ style, iconBg, iconColor, icon, label, value, sub }) {
  return (
    <div style={{ position: "absolute", width: 335, height: 126, background: "#fff", boxShadow: "0px 6px 20px rgba(0,0,0,0.1)", borderRadius: 20, display: "flex", alignItems: "center", gap: 0, ...style }}>
      {/* Icon box */}
      <div style={{ width: 65, height: 65, background: iconBg, borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 31, flexShrink: 0 }}>
        {icon}
      </div>
      {/* Text */}
      <div style={{ marginLeft: 20 }}>
        <div style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "rgba(0,0,0,0.8)", lineHeight: "19px" }}>{label}</div>
        <div style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 36, color: "#000", lineHeight: "44px" }}>{value}</div>
        {sub && <div style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "rgba(128,128,128,0.8)", lineHeight: "19px" }}>{sub}</div>}
      </div>
    </div>
  );
}

/* ─── Lightning icon ────────────────────────────────────────────── */
function LightningIcon({ color = "#27AE60" }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill={color}>
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

/* ─── Clock icon ─────────────────────────────────────────────────── */
function ClockIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="13" stroke="#0088FF" strokeWidth="3" />
      <circle cx="16" cy="16" r="2" fill="#0088FF" />
      <line x1="16" y1="16" x2="16" y2="7"  stroke="#0088FF" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="16" x2="22" y2="16" stroke="#0088FF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Calendar icon ─────────────────────────────────────────────── */
function CalendarIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="2" y="5" width="26" height="23" rx="4" stroke="#CB30E0" strokeWidth="2" />
      <line x1="2" y1="12" x2="28" y2="12" stroke="#CB30E0" strokeWidth="2" />
      <line x1="9"  y1="2" x2="9"  y2="8"  stroke="#CB30E0" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="21" y1="2" x2="21" y2="8"  stroke="#CB30E0" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="7"  y="17" width="5" height="4" rx="1" fill="#CB30E0" opacity="0.5" />
      <rect x="13" y="17" width="5" height="4" rx="1" fill="#CB30E0" opacity="0.5" />
      <rect x="7"  y="23" width="5" height="4" rx="1" fill="#CB30E0" opacity="0.3" />
    </svg>
  );
}

/* ─── Top Bar ────────────────────────────────────────────────────── */
function TopBar() {
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1280, height: 62 }}>
      {/* WiFi */}
      <div style={{ position: "absolute", left: 65, top: 9, width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="34" height="28" viewBox="0 0 34 28" fill="none">
          <path d="M17 22a2 2 0 110 4 2 2 0 010-4z" fill="#000" />
          <path d="M10 16.5a9.9 9.9 0 0114 0"     stroke="#000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M4 10.5a17.5 17.5 0 0126 0"    stroke="#000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>
      {/* Bluetooth */}
      <div style={{ position: "absolute", left: 138, top: 9, width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="28" height="36" viewBox="0 0 24 36" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round">
          <path d="M6 9l12 9-6 5V3l6 5-12 9" />
        </svg>
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

/* ─── Animated charging sparks ──────────────────────────────────── */
function ChargingSparks() {
  return (
    <div style={{ position: "absolute", left: 48, top: 65, width: 350, height: 350, pointerEvents: "none" }}>
      <svg width="350" height="350" viewBox="0 0 350 350">
        {[0,1,2,3].map(i => {
          const angle = (i * 90 + 22.5) * Math.PI / 180;
          const x = 175 + 175 * Math.cos(angle - Math.PI / 2);
          const y = 175 + 175 * Math.sin(angle - Math.PI / 2);
          return (
            <circle key={i} cx={x} cy={y} r="4" fill="#27AE60" opacity="0">
              <animate attributeName="opacity" values="0;0.8;0" dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              <animate attributeName="r" values="4;8;4" dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </circle>
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Stop Charging Button ──────────────────────────────────────── */
function StopButton({ onStop }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onStop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        width: 330,
        height: 48,
        left: 903,
        top: 595,
        background: hovered ? "#CC0000" : "#FF0000",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background 0.2s, transform 0.15s",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        boxShadow: hovered ? "0 6px 20px rgba(255,0,0,0.4)" : "0 4px 12px rgba(255,0,0,0.25)",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" style={{ marginRight: 10 }}>
        <rect x="6" y="6" width="12" height="12" rx="2" />
      </svg>
      <span style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 24, color: "#fff", lineHeight: "29px" }}>Stop Charging</span>
    </div>
  );
}

/* ─── Live clock for "Estimated Full" ───────────────────────────── */
function useLiveClock() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  // Add ~2h to current time for estimated full
  const est = new Date(t.getTime() + 2 * 60 * 60 * 1000 - 55 * 60 * 1000); // +1h05m
  const hh  = est.getHours() % 12 || 12;
  const mm  = String(est.getMinutes()).padStart(2, "0");
  const ap  = est.getHours() >= 12 ? "PM" : "AM";
  return `${String(hh).padStart(2,"0")}:${mm} ${ap}`;
}

/* ─── Page Root ──────────────────────────────────────────────────── */
export default function ChargingActivePage({ navActive, setNavActive }) {
  const [stopped, setStopped] = useState(false);
  const estFull = useLiveClock();

  return (
    <div style={{
      position: "relative",
      width: 1280 ,
      height: 800,
      background: "linear-gradient(180deg, rgba(245,245,245,0.2) 0%, rgba(245,245,245,0.2) 100%), linear-gradient(135deg, #e8f5e9 0%, #f0f9ff 50%, #faf5ff 100%)",
      overflow: "hidden",
      fontFamily: "Inter, sans-serif",
    }}>

      {/* Soft ambient background blobs */}
      <div style={{ position:"absolute", width:500, height:500, left:-60, top:100, borderRadius:"50%", background:"radial-gradient(circle,rgba(39,174,96,0.12) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:400, height:400, right:50, top:-50, borderRadius:"50%", background:"radial-gradient(circle,rgba(14,210,247,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />

      <TopBar />

      {/* ── Left: Battery gauge + car ── */}
      <BatteryGauge percent={65} />
      <ChargingSparks />
      <CarIllustration />

      {/* ── Right: Charging Status ── */}
      <div style={{ position:"absolute", left:916, top:90, fontFamily:"Inter", fontWeight:600, fontSize:24, color:"#000" }}>
        Charging Status
      </div>

      {/* Charging Rate card */}
      <InfoCard
        style={{ left:903, top:136 }}
        iconBg="#EBFFEE"
        icon={<LightningIcon color="#27AE60" />}
        label="Charging Rate"
        value={<>75 <span style={{ fontSize:24, fontWeight:400 }}>kW</span></>}
        sub="Fast Charging"
      />

      {/* Duration card */}
      <InfoCard
        style={{ left:903, top:289 }}
        iconBg="#E7F6FF"
        icon={<ClockIcon />}
        label="Duration"
        value={<>1 <span style={{ fontSize:24, fontWeight:400 }}>h</span> 05<span style={{ fontSize:24, fontWeight:400 }}>m</span></>}
        sub={null}
      />

      {/* Estimated Full card */}
      <InfoCard
        style={{ left:903, top:442 }}
        iconBg="#E8D6F2"
        icon={<CalendarIcon />}
        label="Estimated Full"
        value={estFull.split(" ")[0]}
        sub={estFull.split(" ")[1] + " · Today"}
      />

      {/* Stop button */}
      {!stopped
        ? <StopButton onStop={() => setStopped(true)} />
        : (
          <div style={{ position:"absolute", left:903, top:595, width:330, height:48, background:"#E5E7EB", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontFamily:"Inter", fontWeight:700, fontSize:20, color:"#9CA3AF" }}>Charging Stopped</span>
          </div>
        )
      }

      <BottomNav active={navActive} setActive={setNavActive} />
    </div>
  );
}