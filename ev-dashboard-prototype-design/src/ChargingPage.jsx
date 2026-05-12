import { useState } from "react";
import BottomNav from "./BottomNav";

const FONT = "'DM Sans', 'Inter', sans-serif";
const GREEN = "#1DB954";
const GREEN_DARK = "#15803d";
const GREEN_BG = "#e8fdf0";
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
      {/* Left: connectivity icons */}
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

      {/* Center: color-coded battery pill */}
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
        {battery < 20 && (
          <span style={{
            background: RED, color: "#fff", fontSize: 11, fontWeight: 700,
            borderRadius: 6, padding: "2px 8px", marginLeft: 4, letterSpacing: "0.03em",
          }}>LOW</span>
        )}
      </div>

      {/* Right: profile */}
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

/* ── Map View ────────────────────────────────────────────────────── */
function MapView() {
  return (
    <div style={{
      position: "absolute", left: 24, top: 74, width: 640, height: 390,
      borderRadius: 20, overflow: "hidden", background: "#B2DFDB",
      boxShadow: CARD_SHADOW,
    }}>
      <svg width="640" height="362" viewBox="0 0 640 362" style={{ display: "block" }}>
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
        <rect width="640" height="362" fill="url(#cSky)" />
        <path d="M0 120 Q80 80 160 100 Q240 120 320 90 Q400 60 480 80 Q560 100 640 70 L640 362 L0 362Z" fill="url(#cLand)" />
        <path d="M0 200 Q100 180 200 195 Q300 210 400 185 Q500 160 640 175 L640 220 Q500 210 400 230 Q300 250 200 240 Q100 230 0 250Z" fill="#89c4d8" opacity="0.7" />
        <line x1="0" y1="230" x2="640" y2="230" stroke="#fff" strokeWidth="3" opacity="0.6" />
        <line x1="320" y1="0" x2="320" y2="362" stroke="#fff" strokeWidth="2.5" opacity="0.5" />
        <rect x="245" y="222" width="52" height="20" rx="4" fill="#3b82f6" />
        <text x="271" y="236" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">AH150</text>
        <rect x="363" y="268" width="28" height="20" rx="3" fill="#f59e0b" />
        <text x="377" y="282" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="700">21</text>
        {[
          [200, 200, "Kuching"], [60, 195, "Riam"], [130, 210, "Lundu"],
          [130, 245, "Serikin"], [230, 240, "Siburan"], [360, 210, "Kota Samarahan"],
          [420, 190, "Sebuyau"], [490, 230, "Lingga"], [390, 270, "Serian"],
          [490, 290, "Pantu"], [480, 150, "Kabong"],
        ].map(([x, y, label], i) => (
          <text key={i} x={x} y={y} fill="#374151"
            fontSize={label === "Kuching" ? 15 : 10}
            fontWeight={label === "Kuching" ? "700" : "500"}
            fontFamily="Inter,sans-serif" textAnchor="middle">{label}</text>
        ))}
        {[[250, 195, "#16A34A", "A"], [330, 215, "#16A34A", "B"], [400, 225, "#16A34A", "C"]].map(([x, y, c, l], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="13" fill={c} />
            <text x={x} y={y + 5} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily="Inter,sans-serif">{l}</text>
          </g>
        ))}
      </svg>

      {/* Search bar */}
      <div style={{
        position: "absolute", top: 20, left: 20, width: 244, height: 42,
        background: "#fff", borderRadius: 21, display: "flex", alignItems: "center",
        gap: 8, padding: "0 14px", boxShadow: "0 2px 12px rgba(0,0,0,0.14)",
      }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <span style={{ fontFamily: FONT, fontWeight: 400, fontSize: 16, color: "rgba(0,0,0,0.55)" }}>Where to?</span>
      </div>

      {/* Sarawak weather badge — contextual awareness for heavy rain conditions */}
      <div style={{
        position: "absolute", top: 20, right: 16,
        background: "rgba(59,130,246,0.13)", backdropFilter: "blur(6px)",
        borderRadius: 12, padding: "6px 12px",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#3b82f6">
          <path d="M18 10a6 6 0 10-11.95.85A4 4 0 006 18h12a4 4 0 000-8z" />
        </svg>
        <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: "#1d4ed8" }}>Rain likely</span>
      </div>
    </div>
  );
}

/* ── Quick Toggle Card ───────────────────────────────────────────── */
function QuickToggle({ label, icon, on, onToggle, activeColor, activeBg }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 8, width: "100%", minHeight: 106,
        background: on ? activeBg : "#fff",
        borderRadius: 18,
        border: on ? `2px solid ${activeColor}` : "1.5px solid #E5E7EB",
        cursor: "pointer", transition: "all 0.18s",
        boxShadow: on ? `0 0 0 3px ${activeColor}20` : CARD_SHADOW,
        padding: 0,
      }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: "50%",
        background: on ? activeColor : "#F3F4F6",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.18s",
      }}>
        {icon(on)}
      </div>
      <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13, color: on ? activeColor : "#374151" }}>{label}</span>
      <span style={{
        fontFamily: FONT, fontWeight: 500, fontSize: 12,
        color: on ? activeColor : "#9CA3AF",
        background: on ? `${activeColor}18` : "#F3F4F6",
        borderRadius: 8, padding: "2px 10px",
      }}>{on ? "ON" : "OFF"}</span>
    </button>
  );
}

