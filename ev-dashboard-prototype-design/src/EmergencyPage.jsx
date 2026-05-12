import { useState } from "react";
import BottomNav from "./BottomNav";

/* ─── SVG Icons ──────────────────────────────────────────────────────────── */

const WifiIcon = () => (
  <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
    <path d="M16 20a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="#1E1E1E" />
    <path
      d="M8 13.5C10.2 11.2 12.9 10 16 10s5.8 1.2 8 3.5"
      stroke="#1E1E1E"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M2 7C5.8 3.1 10.6 1 16 1s10.2 2.1 14 6"
      stroke="#1E1E1E"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const BluetoothIcon = () => (
  <svg width="22" height="32" viewBox="0 0 22 32" fill="none">
    <path
      d="M3 8L19 16 3 24"
      stroke="#1E1E1E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 8L3 16l16 8"
      stroke="#1E1E1E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="10" r="5.5" stroke="#1E1E1E" strokeWidth="2" />
    <path
      d="M3 26c0-6.1 4.9-11 11-11s11 4.9 11 11"
      stroke="#1E1E1E"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const PhoneIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
      fill={color}
    />
  </svg>
);

const LocationPinIcon = ({ color = "#5A5A5A" }) => (
  <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
    <path
      d="M14 1C8.5 1 3 6 3 12.5c0 9 11 18.5 11 18.5s11-9.5 11-18.5C25 6 19.5 1 14 1z"
      fill={color}
    />
    <circle cx="14" cy="12.5" r="4" fill="#fff" />
  </svg>
);

const CarEmergencyIcon = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    {/* Car body */}
    <path d="M12 38l5-14h38l5 14v12H12V38z" fill="#970000" />
    {/* Windshield */}
    <path d="M20 38l3-10h26l3 10H20z" fill="#C84040" opacity="0.6" />
    {/* Wheels */}
    <circle cx="22" cy="50" r="6" fill="#333" />
    <circle cx="50" cy="50" r="6" fill="#333" />
    <circle cx="22" cy="50" r="3" fill="#666" />
    <circle cx="50" cy="50" r="3" fill="#666" />
    {/* Emergency lights */}
    <rect x="26" y="22" width="8" height="6" rx="2" fill="#FF4444" />
    <rect
      x="38"
      y="22"
      width="8"
      height="6"
      rx="2"
      fill="#4444FF"
      opacity="0.8"
    />
    {/* Siren lines */}
    <path
      d="M30 18l-3-5M36 17v-6M42 18l3-5"
      stroke="#FF6666"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* ── Bottom nav icons (same as SettingsPage) ──────────────────────────────── */
/* ─── Toggle Switch ──────────────────────────────────────────────────────── */
function Toggle({ checked, onChange, variant = "gray" }) {
  const bg = checked
    ? variant === "red"
      ? "linear-gradient(270deg, #FF0E00 11%, #EC756E 76%)"
      : "#34C759"
    : "#E5E5EA";

  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: "96px",
        height: "48px",
        background: bg,
        borderRadius: "100px",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.3s",
        boxShadow: "inset 0px 2px 4px rgba(0,0,0,0.15)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "3px",
          left: checked ? "calc(100% - 45px)" : "3px",
          width: "42px",
          height: "42px",
          background: "#fff",
          borderRadius: "50%",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.22)",
          transition: "left 0.3s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </div>
  );
}

/* ─── Map Placeholder (Kuching, Sarawak) ─────────────────────────────────── */
function MapPlaceholder() {
  return (
    <div
      style={{
        width: "100%",
        height: "177px",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        background:
          "linear-gradient(160deg, #a8d8ea 0%, #72bcd4 40%, #5aacca 60%, #4a9ab8 80%, #c8e6c9 85%, #a5d6a7 100%)",
      }}
    >
      {/* Water body (South China Sea feel) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60%",
          height: "100%",
          background: "linear-gradient(180deg, #7ec8e3 0%, #5aacca 100%)",
          clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />
      {/* Land mass */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "55%",
          height: "100%",
          background:
            "linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 50%, #81c784 100%)",
          clipPath:
            "polygon(0% 0%, 85% 0%, 60% 40%, 80% 70%, 50% 100%, 0% 100%)",
        }}
      />
      {/* Roads */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        viewBox="0 0 382 177"
      >
        <path
          d="M80 30 Q120 60 150 90 Q180 120 160 177"
          stroke="#fff"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M0 80 Q60 85 100 100 Q150 115 200 110 Q250 105 300 120"
          stroke="#fff"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M120 0 Q130 40 140 80 Q150 120 170 177"
          stroke="#e8f5e9"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        {/* City labels */}
        <text x="60" y="75" fontSize="10" fill="#555" fontFamily="sans-serif">
          Riam
        </text>
        <text x="95" y="95" fontSize="10" fill="#555" fontFamily="sans-serif">
          Lundu
        </text>
        <text x="30" y="45" fontSize="10" fill="#555" fontFamily="sans-serif">
          Sematan
        </text>
        <text
          x="145"
          y="88"
          fontSize="11"
          fill="#333"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          Kuching
        </text>
        <text x="260" y="40" fontSize="10" fill="#555" fontFamily="sans-serif">
          Kabong
        </text>
        <text x="295" y="88" fontSize="9" fill="#666" fontFamily="sans-serif">
          Sebuyau
        </text>
        {/* Location dot */}
        <circle cx="162" cy="83" r="6" fill="#EC221F" />
        <circle cx="162" cy="83" r="3" fill="#fff" />
        <circle cx="162" cy="83" r="10" fill="#EC221F" fillOpacity="0.25" />
      </svg>
    </div>
  );
}

