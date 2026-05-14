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
const CARD_SHADOW_DARK = "0 2px 16px rgba(0,0,0,0.5)";

/* ── Theme tokens ────────────────────────────────────────────────── */
function tk(theme) {
  const dark = theme === "dark";
  return {
    pageBg: dark
      ? "linear-gradient(135deg,#0a1a0f 0%,#0f1520 50%,#130f1f 100%)"
      : "linear-gradient(135deg,#e8f5e9 0%,#f0f9ff 50%,#faf5ff 100%)",
    cardBg: dark ? "#1C1F2A" : "#fff",
    cardBorder: dark ? "1.5px solid #2C2F3E" : "1.5px solid #E5E7EB",
    cardShadow: dark ? CARD_SHADOW_DARK : CARD_SHADOW,
    textPrimary: dark ? "#E8EAF0" : "#0D0D0D",
    textSecond: dark ? "#9CA3AF" : GRAY,
    textMuted: dark ? "#6B7280" : "#B0B5BF",
    topBarBg: dark ? "rgba(15,17,23,0.9)" : "rgba(255,255,255,0.75)",
    topBarBorder: dark
      ? "1px solid rgba(255,255,255,0.07)"
      : "1px solid rgba(0,0,0,0.06)",
    iconStroke: dark ? "#9CA3AF" : "#111",
    battPillBg: dark ? "#1C1F2A" : "#fff",
    battPillBorder: (c) => (dark ? `1.5px solid ${c}55` : `1.5px solid ${c}33`),
    divider: dark ? "#CBD5E1" : "#CBD5E1",
    profileBg: dark ? "rgba(99,102,241,0.2)" : "#F3EDFF",
    trackColor: dark ? "#2C2F3E" : "#E5E7EB",
    gaugeText: dark ? "#E8EAF0" : "#0D0D0D",
    stoppedBg: dark ? "#252836" : "#F3F4F6",
    stoppedText: dark ? "#6B7280" : "#9CA3AF",
    hintBg: dark ? "rgba(29,185,84,0.1)" : "rgba(29,185,84,0.07)",
    iconBg: {
      green: dark ? "rgba(29,185,84,0.15)" : "#EBFFEE",
      blue: dark ? "rgba(0,136,255,0.15)" : "#E7F3FF",
      purple: dark ? "rgba(203,48,224,0.12)" : "#EDE9FE",
    },
    blob1: dark ? "rgba(29,185,84,0.06)" : "rgba(29,185,84,0.1)",
    blob2: dark ? "rgba(14,210,247,0.04)" : "rgba(14,210,247,0.07)",
  };
}

