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

const LocationPinIcon = ({ color = "#5A5A5A", size = 38 }) => (
  <svg width={size} height={size} viewBox="0 0 28 32" fill="none">
    <path
      d="M14 1C8.5 1 3 6 3 12.5c0 9 11 18.5 11 18.5s11-9.5 11-18.5C25 6 19.5 1 14 1z"
      fill={color}
    />
    <circle cx="14" cy="12.5" r="4" fill="#fff" />
  </svg>
);

const CarEmergencyIcon = () => (
  <svg width="60" height="60" viewBox="0 0 72 72" fill="none">
    <path d="M12 38l5-14h38l5 14v12H12V38z" fill="#970000" />
    <path d="M20 38l3-10h26l3 10H20z" fill="#C84040" opacity="0.6" />
    <circle cx="22" cy="50" r="6" fill="#333" />
    <circle cx="50" cy="50" r="6" fill="#333" />
    <circle cx="22" cy="50" r="3" fill="#666" />
    <circle cx="50" cy="50" r="3" fill="#666" />
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
    <path
      d="M30 18l-3-5M36 17v-6M42 18l3-5"
      stroke="#FF6666"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ContactsIcon = () => (
  <svg width="45" height="45" viewBox="0 0 45 45" fill="none">
    <circle
      cx="18"
      cy="17"
      r="6"
      stroke="#5A5A5A"
      strokeWidth="2.5"
      fill="none"
    />
    <path
      d="M6 38c0-7 5.4-12 12-12s12 5 12 12"
      stroke="#5A5A5A"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M30 20c2.5 0 4.5 2 4.5 4.5S32.5 29 30 29"
      stroke="#5A5A5A"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M34 36c2-1.5 3-3.5 3-6"
      stroke="#5A5A5A"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const SendIcon = ({ color = "#fff", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M22 2L11 13"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 2L15 22l-4-9-9-4 20-7z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── Warning Icon ───────────────────────────────────────────────────────── */
const WarningIcon = () => (
  <svg width="117" height="117" viewBox="0 0 117 117" fill="none">
    <path d="M58.5 10L108 100H9L58.5 10z" fill="#970000" />
    <rect x="53" y="42" width="11" height="32" rx="5" fill="#fff" />
    <rect x="53" y="82" width="11" height="11" rx="5" fill="#fff" />
  </svg>
);

/* ─── Turn Off Confirmation Modal ────────────────────────────────────────── */
function TurnOffConfirmModal({ onKeepOn, onTurnOff }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 40,
        background: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
      }}
    >
      {/* Inner content row: icon+text LEFT, buttons RIGHT */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "80px",
          width: "100%",
          padding: "0 80px",
          boxSizing: "border-box",
        }}
      >
        {/* Left: warning icon + question */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Warning circle */}
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
              background: "#FDD3D0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <WarningIcon />
          </div>

          {/* Question text */}
          <div
            style={{
              width: "480px",
              fontSize: "40px",
              fontWeight: 700,
              color: "#434343",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Turn Off Auto Emergency Assistance?
          </div>
        </div>

        {/* Right: buttons stacked */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "center",
          }}
        >
          {/* Keep On button */}
          <button
            onClick={onKeepOn}
            style={{
              width: "422px",
              height: "130px",
              background: "#FFFFFF",
              border: "5px solid #14AE5C",
              boxShadow: "0px 15px 50px rgba(0,157,86,0.5)",
              borderRadius: "50px",
              fontSize: "40px",
              fontWeight: 500,
              color: "#009951",
              cursor: "pointer",
              transition: "transform 0.14s, box-shadow 0.14s",
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0px 20px 60px rgba(0,157,86,0.65)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0px 15px 50px rgba(0,157,86,0.5)";
            }}
          >
            Keep On
          </button>

          {/* Turn Off button */}
          <button
            onClick={onTurnOff}
            style={{
              width: "422px",
              height: "130px",
              background: "#D52011",
              border: "none",
              borderRadius: "50px",
              fontSize: "40px",
              fontWeight: 500,
              color: "#FFFFFF",
              cursor: "pointer",
              transition: "transform 0.14s, box-shadow 0.14s",
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0px 8px 30px rgba(213,32,17,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0px 16px 48px rgba(213,32,17,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0px 8px 30px rgba(213,32,17,0.4)";
            }}
          >
            Turn Off
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Small Toggle (for the Assist card) ─────────────────────────────────── */
function SmallToggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: "63px",
        height: "33px",
        background: checked
          ? "linear-gradient(270deg, #FF0E00 11%, #EC756E 76%)"
          : "#E5E5EA",
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
          top: "2.5px",
          left: checked ? "calc(100% - 30px)" : "2.5px",
          width: "28px",
          height: "28px",
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
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        viewBox="0 0 313 177"
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
        <text x="20" y="55" fontSize="9" fill="#555" fontFamily="sans-serif">
          Sematan
        </text>
        <text x="40" y="80" fontSize="9" fill="#555" fontFamily="sans-serif">
          Riam
        </text>
        <text x="75" y="95" fontSize="9" fill="#555" fontFamily="sans-serif">
          Lundu
        </text>
        <text
          x="130"
          y="88"
          fontSize="10"
          fill="#333"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          Kuching
        </text>
        <text x="230" y="40" fontSize="9" fill="#555" fontFamily="sans-serif">
          Kabong
        </text>
        <text x="245" y="80" fontSize="8" fill="#666" fontFamily="sans-serif">
          Sebuyau
        </text>
        <circle cx="155" cy="83" r="6" fill="#EC221F" />
        <circle cx="155" cy="83" r="3" fill="#fff" />
        <circle cx="155" cy="83" r="10" fill="#EC221F" fillOpacity="0.25" />
      </svg>
    </div>
  );
}

/* ─── SOS Modal ──────────────────────────────────────────────────────────── */
function SOSModal({ onClose }) {
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
          SOS Emergency
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

/* ─── Add Contact Modal ──────────────────────────────────────────────────── */
function AddContactModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1.5px solid #ddd",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "rgba(0,0,0,0.45)",
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
          padding: "36px 40px",
          width: "380px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#1E1E1E",
            margin: "0 0 20px",
          }}
        >
          Add Trusted Contact
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <input
            style={inputStyle}
            placeholder="Name (e.g. Mom)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Phone (e.g. +60 12 345 6789)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "12px",
              border: "2px solid #ddd",
              background: "#f5f5f5",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              color: "#333",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (name.trim() && phone.trim()) {
                onAdd({ name: name.trim(), phone: phone.trim() });
                onClose();
              }
            }}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              background: "#009951",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              color: "#fff",
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Call Contact Modal ─────────────────────────────────────────────────── */
function CallModal({ contact, onClose }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "rgba(0,0,0,0.45)",
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
          width: "380px",
          textAlign: "center",
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "#CFF7D3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <PhoneIcon color="#009951" size={32} />
        </div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "#1E1E1E",
            margin: "0 0 6px",
          }}
        >
          {contact.name}
        </h2>
        <p style={{ fontSize: "15px", color: "#767676", margin: "0 0 24px" }}>
          {contact.phone}
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={onClose}
            style={{
              padding: "12px 28px",
              borderRadius: "12px",
              border: "2px solid #ddd",
              background: "#f5f5f5",
              fontSize: "15px",
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
              alert(`Calling ${contact.name} at ${contact.phone}…`);
            }}
            style={{
              padding: "12px 28px",
              borderRadius: "12px",
              border: "none",
              background: "#009951",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              color: "#fff",
            }}
          >
            Call
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── EmergencyPage ──────────────────────────────────────────────────────── */
export default function EmergencyPage({ navActive, setNavActive }) {
  const [autoEmergency, setAutoEmergency] = useState(true);
  const [confirmTurnOff, setConfirmTurnOff] = useState(false);
  const [sosModal, setSosModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [callModal, setCallModal] = useState(null); // contact object
  const [locationSent, setLocationSent] = useState(false);

  // When toggle clicked: if currently ON show confirm; if OFF turn on directly
  const handleAutoEmergencyToggle = (newVal) => {
    if (!newVal) {
      setConfirmTurnOff(true);
    } else {
      setAutoEmergency(true);
    }
  };

  const [contacts, setContacts] = useState([
    { name: "Mom", phone: "+60 12 345 6789" },
    { name: "Alice", phone: "+60 12 345 6789" },
    { name: "John (Brother)", phone: "+60 12 345 6789" },
  ]);

  const handleAddContact = (contact) => {
    setContacts((prev) => [...prev, contact]);
  };

  const handleSendLocation = () => {
    setLocationSent(true);
    setTimeout(() => setLocationSent(false), 2500);
  };

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
          3-COLUMN LAYOUT  (top: 130px, bottom: 645px → height ≈ 515px)
          Col 1: left:66  width:356
          Col 2: left:462 width:356
          Col 3: left:858 width:356
      ══════════════════════════════════════════ */}

      {/* ════════════════ COL 1 ════════════════ */}

      {/* Auto Emergency Assistance card */}
      <div
        style={{
          position: "absolute",
          width: "356px",
          height: "140px",
          left: "66px",
          top: "184px",
          background: "#FFFFFF",
          border: "1px solid #FDD3D0",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.10)",
          borderRadius: "20px",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: "14px",
          boxSizing: "border-box",
        }}
      >
        {/* Car icon circle */}
        <div
          style={{
            width: "62px",
            height: "62px",
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
              fontSize: "20px",
              fontWeight: 700,
              color: "#1E1E1E",
              lineHeight: 1.2,
              marginBottom: "4px",
            }}
          >
            Auto Emergency
            <br />
            Assistance
          </div>
          <div style={{ fontSize: "13px", fontWeight: 500, color: "#767676" }}>
            When a severe crash is detected.
          </div>
        </div>

        {/* Toggle */}
        <SmallToggle
          checked={autoEmergency}
          onChange={handleAutoEmergencyToggle}
        />
      </div>

      {/* SOS Emergency button */}
      <button
        onClick={() => setSosModal(true)}
        style={{
          position: "absolute",
          width: "356px",
          height: "140px",
          left: "66px",
          top: "344px",
          background: "#EC221F",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "18px",
          zIndex: 2,
          boxShadow: "0 6px 24px rgba(236,34,31,0.45)",
          transition: "transform 0.14s, box-shadow 0.14s",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 10px 32px rgba(236,34,31,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(236,34,31,0.45)";
        }}
      >
        <PhoneIcon color="#fff" size={44} />
        <span
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "1px",
          }}
        >
          SOS EMERGENCY
        </span>
      </button>

      {/* ════════════════ COL 2 — Trusted Contacts ════════════════ */}
      <div
        style={{
          position: "absolute",
          width: "356px",
          height: "445px",
          left: "462px",
          top: "184px",
          background: "#FFFFFF",
          border: "1px solid #A9FF82",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.10)",
          borderRadius: "20px",
          zIndex: 2,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px 20px 12px",
            gap: "10px",
          }}
        >
          <ContactsIcon />
          <span
            style={{
              flex: 1,
              fontSize: "20px",
              fontWeight: 700,
              color: "#303030",
            }}
          >
            Trusted Contacts
          </span>
          {/* Add button */}
          <button
            onClick={() => setAddContactModal(true)}
            style={{
              width: "40px",
              height: "35px",
              background: "#808080",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1,
              flexShrink: 0,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#555")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#808080")}
            title="Add contact"
          >
            +
          </button>
        </div>

        {/* Contact list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 16px",
            gap: "14px",
            maxHeight: "340px",
            overflowY: "auto",
          }}
        >
          {contacts.map((contact, idx) => (
            <div
              key={idx}
              style={{
                width: "100%",
                height: "72px",
                background: "#E2FFE1",
                borderRadius: "20px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                paddingLeft: "20px",
                paddingRight: "56px",
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "#303030",
                  }}
                >
                  {contact.name}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#757575",
                  }}
                >
                  {contact.phone}
                </div>
              </div>

              {/* Call button */}
              <button
                onClick={() => setCallModal(contact)}
                style={{
                  position: "absolute",
                  right: "14px",
                  width: "36px",
                  height: "36px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(0,153,81,0.12)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "none")
                }
              >
                <PhoneIcon color="#009951" size={24} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════ COL 3 — Vehicle Location ════════════════ */}
      <div
        style={{
          position: "absolute",
          width: "356px",
          height: "445px",
          left: "858px",
          top: "184px",
          background: "#FFFFFF",
          border: "1px solid #80CCFF",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.10)",
          borderRadius: "20px",
          zIndex: 2,
          boxSizing: "border-box",
          padding: "0 16px 16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "16px 4px 12px",
          }}
        >
          <LocationPinIcon color="#5A5A5A" size={36} />
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#303030" }}>
            Vehicle Location
          </span>
        </div>

        {/* Map */}
        <MapPlaceholder />

        {/* Address */}
        <div
          style={{
            margin: "10px 4px 6px",
            fontSize: "16px",
            fontWeight: 500,
            color: "#303030",
          }}
        >
          Jalan Setia Raja, Kuching, Sarawak
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Send Location button */}
        <button
          onClick={handleSendLocation}
          style={{
            width: "100%",
            height: "50px",
            background: locationSent ? "#009951" : "#0078FF",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "background 0.3s, transform 0.14s",
            outline: "none",
          }}
          onMouseEnter={(e) => {
            if (!locationSent) e.currentTarget.style.background = "#005FCC";
          }}
          onMouseLeave={(e) => {
            if (!locationSent) e.currentTarget.style.background = "#0078FF";
          }}
        >
          <SendIcon color="#fff" size={20} />
          <span style={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>
            {locationSent ? "Location Sent!" : "Send Location"}
          </span>
        </button>
      </div>

      {/* ── Bottom Nav ── */}
      <BottomNav active={navActive} setActive={setNavActive} />

      {/* ── Modals ── */}
      {sosModal && <SOSModal onClose={() => setSosModal(false)} />}
      {confirmTurnOff && (
        <TurnOffConfirmModal
          onKeepOn={() => setConfirmTurnOff(false)}
          onTurnOff={() => {
            setAutoEmergency(false);
            setConfirmTurnOff(false);
          }}
        />
      )}
      {addContactModal && (
        <AddContactModal
          onClose={() => setAddContactModal(false)}
          onAdd={handleAddContact}
        />
      )}
      {callModal && (
        <CallModal contact={callModal} onClose={() => setCallModal(null)} />
      )}
    </div>
  );
}