/* ─── SOS Modal ──────────────────────────────────────────────────────────── */
function SOSModal({ onClose }) {
  const [countdown, setCountdown] = useState(5);

  // Could use useEffect for real countdown; kept simple for demo
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "40px 48px",
          width: "420px",
          textAlign: "center",
          boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "#FDECEA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <PhoneIcon color="#EC221F" size={36} />
        </div>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 800,
            color: "#1E1E1E",
            margin: "0 0 8px",
          }}
        >
          SOS Call
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "#767676",
            margin: "0 0 28px",
            lineHeight: 1.5,
          }}
        >
          This will immediately call emergency services
          <br />
          and share your current location.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={onClose}
            style={{
              padding: "12px 28px",
              borderRadius: "14px",
              border: "2px solid #ddd",
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
            onClick={() => {
              onClose();
              alert("SOS call initiated — emergency services notified.");
            }}
            style={{
              padding: "12px 28px",
              borderRadius: "14px",
              border: "none",
              background: "#EC221F",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              color: "#fff",
              boxShadow: "0 4px 16px rgba(236,34,31,0.4)",
            }}
          >
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── EmergencyPage ──────────────────────────────────────────────────────── */
export default function EmergencyPage({ navActive, setNavActive }) {
  const [autoEmergency, setAutoEmergency] = useState(true);
  const [assistReminder, setAssistReminder] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);
  const [sosModal, setSosModal] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "1280px",
        height: "800px",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        userSelect: "none",
        background: "#F8FAFC",
      }}
    >
      {/* ── Background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "linear-gradient(155deg, #EEF4FA 0%, #DFF0F8 30%, #D0E8F4 55%, #C8E0F0 75%, #D8ECD8 90%, #EEF6EE 100%)",
        }}
      >
        {[
          {
            top: "5%",
            left: "35%",
            w: 600,
            h: 220,
            rot: -14,
            c: "rgba(160,200,230,0.40)",
          },
          {
            top: "45%",
            left: "55%",
            w: 450,
            h: 170,
            rot: 12,
            c: "rgba(190,220,185,0.35)",
          },
          {
            top: "60%",
            left: "5%",
            w: 380,
            h: 140,
            rot: -8,
            c: "rgba(200,230,195,0.30)",
          },
          {
            top: "15%",
            left: "72%",
            w: 320,
            h: 130,
            rot: 20,
            c: "rgba(155,195,225,0.28)",
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
              filter: "blur(35px)",
              transform: `rotate(${b.rot}deg)`,
            }}
          />
        ))}
      </div>

      {/* ── Top Status Bar ── */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "45px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          zIndex: 5,
        }}
      >
        <WifiIcon />
        <BluetoothIcon />
      </div>
      <div
        style={{
          position: "absolute",
          top: "14px",
          right: "28px",
          zIndex: 5,
          width: "46px",
          height: "46px",
          background: "#fff",
          border: "1.5px solid #ddd",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          cursor: "pointer",
        }}
      >
        <UserIcon />
      </div>

      {/* ── Page Title ── */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "66px",
          zIndex: 5,
          fontSize: "28px",
          fontWeight: 700,
          color: "#1E1E1E",
          letterSpacing: "-0.3px",
        }}
      >
        Emergency Assistance
      </div>

      {/* ══════════════════════════════════════════
          LEFT COLUMN
      ══════════════════════════════════════════ */}

      {/* ── Auto Emergency Assistance Card ── */}
      <div
        style={{
          position: "absolute",
          width: "630px",
          height: "189px",
          left: "66px",
          top: "130px",
          background: "#FFFFFF",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow: "0px 6px 40px rgba(0,0,0,0.10)",
          borderRadius: "12px",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          gap: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Emergency car icon with circle bg */}
        <div
          style={{
            width: "95px",
            height: "95px",
            flexShrink: 0,
            background: "#FDD3D0",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CarEmergencyIcon />
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#1E1E1E",
              lineHeight: 1.2,
              marginBottom: "6px",
            }}
          >
            Auto Emergency
            <br />
            Assistance
          </div>
          <div style={{ fontSize: "16px", fontWeight: 500, color: "#767676" }}>
            When a severe crash is detected.
          </div>
        </div>

        {/* Toggle */}
        <Toggle
          checked={autoEmergency}
          onChange={setAutoEmergency}
          variant="red"
        />
      </div>

      {/* ── Emerg. Assist Reminder Card ── */}
      <div
        style={{
          position: "absolute",
          width: "630px",
          height: "133px",
          left: "66px",
          top: "335px",
          background: "#F5F5F5",
          boxShadow: "0px 6px 40px rgba(0,0,0,0.12)",
          borderRadius: "12px",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          gap: "18px",
          boxSizing: "border-box",
        }}
      >
        {/* Phone circle icon */}
        <div
          style={{
            width: "62px",
            height: "62px",
            flexShrink: 0,
            background: "#CFF7D3",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PhoneIcon color="#009951" size={28} />
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#434343",
              marginBottom: "4px",
            }}
          >
            Emerg. Assist reminder
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "#767676",
              marginBottom: "4px",
            }}
          >
            Automatically notify emergency contact
          </div>
          <div style={{ fontSize: "19px", fontWeight: 500, color: "#018F71" }}>
            Mom (+60 12 345 6789)
          </div>
        </div>

        {/* Toggle (small variant) */}
        <div
          onClick={() => setAssistReminder((v) => !v)}
          style={{
            width: "63px",
            height: "32px",
            background: assistReminder ? "#34C759" : "#E5E5EA",
            borderRadius: "100px",
            position: "relative",
            cursor: "pointer",
            transition: "background 0.3s",
            flexShrink: 0,
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "2px",
              left: assistReminder ? "calc(100% - 30px)" : "2px",
              width: "28px",
              height: "28px",
              background: "#fff",
              borderRadius: "50%",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              transition: "left 0.3s cubic-bezier(.4,0,.2,1)",
            }}
          />
        </div>
      </div>

      {/* ── SOS Call Button ── */}
      <button
        onClick={() => setSosModal(true)}
        style={{
          position: "absolute",
          width: "271px",
          height: "72px",
          left: "245px",
          top: "490px",
          background: "#EC221F",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          zIndex: 2,
          boxShadow: "0 6px 24px rgba(236,34,31,0.45)",
          transition: "transform 0.14s, box-shadow 0.14s",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 10px 32px rgba(236,34,31,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(236,34,31,0.45)";
        }}
      >
        <PhoneIcon color="#fff" size={36} />
        <span
          style={{
            fontSize: "24px",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "0.5px",
          }}
        >
          SOS Call
        </span>
      </button>

      {/* ══════════════════════════════════════════
          RIGHT COLUMN
      ══════════════════════════════════════════ */}

      {/* ── Current Location Card ── */}
      <div
        style={{
          position: "absolute",
          width: "443px",
          height: "315px",
          left: "766px",
          top: "130px",
          background: "#FFFFFF",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.10)",
          borderRadius: "12px",
          zIndex: 2,
          padding: "20px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Map */}
        <MapPlaceholder />

        {/* Location text */}
        <div style={{ fontSize: "15px", fontWeight: 500, color: "#767676" }}>
          Current Location
        </div>
        <div
          style={{
            fontSize: "23px",
            fontWeight: 500,
            color: "#303030",
            lineHeight: 1.3,
          }}
        >
          Jalan Setia Raja, Kuching, Sarawak
        </div>
      </div>

      {/* ── Location Sharing Card ── */}
      <div
        style={{
          position: "absolute",
          width: "443px",
          height: "118px",
          left: "766px",
          top: "460px",
          background: "#FFFFFF",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.10)",
          borderRadius: "12px",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: "16px",
          boxSizing: "border-box",
        }}
      >
        {/* Pin icon */}
        <div style={{ flexShrink: 0 }}>
          <LocationPinIcon color="#5A5A5A" />
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 500,
              color: "#303030",
              marginBottom: "4px",
            }}
          >
            Location Sharing
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#767676",
              lineHeight: 1.4,
            }}
          >
            Automatically share your location
            <br />
            with emergency services
          </div>
        </div>

        {/* ON badge / toggle */}
        <div
          onClick={() => setLocationSharing((v) => !v)}
          style={{
            padding: "6px 14px",
            background: locationSharing ? "#CFF7D3" : "#E5E5EA",
            borderRadius: "60px",
            cursor: "pointer",
            transition: "background 0.25s",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: locationSharing ? "#009951" : "#888",
            }}
          >
            {locationSharing ? "ON" : "OFF"}
          </span>
        </div>
      </div>

      <BottomNav active={navActive} setActive={setNavActive} />

      {/* ── SOS Modal ── */}
      {sosModal && <SOSModal onClose={() => setSosModal(false)} />}
    </div>
  );
}