/* ── Top Bar ─────────────────────────────────────────────────────── */
function TopBar({ battery, range, theme }) {
  const t = tk(theme);
  const battColor = battery < 20 ? RED : battery < 40 ? AMBER : GREEN;
  const filled = Math.max(2, Math.round((32 * battery) / 100));

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1280,
        height: 58,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxSizing: "border-box",
        background: t.topBarBg,
        backdropFilter: "blur(10px)",
        borderBottom: t.topBarBorder,
        zIndex: 5,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="28" height="22" viewBox="0 0 34 28" fill="none">
          <path d="M17 22a2 2 0 110 4 2 2 0 010-4z" fill={t.iconStroke} />
          <path
            d="M10 16.5a9.9 9.9 0 0114 0"
            stroke={t.iconStroke}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M4 10.5a17.5 17.5 0 0126 0"
            stroke={t.iconStroke}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <svg
          width="20"
          height="28"
          viewBox="0 0 24 36"
          fill="none"
          stroke={t.iconStroke}
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M6 9l12 9-6 5V3l6 5-12 9" />
        </svg>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: t.battPillBg,
          borderRadius: 30,
          padding: "6px 20px",
          boxShadow: t.cardShadow,
          border: t.battPillBorder(battColor),
        }}
      >
        <svg width="38" height="20" viewBox="0 0 42 24">
          <rect
            x="1"
            y="3"
            width="36"
            height="18"
            rx="3"
            stroke={battColor}
            strokeWidth="2"
            fill="none"
          />
          <rect x="37" y="8" width="4" height="8" rx="2" fill={battColor} />
          <rect
            x="3"
            y="5"
            width={filled}
            height="14"
            rx="1"
            fill={battColor}
          />
        </svg>
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 17,
            color: battColor,
          }}
        >
          {battery}%
        </span>
        <span style={{ fontFamily: FONT, fontSize: 16, color: t.divider }}>
          ·
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 17,
            color: t.textPrimary,
          }}
        >
          {range} km left
        </span>
      </div>

      <div
        style={{
          width: 44,
          height: 44,
          background: t.profileBg,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={INDIGO}
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

/* ── Animated Battery Gauge ──────────────────────────────────────── */
function BatteryGauge({ percent = 65, theme }) {
  const t = tk(theme);
  const [displayed, setDisplayed] = useState(0);
  const animRef = useRef(null);

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

  const cx = 175,
    cy = 175,
    r = 152,
    sw = 18;
  const startAngle = 135,
    sweepAngle = 270;

  const polarToXY = (angle, radius) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };
  const arcPath = (start, sweep, radius) => {
    const s = polarToXY(start, radius),
      e = polarToXY(start + sweep, radius);
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${sweep > 180 ? 1 : 0} 1 ${e.x} ${e.y}`;
  };

  const filledSweep = (displayed / 100) * sweepAngle;
  const fillColor = displayed >= 50 ? GREEN : displayed >= 20 ? AMBER : RED;
  const tipPos = polarToXY(startAngle + filledSweep, r);

  return (
    <div
      style={{
        position: "absolute",
        width: 350,
        height: 350,
        left: 48,
        top: 65,
      }}
    >
      <svg width="350" height="350" viewBox="0 0 350 350">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fillColor} />
            <stop
              offset="100%"
              stopColor={
                displayed >= 50
                  ? "#6EE7B7"
                  : displayed >= 20
                    ? "#FCD34D"
                    : "#FCA5A5"
              }
            />
          </linearGradient>
        </defs>

        {/* Track */}
        <path
          d={arcPath(startAngle, sweepAngle, r)}
          fill="none"
          stroke={t.trackColor}
          strokeWidth={sw}
          strokeLinecap="round"
        />

        {/* Filled arc */}
        {filledSweep > 0 && (
          <path
            d={arcPath(startAngle, filledSweep, r)}
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth={sw}
            strokeLinecap="round"
            style={{ transition: "all 0.05s linear" }}
          />
        )}

        {/* Glowing tip */}
        {filledSweep > 2 && (
          <circle
            cx={tipPos.x}
            cy={tipPos.y}
            r={sw / 2 + 3}
            fill={fillColor}
            opacity="0.85"
          />
        )}

        {/* Outer decorative ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r + sw / 2 + 5}
          fill="none"
          stroke={fillColor}
          strokeWidth="1"
          opacity="0.12"
        />
      </svg>

      {/* Center text */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 350,
          height: 350,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 108,
              color: t.gaugeText,
              lineHeight: "130px",
            }}
          >
            {displayed}
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 36,
              color: t.gaugeText,
              marginTop: 24,
            }}
          >
            %
          </span>
        </div>
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: 28,
            color: t.textSecond,
            marginTop: -12,
          }}
        >
          Battery
        </span>

        {displayed < 20 && (
          <div
            style={{
              marginTop: 10,
              background: RED,
              color: "#fff",
              borderRadius: 10,
              padding: "4px 14px",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            ⚠ Low — charge soon
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Charging Sparks ─────────────────────────────────────────────── */
function ChargingSparks() {
  return (
    <div
      style={{
        position: "absolute",
        left: 48,
        top: 65,
        width: 350,
        height: 350,
        pointerEvents: "none",
      }}
    >
      <svg width="350" height="350" viewBox="0 0 350 350">
        {[0, 1, 2, 3].map((i) => {
          const angle = ((i * 90 + 22.5) * Math.PI) / 180;
          const x = 175 + 175 * Math.cos(angle - Math.PI / 2);
          const y = 175 + 175 * Math.sin(angle - Math.PI / 2);
          return (
            <circle key={i} cx={x} cy={y} r="4" fill={GREEN} opacity="0">
              <animate
                attributeName="opacity"
                values="0;0.8;0"
                dur={`${1.2 + i * 0.3}s`}
                repeatCount="indefinite"
                begin={`${i * 0.3}s`}
              />
              <animate
                attributeName="r"
                values="4;8;4"
                dur={`${1.2 + i * 0.3}s`}
                repeatCount="indefinite"
                begin={`${i * 0.3}s`}
              />
            </circle>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Status Info Card ────────────────────────────────────────────── */
function InfoCard({ label, value, sub, icon, bg, style, theme }) {
  const t = tk(theme);
  return (
    <div
      style={{
        background: t.cardBg,
        borderRadius: 20,
        padding: "16px 22px",
        boxShadow: t.cardShadow,
        border: t.cardBorder,
        display: "flex",
        alignItems: "center",
        gap: 18,
        ...style,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          background: bg,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: 14,
            color: t.textSecond,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 30,
            color: t.textPrimary,
            lineHeight: "36px",
          }}
        >
          {value}
        </div>
        {sub && (
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 400,
              fontSize: 13,
              color: t.textMuted,
            }}
          >
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Live Estimated Full Clock ───────────────────────────────────── */
function useLiveClock(addMinutes = 65) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const est = new Date(time.getTime() + addMinutes * 60 * 1000);
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
        width: "100%",
        height: 72,
        background: hovered ? "#CC0000" : RED,
        border: "none",
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        cursor: "pointer",
        boxShadow: hovered
          ? "0 8px 24px rgba(239,68,68,0.5)"
          : "0 4px 14px rgba(239,68,68,0.3)",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "all 0.18s",
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
        <rect x="6" y="6" width="12" height="12" rx="2" />
      </svg>
      <span
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 22,
          color: "#fff",
        }}
      >
        Stop Charging
      </span>
    </button>
  );
}

/* ── Page Root ───────────────────────────────────────────────────── */
export default function ChargingActivePage({
  battery = 65,
  navActive,
  setNavActive,
  theme = "light",
}) {
  const t = tk(theme);
  const [stopped, setStopped] = useState(false);
  const [estTime, estAP] = useLiveClock(65);
  const range = Math.round(battery * 4.3);

  return (
    <div
      style={{
        position: "relative",
        width: 1280,
        height: 800,
        background: t.pageBg,
        backgroundImage: "url('/car.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* dark mode 时叠一层半透明遮罩，让背景图不太刺眼 */}
      {theme === "dark" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: "rgba(10,12,20,0.65)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Ambient blobs */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          left: -60,
          top: 80,
          borderRadius: "50%",
          background: `radial-gradient(circle,${t.blob1} 0%,transparent 70%)`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          right: 40,
          top: -50,
          borderRadius: "50%",
          background: `radial-gradient(circle,${t.blob2} 0%,transparent 70%)`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <TopBar battery={battery} range={range} theme={theme} />
        <BatteryGauge percent={battery} theme={theme} />
        <ChargingSparks />

        {/* Right panel */}
        <div style={{ position: "absolute", left: 900, top: 70, width: 356 }}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 22,
              color: t.textPrimary,
              marginBottom: 16,
            }}
          >
            Charging Status
          </div>

          <InfoCard
            label="Charging Rate"
            bg={t.iconBg.green}
            value={
              <>
                <span style={{ color: t.textPrimary }}>75 </span>
                <span
                  style={{ fontSize: 20, fontWeight: 400, color: t.textSecond }}
                >
                  kW
                </span>
              </>
            }
            sub="Fast Charging"
            icon={
              <svg width="30" height="30" viewBox="0 0 24 24" fill={GREEN}>
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            style={{ marginBottom: 12 }}
            theme={theme}
          />

          <InfoCard
            label="Duration"
            bg={t.iconBg.blue}
            value={
              <>
                <span style={{ color: t.textPrimary }}>1</span>
                <span
                  style={{ fontSize: 20, fontWeight: 400, color: t.textSecond }}
                >
                  {" "}
                  h{" "}
                </span>
                <span style={{ color: t.textPrimary }}>05</span>
                <span
                  style={{ fontSize: 20, fontWeight: 400, color: t.textSecond }}
                >
                  m
                </span>
              </>
            }
            icon={
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  stroke="#0088FF"
                  strokeWidth="3"
                />
                <circle cx="16" cy="16" r="2" fill="#0088FF" />
                <line
                  x1="16"
                  y1="16"
                  x2="16"
                  y2="8"
                  stroke="#0088FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="16"
                  y1="16"
                  x2="22"
                  y2="16"
                  stroke="#0088FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            }
            style={{ marginBottom: 12 }}
            theme={theme}
          />

          <InfoCard
            label="Estimated Full"
            bg={t.iconBg.purple}
            value={<span style={{ color: t.textPrimary }}>{estTime}</span>}
            sub={`${estAP} · Today`}
            icon={
              <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
                <rect
                  x="2"
                  y="5"
                  width="26"
                  height="23"
                  rx="4"
                  stroke="#CB30E0"
                  strokeWidth="2"
                />
                <line
                  x1="2"
                  y1="12"
                  x2="28"
                  y2="12"
                  stroke="#CB30E0"
                  strokeWidth="2"
                />
                <line
                  x1="9"
                  y1="2"
                  x2="9"
                  y2="8"
                  stroke="#CB30E0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="21"
                  y1="2"
                  x2="21"
                  y2="8"
                  stroke="#CB30E0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <rect
                  x="7"
                  y="17"
                  width="5"
                  height="4"
                  rx="1"
                  fill="#CB30E0"
                  opacity="0.5"
                />
                <rect
                  x="13"
                  y="17"
                  width="5"
                  height="4"
                  rx="1"
                  fill="#CB30E0"
                  opacity="0.5"
                />
                <rect
                  x="7"
                  y="23"
                  width="5"
                  height="4"
                  rx="1"
                  fill="#CB30E0"
                  opacity="0.3"
                />
              </svg>
            }
            style={{ marginBottom: 20 }}
            theme={theme}
          />

          {!stopped ? (
            <StopButton onStop={() => setStopped(true)} />
          ) : (
            <div
              style={{
                width: "100%",
                height: 72,
                background: t.stoppedBg,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={t.stoppedText}
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: 18,
                  color: t.stoppedText,
                }}
              >
                Charging Stopped
              </span>
            </div>
          )}

          {!stopped && (
            <div
              style={{
                marginTop: 12,
                background: t.hintBg,
                borderRadius: 12,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill={GREEN}>
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 13,
                  color: theme === "dark" ? "#4ADE80" : GREEN_DARK,
                  fontWeight: 500,
                }}
              >
                +{Math.round(battery * 0.15)}% per 10 min · Full in ~65 min
              </span>
            </div>
          )}
        </div>

        <BottomNav active={navActive} setActive={setNavActive} theme={theme} />
      </div>
    </div>
  );
}