/* ── Range Card ─────────────────────────────────────────────────── */
function RangeCard({ range }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 18, padding: "5px 16px",
      boxShadow: CARD_SHADOW, border: "1.5px solid #E5E7EB"
    }}>
      <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13, color: GRAY, marginBottom: 2 }}>Estimated Range</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
        <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 34, color: "#111", lineHeight: 1 }}>{range}</span>
        <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: 15, color: GRAY }}>km</span>
      </div>
      <div style={{ fontFamily: FONT, fontSize: 10, color: "#B0B5BF", marginBottom: 6 }}>Based on current settings</div>
      <svg width="100%" height="50" viewBox="0 0 200 50">
        <line x1="18" y1="8" x2="195" y2="8" stroke="#f3f4f6" strokeWidth="1" />
        <line x1="18" y1="26" x2="195" y2="26" stroke="#f3f4f6" strokeWidth="1" />
        <line x1="18" y1="44" x2="195" y2="44" stroke="#f3f4f6" strokeWidth="1" />
        <path d="M18 44 Q70 34 108 22 Q140 14 195 10 L195 44 Z" fill="rgba(29,185,84,0.12)" />
        <path d="M18 44 Q70 34 108 22 Q140 14 195 10" stroke={GREEN} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {["Now", "+1h", "+2h"].map((t, i) => (
          <text key={i} x={[18, 108, 195][i]} y="50" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif" textAnchor="middle">{t}</text>
        ))}
        {["120", "60", "0"].map((v, i) => (
          <text key={i} x="14" y={[9, 27, 45][i]} fontSize="8" fill="#B0B5BF" fontFamily="Inter,sans-serif" textAnchor="end">{v}</text>
        ))}
      </svg>
    </div>
  );
}

/* ── Pre-condition Card ─────────────────────────────────────────── */
function PreCondCard() {
  return (
    <div style={{
      background: "rgba(243,237,255,0.92)", borderRadius: 18,
      padding: "14px 16px", boxShadow: CARD_SHADOW,
      border: "1.5px solid #E9D5FF",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      minHeight: 106,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill={INDIGO}>
          <path d="M15 13V5a3 3 0 10-6 0v8a5 5 0 106 0zm-3 5a3 3 0 110-6 3 3 0 010 6z" />
        </svg>
        <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13, color: "#5B21B6" }}>Pre-condition</span>
      </div>
      <div>
        <div style={{ fontFamily: FONT, fontSize: 11, color: "#A78BFA", marginBottom: 4 }}>Schedule at</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 3M9 2h6M12 2v3" />
          </svg>
          <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 20, color: INDIGO }}>10:00</span>
          <span style={{ fontFamily: FONT, fontSize: 14, color: "#A78BFA" }}>PM</span>
        </div>
      </div>
    </div>
  );
}

/* ── Station Card ────────────────────────────────────────────────── */
function StationCard({ name, distance, available, total, power, canReach, isNearest, onNavigate }) {
  const [liked, setLiked] = useState(false);
  const availColor = available === 0 ? RED : available === 1 ? AMBER : GREEN;
  const availBg = available === 0 ? "#FEF2F2" : available === 1 ? "#FFFBEB" : GREEN_BG;
  const navActive = canReach && available > 0;

  return (
    <div style={{
      background: "#fff", borderRadius: 18, padding: "18px 16px", minHeight: 130,
      boxShadow: isNearest ? `0 4px 20px rgba(29,185,84,0.18)` : CARD_SHADOW,
      border: isNearest ? `2px solid ${GREEN}` : "1.5px solid #E5E7EB",
      position: "relative", transition: "box-shadow 0.2s",
    }}>
      {isNearest && (
        <div style={{
          position: "absolute", top: -1, left: 16,
          background: GREEN, color: "#fff", fontSize: 10, fontWeight: 700,
          borderRadius: "0 0 8px 8px", padding: "2px 10px", letterSpacing: "0.04em",
        }}>NEAREST</div>
      )}

      {/* Heart — Fitts: min 36×36 touch target */}
      <button
        onClick={() => setLiked(v => !v)}
        style={{
          position: "absolute", top: 12, right: 12, background: "none", border: "none",
          cursor: "pointer", padding: 4, minWidth: 36, minHeight: 36,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24"
          fill={liked ? RED : "none"} stroke={liked ? RED : "#D1D5DB"} strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>

      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 17, color: "#111", marginBottom: 8, paddingRight: 32 }}>{name}</div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>

          {/* Badges row */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ background: GREEN_BG, color: GREEN_DARK, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>Fast</span>
            {/* Reachability badge — resolves range anxiety without mental math */}
            {canReach
              ? <span style={{ background: GREEN_BG, color: GREEN_DARK, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill={GREEN_DARK}><path d="M20 6L9 17l-5-5" stroke={GREEN_DARK} strokeWidth="3" strokeLinecap="round" fill="none" /></svg>
                  Reachable
                </span>
              : <span style={{ background: "#FEF2F2", color: RED, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>Out of range</span>
            }
          </div>

          {/* Distance · availability */}
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "nowrap" }}>
            <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13, color: "#111", whiteSpace: "nowrap" }}>{distance}</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#D1D5DB", display: "inline-block", flexShrink: 0 }} />
            <span style={{ background: availBg, borderRadius: 8, padding: "2px 8px", fontFamily: FONT, fontWeight: 600, fontSize: 13, color: availColor, whiteSpace: "nowrap" }}>
              {available}/{total} available
            </span>
          </div>

          {/* Power */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={GREEN}><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 12, color: GRAY }}>Up to {power}</span>
          </div>
        </div>

        {/* Navigate button — large target for safe in-car interaction */}
        <div
          onClick={navActive ? onNavigate : undefined}
          style={{
            width: 130, height: 82, background: navActive ? GREEN : "#E5E7EB",
            borderRadius: 14, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 4,
            cursor: navActive ? "pointer" : "not-allowed",
            boxShadow: navActive ? `0 4px 14px rgba(29,185,84,0.35)` : "none",
            flexShrink: 0, transition: "all 0.18s",
          }}
          onMouseEnter={e => { if (navActive) e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke={navActive ? "#fff" : "#9CA3AF"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Nearby Stations Panel ───────────────────────────────────────── */
function NearbyStations({ range, onStartSession }) {
  const stations = [
    { name: "Station A", distance: "12 km away", available: 2, total: 4, power: "120 kW", reachKm: 12 },
    { name: "Station B", distance: "28 km away", available: 1, total: 2, power: "60 kW",  reachKm: 28 },
    { name: "Station C", distance: "75 km away", available: 1, total: 2, power: "120 kW", reachKm: 75 },
    { name: "Station D", distance: "120 km away", available: 0, total: 4, power: "120 kW", reachKm: 120 },
  ];
  const reachableCount = stations.filter(s => s.reachKm <= range && s.available > 0).length;

  return (
    <div style={{ position: "absolute", left: 688, top: 70, width: 568, bottom: 35, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 20, color: "#111" }}>Nearby Stations</span>
        <span style={{
          fontFamily: FONT, fontSize: 13, fontWeight: 600,
          color: reachableCount > 0 ? GREEN_DARK : GRAY,
          background: reachableCount > 0 ? GREEN_BG : "#F3F4F6",
          borderRadius: 20, padding: "3px 12px",
        }}>{reachableCount} reachable</span>
      </div>
      <div style={{
        height: "100%", overflowY: "auto", display: "flex", flexDirection: "column",
        gap: 14, paddingRight: 6, paddingBottom: 120,
        scrollbarWidth: "thin", scrollbarColor: "#c9d0e0 transparent",
      }}>
        {stations.map((s, i) => (
          <StationCard
            key={s.name} {...s}
            canReach={s.reachKm <= range}
            isNearest={i === 0}
            onNavigate={onStartSession}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Page Root ───────────────────────────────────────────────────── */
export default function ChargingPage({ battery = 22, range = 95, navActive, setNavActive, onStartSession }) {
  const [ac, setAc] = useState(false);
  const [eco, setEco] = useState(false);
  const effectiveRange = eco ? Math.round(range * 1.12) : range;

  return (
    <div style={{
      position: "relative", width: 1280, height: 800,
      background: "linear-gradient(135deg,#e8f5fd 0%,#eaf6f0 55%,#f0f4ff 100%)",
      overflow: "hidden", fontFamily: FONT,
    }}>
      {/* Ambient blobs */}
      <div style={{ position: "absolute", width: 580, height: 580, left: -90, top: -90, borderRadius: "50%", background: "radial-gradient(circle,rgba(186,230,253,0.38) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 480, height: 480, right: -70, bottom: -70, borderRadius: "50%", background: "radial-gradient(circle,rgba(209,250,229,0.32) 0%,transparent 70%)", pointerEvents: "none" }} />

      <TopBar battery={battery} range={effectiveRange} />
      <MapView />

      {/* Quick controls row — below map */}
      <div style={{
        position: "absolute", left: 24, top: 480, width: 640,
        display: "grid", gridTemplateColumns: "1fr 1fr 2fr 1.55fr", gap: 12,
      }}>
        <QuickToggle
          label="A/C" on={ac} onToggle={() => setAc(v => !v)}
          activeColor="#0ea5e9" activeBg="#e0f7ff"
          icon={on => (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on ? "#fff" : "#9CA3AF"} strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          )}
        />
        <QuickToggle
          label="Eco" on={eco} onToggle={() => setEco(v => !v)}
          activeColor={GREEN} activeBg={GREEN_BG}
          icon={on => (
            <svg width="22" height="22" viewBox="0 0 24 24" fill={on ? "#fff" : "#9CA3AF"}>
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        />
        <RangeCard range={effectiveRange} />
        <PreCondCard />
      </div>

      <NearbyStations range={effectiveRange} onStartSession={onStartSession} />

      <BottomNav active={navActive} setActive={setNavActive} />
    </div>
  );
}